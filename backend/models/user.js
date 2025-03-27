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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
