import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({
        success: false,
        message: "All inputs are required",
      });
    }
    const createdEmail = await User.findOne({ email });
    if (!createdEmail) {
      return res.json({
        success: false,
        message: "Email is not Found, Create New Account",
      });
    }
    const createdPasswored = await bcrypt.compare(
      password,
      createdEmail.password
    );

    if (!createdPasswored) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: createdEmail._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Login Successfully",
      user: {
        _id: createdEmail._id,
        email: createdEmail.email,
        userName: createdEmail.userName,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Ops something went wrong, please try again!",
    });
  }
};
