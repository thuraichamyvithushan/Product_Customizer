import PetProduct from "../models/Petproduct.js";

// Get all
export const getPetProducts = async (req, res, next) => {
  try {
    const products = await PetProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Get single 
export const getPetProduct = async (req, res, next) => {
  try {
    const product = await PetProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Create 
export const createPetProduct = async (req, res, next) => {
  try {
    const product = await PetProduct.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Update
export const updatePetProduct = async (req, res, next) => {
  try {
    const product = await PetProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Delete 
export const deletePetProduct = async (req, res, next) => {
  try {
    await PetProduct.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};
