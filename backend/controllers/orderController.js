import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  try {
    const { items, fullName, email, phone, address, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "At least one item is required" });
    }

    if (!fullName || !email || !phone || !address) {
      return res.status(400).json({ message: "Customer details are required" });
    }

    // Basic validation for items
    const sanitizedItems = items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      designImage: item.designImage,
      templateImage: item.templateImage || "",
      userCustomImage: item.userCustomImage || "",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1
    }));

    const computedTotal = sanitizedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      userId: req.user.id,
      items: sanitizedItems,
      fullName,
      email,
      phone,
      address,
      total: total || computedTotal
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

