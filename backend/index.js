import express from "express";
import dotenv, { config } from "dotenv";
import connectDb from "./database/dbConnect.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config({});
connectDb();

const app = express();

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});
