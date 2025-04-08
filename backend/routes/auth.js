import express from "express";
import {
  forgotPassword,
  googleAuth,
  login,
  logout,
  resetPassword,
  signup,
} from "../controllers/auth.js";
import { authMiddleWare } from "../helpers/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/googleAuth", googleAuth);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/checkAuth", authMiddleWare, (req, res) => {
  const user = req.user;
  console.log(user);

  res.status(200).json({
    success: true,
    message: "authenticated successfully",
    user: {
      _id: user.id,
      email: user.email,
      userName: user.userName,
      avator: user.avator,
    },
  });
});

export default router;
