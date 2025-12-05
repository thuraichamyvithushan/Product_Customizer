import Order from "../models/Order.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

export const getOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const filter = search
      ? { phoneModel: { $regex: search, $options: "i" } }
      : {};

    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10))
      .populate("userId", "name email");

    res.json({
      data: orders,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const [totalOrders, todayOrders, totalUsers] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }),
      User.countDocuments()
    ]);

    res.json({
      totalOrders,
      todayOrders,
      totalUsers
    });
  } catch (error) {
    next(error);
  }
};

export const confirmOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "confirmed";
    await order.save();

    try {
      await sendEmail({
        to: order.email,
        subject: "Your phone cover order is confirmed",
        html: `<p>Hi ${order.fullName || ""},</p>
               <p>Your order for a <strong>${order.phoneModel}</strong> cover has been <strong>confirmed</strong>.</p>
               <p><strong>Quantity:</strong> ${order.quantity}</p>
               <p><strong>Shipping address:</strong><br/>${order.address}</p>
               <p>Thank you for ordering from Custom Cover.</p>`
      });
    } catch (emailErr) {
      console.error("Failed to send confirmation email", emailErr);
    }

    res.json({ message: "Order confirmed and email sent (if configured)", order });
  } catch (error) {
    next(error);
  }
};

// User Management
export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    res.json({
      data: users,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be 'user' or 'admin'" });
    }

    // Prevent admin from removing their own admin access
    if (req.user.id === id && role === "user") {
      return res.status(400).json({ message: "You cannot remove your own admin access" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (req.user.id === id) {
      return res.status(400).json({ message: "You cannot delete your own account" });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

