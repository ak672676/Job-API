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

const searchJob = async (req, res) => {
  const { status, position, company, numericFilters, sort, fields } = req.query;
  const query = {};

  if (status) query.status = status;
  if (position) {
    query.position = { $regex: position, $options: "i" };
  }
  if (company) query.company = company;

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["experienceInMonths", "ctc"];
    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        query[field] = { [operator]: Number(value) };
      }
    });
  }

  var result = Job.find(query);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  res.status(StatusCodes.OK).json({ itemCount: jobs.length, jobs });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  searchJob,
};
