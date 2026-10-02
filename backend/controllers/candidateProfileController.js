import CandidateProfile from "../model/candidateProfile.js";

//creating candidate profile
export const createCandidateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const existingProfile = await CandidateProfile.findOne({ user: userId });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    const { phone, location, headline, about, skills, education, experience } =
      req.body;

    const profile = await CandidateProfile.create({
      user: userId,
      phone,
      location,
      headline,
      about,
      skills,
      education,
      experience,
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    console.log("Create Candidate Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create profile",
    });
  }
};

//getting candidate profile;
export const getCandidateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const profile = await CandidateProfile.findOne({
      user: userId,
    }).populate("user", "fullName email role");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.log("Get Candidate Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get profile",
    });
  }
};

//update candidateProfile or edit
export const updateCandidateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const { phone, location, headline, about, skills, education, experience } =
      req.body;

    const profile = await CandidateProfile.findOne({
      user: userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Candidate profile not found",
      });
    }

    if (phone !== undefined) {
      profile.phone = phone;
    }

    if (location !== undefined) {
      profile.location = location;
    }

    if (headline !== undefined) {
      profile.headline = headline;
    }

    if (about !== undefined) {
      profile.about = about;
    }

    if (skills !== undefined) {
      profile.skills = skills;
    }

    if (education !== undefined) {
      profile.education = education;
    }

    if (experience !== undefined) {
      profile.experience = experience;
    }

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Candidate profile updated successfully",
      profile,
    });
  } catch (error) {
    console.log("Update candidate profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
