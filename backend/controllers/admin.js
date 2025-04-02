import List from "../models/houseList.js";
import Order from "../models/order.js";
import User from "../models/user.js";

export const adminVerifyOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Fetch the user
    const user = await User.findById(order.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update order status
    order.status = "completed";
    await order.save();

    // Update user verified status
    user.verified = true;
    await user.save();

    await List.updateMany({ creator: user._id }, { active: true });

    res.status(200).json({ message: "Order verified and user updated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adminOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate(
      "userId",
      "userName email subscriptionType verified postLimit"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
