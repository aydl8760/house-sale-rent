import express from "express";
import {
  deleteUser,
  handleImageUpload,
  updateUser,
  getListsByUserId,
  verifyUserId,
  getUser,
} from "../controllers/user.js";
import { upload } from "../helpers/cloudinary.js";
import { authMiddleWare } from "../helpers/verifyUser.js";

const router = express.Router();

router.post("/uploadImage", upload.single("myFile"), handleImageUpload);
router.post("/update/:id", authMiddleWare, updateUser);
router.delete("/delete/:id", authMiddleWare, deleteUser);
router.get("/userLists/:uid", authMiddleWare, getListsByUserId);
router.get("/:id", getUser);
router.put("/verify-user/:userId", verifyUserId);

export default router;
