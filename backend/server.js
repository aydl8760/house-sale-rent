import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

app.use("/api/user", userRouter);

app.listen(3050, () => {
  console.log("Server is running on Port 3050");
});
