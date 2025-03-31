import List from "../models/houseList.js";
import { imageUploadUtil } from "../helpers/cloudinary.js";
import { features } from "process";

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

  // Get the type from commonInfo
  const { listingType } = commonInfo;

  try {
    // Validate input
    if (!listingType || !commonInfo || !imageUrls) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    const createdList = new List({
      type: undefined,
      commonInfo,
      rentFeatures:
        commonInfo.listingType === "rent" ? rentFeatures : undefined,
      saleFeatures:
        commonInfo.listingType === "sale" ? saleFeatures : undefined,
      imageUrls,
      creator,
    });

    await createdList.save();

    return res.status(201).json({
      success: true,
      message: "Created List Successfully",
      createdList,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
