import { User } from "../model/user.model.js";

export const isEmployer = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only employers can perform this action.",
      });
    }

    next();
  } catch (error) {
    console.log("Employer authorization failed:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
