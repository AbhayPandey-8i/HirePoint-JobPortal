import express from "express";
import {
  createCandidateProfile,
  getCandidateProfile,
  updateCandidateProfile,
} from "../controllers/candidateProfileController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createCandidateProfile);
router.route("/me").get(isAuthenticated, getCandidateProfile);
router.route("/profile").patch(isAuthenticated, updateCandidateProfile);

export default router;
