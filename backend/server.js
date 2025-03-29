import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Mongodb Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(3050, () => {
  console.log("Server is running on Port 3050");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.json({
    success: false,
    message,
  });
});
