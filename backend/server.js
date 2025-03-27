import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.listen(3050, () => {
  console.log("Server is running on Port 3050");
});
