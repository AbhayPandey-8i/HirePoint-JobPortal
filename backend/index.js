import express from "express";
import dotenv, { config } from "dotenv";
import connectDb from "./database/dbConnect.js";

dotenv.config({});
connectDb();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});
