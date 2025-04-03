import bcryptjs from "bcryptjs";
import { imageUploadUtil } from "../helpers/cloudinary.js";
import User from "../models/user.js";
import List from "../models/houseList.js";

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

export const getListsByUserId = async (req, res, next) => {
  try {
    // Check if the user is requesting their own listings
    if (req.user.id !== req.params.uid) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own listing",
      });
    }

    // Find the user and check if they are verified
    const user = await User.findById(req.params.uid);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User is not verified",
      });
    }

    // Fetch lists for the verified user
    const userLists = await List.find({ creator: req.params.uid });
    res.status(200).json(userLists);
  } catch (error) {
    next(error);
  }
};

export const verifyUserId = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};
