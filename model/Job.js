const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      maxLength: 100,
    },
    ctc: {
      type: Number,
    },
    experienceInMonths: {
      type: Number,
      required: [true, "Experience is required"],
      default: 0,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    status: {
      type: String,
      enum: ["applied", "interviewing", "hired"],
      default: "applied",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
