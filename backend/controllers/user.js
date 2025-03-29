import bcryptjs from "bcryptjs";
import { imageUploadUtil } from "../helpers/cloudinary.js";
import User from "../models/user.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    console.error("Error up loading image:", error);
    res.json({
      success: false,
      message: "Error occured during image upload",
    });
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.json({
      success: false,
      message: "You can only update your own Account",
    });
  }
  try {
    if (req.body.password) {
      req.body.password = await bcryptjs.hash(req.body.password, 12);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          password: req.body.password,
          avator: req.body.avator,
        },
      },
      { new: true }
    );
    const { password, ...user } = updateUser._doc;

    res.status(200).json({
      success: true,
      message: "profile update successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  if (req.user.id !== id) {
    return res.json({
      success: false,
      message: "You can only update your own Account",
    });
  }

  try {
    await User.findByIdAndDelete(id);
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User Deleted successfully ",
    });
  } catch (error) {
    next(error);
  }
};
