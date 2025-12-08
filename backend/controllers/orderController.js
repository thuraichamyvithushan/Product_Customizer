import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  try {
    const {
      phoneModel,
      designImage,
      templateImage,
      userCustomImage,
      fullName,
      email,
      phone,
      address,
      quantity
    } = req.body;

    if (!phoneModel || !designImage || !fullName || !email || !phone || !address) {
      return res
        .status(400)
        .json({ message: "phoneModel, designImage and customer details are required" });
    }

    const order = await Order.create({
      userId: req.user.id,
      phoneModel,
      designImage, // Final combined design (template + user image)
      templateImage: templateImage || "", // Template background used
      userCustomImage: userCustomImage || "", // User's uploaded custom image
      fullName,
      email,
      phone,
      address,
      quantity: quantity || 1
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

