import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

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
    console.error("Error during signup or email sending:", error);
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
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Login Successfully",
      user: {
        _id: createdEmail._id,
        email: createdEmail.email,
        userName: createdEmail.userName,
        avator: createdEmail.avator,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Ops something went wrong, please try again!",
    });
  }
};

export const googleAuth = async (req, res, next) => {
  const { email, userName, avator } = req.body;
  try {
    const users = await User.findOne({ email });
    if (users) {
      const token = jwt.sign(
        {
          id: users._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
      );

      console.log(users);
      res.cookie("token", token, { httpOnly: true }).json({
        success: true,
        message: "succesfully created from google",
        user: {
          _id: users._id,
          email: users.email,
          userName: users.userName,
          avator: users.avator,
        },
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = await bcrypt.hash(generatedPassword, 12);
      const newUser = new User({
        userName,
        email,
        password: hashPassword,
        avator,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
      );
      res.cookie("token", token, { httpOnly: true }).json({
        success: true,
        message: "succesfully created from google",
        user: {
          _id: newUser._id,
          email: newUser.email,
          userName: newUser.userName,
          avator: newUser.avator,
        },
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Ops something went wrong, please try again!",
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logout successfully",
  });
};

export const forgotPassword = async (req, res, next) => {
  try {
    const buffer = await new Promise((resolve, reject) => {
      crypto.randomBytes(32, (err, buffer) => {
        if (err) reject(err); // Reject the promise if there's an error
        resolve(buffer); // Resolve the promise with the generated buffer
      });
    });

    const token = buffer.toString("hex");

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No account with that email found" });
    }

    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;

    await user.save();

    // Send email via SendGrid
    const emailResponse = await transporter.sendMail({
      to: req.body.email, // Send to the email provided
      from: "lidyasimon21@gmail.com", // Use a verified SendGrid email address
      subject: "Password Reset",
      html: `
        <h2>You requested a password reset</h2>
        <p>Click this <a href="http://localhost:5174/reset/${token}">link</a> to set a new password</p>
      `,
    });

    console.log("Email sent:", emailResponse); // Log the email response

    res.status(200).json({
      success: true,
      message: "Password reset token generated successfully. Check your email.",
    });
  } catch (error) {
    console.log(error); // Log the error if something fails
    res
      .status(500)
      .json({ success: false, message: "Failed to send the email." });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password and remove reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {}
};
