import Order from "../models/order.js";
import User from "../models/user.js";

export const createOrder = async (req, res, next) => {
  const { userId, paymentMethod } = req.body;
  try {
    const plans = {
      free: { amount: 0, postLimit: 1 },
      starter: { amount: 25, postLimit: 10 },
      pro: { amount: 45, postLimit: 25 },
    };

    if (!plans[paymentMethod]) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const order = new Order({
      userId,
      paymentMethod,
      amount: plans[paymentMethod].amount,
      status: paymentMethod === "free" ? "completed" : "pending",
    });

    await order.save();

    // Update user's subscription and post limit
    const updatedUser = await User.findByIdAndUpdate(userId, {
      subscriptionType: paymentMethod,
      postLimit: plans[paymentMethod].postLimit,
      verified: paymentMethod === "free", // Auto-verify if payment method is 'free'
    });

    if (updatedUser.verified) {
      await List.updateMany({ creator: userId }, { active: true });
    }

    res.json({ orderId: order._id });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Admin Verification
export const verifyUserId = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Verify based on payment method limits
  const plans = {
    free: 1,
    starter: 10,
    pro: 25,
  };

  if (user.subscriptionType === "free") {
    user.verified = true;
  } else {
    user.verified = false;
  }

  user.postLimit = plans[user.subscriptionType];
  await user.save();

  res.json(user);
};
