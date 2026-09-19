import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      //   required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid-level", "Senior"],
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true },
);

export const Job = mongoose.model("Job", jobSchema);
