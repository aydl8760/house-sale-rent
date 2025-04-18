import express from "express";

import {
  createList,
  deleteListById,
  getAllLists,
  getListById,
  handleMultipleImageUpload,
  updateListById,
  getListings,
  incrementViewCount,
} from "../controllers/houseList.js";
import { authMiddleWare } from "../helpers/verifyUser.js";
import { upload } from "../helpers/cloudinary.js";

const router = express.Router();

router.post(
  "/uploadMultiImages",
  upload.array("myMultiFiles", 6),
  handleMultipleImageUpload
);

router.post("/create", authMiddleWare, createList);
router.get("/getList", getAllLists);
router.get("/get-List/:id", getListById);
router.put("/update/:id", authMiddleWare, updateListById);
router.delete("/delete/:id", authMiddleWare, deleteListById);
router.get("/get", getListings);
router.put("/:id/view", incrementViewCount);

export default router;
