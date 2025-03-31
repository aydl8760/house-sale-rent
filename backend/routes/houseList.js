import express from "express";

import {
  createList,
  handleMultipleImageUpload,
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

export default router;
