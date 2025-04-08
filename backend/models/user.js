import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avator: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["free", "starter", "pro"],
      default: "free", // Default is 'free'
    },
    postLimit: {
      type: Number,
      default: 1, // Default post limit for 'free'
    },
    verified: {
      type: Boolean,
      default: false,
    },
    subscriptionType: {
      type: String,
      enum: ["free", "starter", "pro"],
      default: "free",
    },
    resetToken: String,
    resetTokenExpiration: Date,
    role: {
      type: String,
      default: "user",
    },
    listCount: { type: Number, default: 0 },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
