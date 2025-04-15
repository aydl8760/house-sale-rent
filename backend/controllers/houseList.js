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
      starter: { amount: 25, postLimit: 2 },
      pro: { amount: 45, postLimit: 3 },
    };

    // Ensure the user's postLimit matches their latest subscription plan
    if (user.postLimit !== plans[user.subscriptionType].postLimit) {
      user.postLimit = plans[user.subscriptionType].postLimit;
      await user.save();
    }

    // Count user's existing listings
    const userListCount = await List.countDocuments({ creator });
    if (userListCount >= user.postLimit) {
      return res.json({
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
    const getAllList = await List.find({ active: true });
    res.status(200).json({
      success: true,
      getAllList,
    });
  } catch (error) {
    next(error);
  }
};

export const getListById = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({
        success: false,
        message: "list not found",
      });
    }

    console.log(list);

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const updateListById = async (req, res, next) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    return res.json({
      success: false,
      message: "Car not found",
    });
  }
  console.log("req.user.id:", req.user.id);
  console.log("req.params.uid:", req.params.uid);
  if (req.user.id !== list.creator) {
    return res.json({
      success: false,
      message: "You can only update your own listing",
    });
  }

  try {
    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "updated Successfully",
      updatedList,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteListById = async (req, res, next) => {
  const listing = await List.findById(req.params.id);

  if (!listing) {
    return res.json({
      success: false,
      message: "listing not found",
    });
  }
  if (req.user.id !== listing.creator) {
    return res.json({
      success: false,
      message: "you can only delete your own listing",
    });
  }

  try {
    await List.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(
      listing.creator,
      { $inc: { listCount: -1 } }, // Decrease listCount by 1
      { new: true } // Optionally return the updated user document
    );
    res.status(200).json({
      success: true,
      message: "listing  deleted successffuly",
    });
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const {
      listingType = [], // rent / sale
      furnished = [], // furnished / unfurnished
      propertyType = [], // apartment / villa / etc
      condition = [], // new / used
      year = [], // year built
      description = "", // keyword search
      searchTerm = "",
      limit = 9,
      startIndex = 0,
      sortBy = "price-lowtohigh",
    } = req.query;

    let filters = {};

    if (listingType.length) {
      filters.type = { $in: listingType.split(",") };
    }

    if (furnished.length) {
      filters["commonInfo.furnished"] = { $in: furnished.split(",") };
    }

    if (propertyType.length) {
      filters["commonInfo.propertyType"] = { $in: propertyType.split(",") };
    }

    if (condition.length) {
      filters["commonInfo.condition"] = { $in: condition.split(",") };
    }

    if (year.length) {
      filters["commonInfo.year"] = { $in: year.split(",").map(Number) };
    }

    if (description) {
      filters["commonInfo.description"] = {
        $regex: description,
        $options: "i", // case insensitive
      };
    }

    if (searchTerm) {
      filters.$or = [
        { "commonInfo.title": { $regex: searchTerm, $options: "i" } },
        { "commonInfo.description": { $regex: searchTerm, $options: "i" } },
        { "commonInfo.location": { $regex: searchTerm, $options: "i" } },
        { "commonInfo.listinType": { $regex: searchTerm, $options: "i" } },
        { "saleFeatures.year": { $regex: searchTerm, $options: "i" } },
        { "saleFeatures.condition": { $regex: searchTerm, $options: "i" } },
      ];
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort["commonInfo.price"] = -1;
        break;
      case "price-hightolow":
        sort["commonInfo.price"] = 1;
        break;
      case "title-az":
        sort["commonInfo.title"] = 1;
        break;
      case "title-za":
        sort["commonInfo.title"] = -1;
        break;
      default:
        sort["commonInfo.price"] = 1;
        break;
    }

    const listings = await await List.find(filters)
      .sort(sort)
      .limit(limit)
      .skip(startIndex);

    res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    next(error);
  }
};

export const incrementViewCount = async (req, res, next) => {
  const { id } = req.params;
  try {
    const listView = await List.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );

    if (!listView) {
      return res
        .status(404)
        .json({ success: false, message: "List not found" });
    }

    res.status(200).json({ success: true, listView });
  } catch (error) {
    next(error);
  }
};
