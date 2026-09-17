import { Job } from "../model/job.model.js";

//createJob
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      skills,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !skills
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      skills,
      createdBy: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.log("Create job error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//getAllJob
export const getAllJob = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); //.sort({createdAt: -1}) this give latest job first

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log("Get all jobs error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
