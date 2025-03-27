import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;

  try {
    if (!userName || !email || !password) {
      return res.json({
        success: false,
        message: "all the inputs are required",
      });
    }

    const createNew = await User.findOne({ email });
    if (createNew) {
      return res.json({
        success: false,
        message: "Email is already used please try another!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newlyCreated = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await newlyCreated.save();
    res.status(200).json({
      success: true,
      message: "user Registered successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Ops something went wrong, please try again!",
    });
  }
};
