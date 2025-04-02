import List from "../models/houseList.js";
import { imageUploadUtil } from "../helpers/cloudinary.js";
import { features } from "process";
import User from "../models/user.js";

export const handleMultipleImageUpload = async (req, res) => {
  try {
    const uploadedImages = [];
    for (const file of req.files) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const url = `data:${file.mimetype};base64,${b64}`;
      const result = await imageUploadUtil(url); // Your Cloudinary upload utility function
      uploadedImages.push(result.url); // Save the Cloudinary URL
    }

    res.json({
      success: true,
      images: uploadedImages, // Return all uploaded image URLs
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.json({
      success: false,
      message: "Error occurred during images upload",
    });
  }
};

export const createList = async (req, res, next) => {
  const { commonInfo, rentFeatures, saleFeatures, imageUrls, creator } =
    req.body;

  try {
    if (!commonInfo || !imageUrls || !creator) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    // Fetch user
    const user = await User.findById(creator);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User is not verified.",
      });
    }

    // Define updated plans
    const plans = {
      free: { amount: 0, postLimit: 1 },
      starter: { amount: 25, postLimit: 10 },
      pro: { amount: 45, postLimit: 25 },
    };

    // Ensure the user's postLimit matches their latest subscription plan
    if (user.postLimit !== plans[user.subscriptionType].postLimit) {
      user.postLimit = plans[user.subscriptionType].postLimit;
      await user.save();
    }

    // Count user's existing listings
    const userListCount = await List.countDocuments({ creator });
    if (userListCount >= user.postLimit) {
      return res.status(403).json({
        success: false,
        message: "Post limit reached. Upgrade your plan to post more.",
      });
    }

    // Create the listing
    const createdList = new List({
      type: commonInfo.listingType,
      commonInfo,
      rentFeatures:
        commonInfo.listingType === "rent" ? rentFeatures : undefined,
      saleFeatures:
        commonInfo.listingType === "sale" ? saleFeatures : undefined,
      imageUrls,
      creator,
      active: user.verified,
    });

    await createdList.save();

    await User.findByIdAndUpdate(creator, { $inc: { listCount: 1 } });

    return res.status(201).json({
      success: true,
      message: "Created List Successfully",
      createdList,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAllLists = async (req, res, next) => {
  try {
    const getAllList = await List.find({});
    res.status(200).json({
      success: true,
      getAllList,
    });
  } catch (error) {
    next(error);
  }
};
