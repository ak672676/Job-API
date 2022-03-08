const { StatusCodes } = require("http-status-codes");
const Job = require("../model/Job");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ itemCount: jobs.length, jobs });
};

const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Job not found" });
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Job not found" });
  }
  res.status(StatusCodes.OK).json({ message: "Job deleted" });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
