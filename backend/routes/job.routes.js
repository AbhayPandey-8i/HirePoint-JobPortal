import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isEmployer } from "../middleware/isEmployer.js";
import {
  createJob,
  getAllJob,
  getJobById,
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, isEmployer, createJob);
router.route("/get").get(getAllJob);
router.route("/get/:id").get(getJobById);

export default router;
