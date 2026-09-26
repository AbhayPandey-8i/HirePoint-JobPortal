import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isEmployer } from "../middleware/isEmployer.js";
import {
  createJob,
  deleteJob,
  getAllJob,
  getJobById,
  getMyJobs,
  updateJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, isEmployer, createJob);
router.route("/get").get(getAllJob);
router.route("/get/:id").get(getJobById);
router.route("/my-jobs").get(isAuthenticated, isEmployer, getMyJobs);
router.route("/update/:id").put(isAuthenticated, isEmployer, updateJob);
router.route("/delete/:id").delete(isAuthenticated, isEmployer, deleteJob);

export default router;
