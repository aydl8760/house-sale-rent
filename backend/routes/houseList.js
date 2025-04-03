import express from "express";

import {
  createList,
  getAllLists,
  getListById,
  handleMultipleImageUpload,
  updateListById,
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

export default router;
