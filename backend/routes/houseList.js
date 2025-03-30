import express from "express";

import { createList } from "../controllers/houseList.js";
import { authMiddleWare } from "../helpers/verifyUser.js";

const router = express.Router();

router.post("/create", authMiddleWare, createList);

export default router;
