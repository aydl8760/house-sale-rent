import express from "express";
import { handleImageUpload } from "../controllers/user.js";
import { upload } from "../helpers/cloudinary.js";

const router = express.Router();

router.post("/uploadImage", upload.single("myFile"), handleImageUpload);

export default router;
