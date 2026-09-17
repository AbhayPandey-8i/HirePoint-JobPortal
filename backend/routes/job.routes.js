import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isEmployer } from "../middleware/isEmployer.js";
import { createJob, getAllJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, isEmployer, createJob);
router.route("/get").get(getAllJob);

export default router;
