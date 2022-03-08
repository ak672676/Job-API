const express = require("express");
const {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
  searchJob,
} = require("../controller/job");
const router = express.Router();

router.route("/").get(getAllJobs);
router.route("/").post(createJob);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);
router.route("/search/:keyword").get(searchJob);

module.exports = router;
