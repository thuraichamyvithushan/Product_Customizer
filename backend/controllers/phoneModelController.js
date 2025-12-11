import PhoneModel from "../models/PhoneModel.js";

export const getPhoneModels = async (req, res, next) => {
  try {
    const models = await PhoneModel.find().sort({ createdAt: 1 });
    res.json(models);
  } catch (error) {
    next(error);
  }
};

export const createPhoneModel = async (req, res, next) => {
  try {
    const { name, key, templateImage, templateImages } = req.body;

    if (!name || !key) {
      return res.status(400).json({ message: "name and key are required" });
    }

    // Support both single image (legacy) and multiple images
    const images = templateImages || (templateImage ? [templateImage] : []);

    if (images.length === 0) {
      return res.status(400).json({ message: "At least one template image is required" });
    }

    const existing = await PhoneModel.findOne({ key: key.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Model key already exists" });
    }

    const model = await PhoneModel.create({
      name,
      key: key.toLowerCase(),
      templateImages: images,
      templateImage: images[0] // Set first image as legacy field for backward compatibility
    });

    res.status(201).json(model);
  } catch (error) {
    next(error);
  }
};

export const addTemplateToModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { templateImage } = req.body;

    if (!templateImage) {
      return res.status(400).json({ message: "templateImage is required" });
    }

    const model = await PhoneModel.findById(id);
    if (!model) {
      return res.status(404).json({ message: "Phone model not found" });
    }

    // Add new template to array
    if (!model.templateImages) {
      model.templateImages = [];
    }
    model.templateImages.push(templateImage);
    
    // Update legacy field if it's the first image
    if (model.templateImages.length === 1) {
      model.templateImage = templateImage;
    }

    await model.save();
    res.json(model);
  } catch (error) {
    next(error);
  }
};

export const removeTemplateFromModel = async (req, res, next) => {
  try {
    const { id, templateIndex } = req.params;

    const model = await PhoneModel.findById(id);
    if (!model) {
      return res.status(404).json({ message: "Phone model not found" });
    }

    const index = parseInt(templateIndex, 10);
    if (isNaN(index) || index < 0 || index >= (model.templateImages?.length || 0)) {
      return res.status(400).json({ message: "Invalid template index" });
    }

    model.templateImages.splice(index, 1);
    
    // Update legacy field if needed
    if (model.templateImages.length > 0) {
      model.templateImage = model.templateImages[0];
    } else {
      model.templateImage = "";
    }

    await model.save();
    res.json(model);
  } catch (error) {
    next(error);
  }
};

export const deletePhoneModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PhoneModel.findByIdAndDelete(id);
    res.json({ message: "Phone model deleted" });
  } catch (error) {
    next(error);
  }
};


