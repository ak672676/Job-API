const express = require("express");
const {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
} = require("../controller/job");
const router = express.Router();

router.route("/").get(getAllJobs);
router.route("/").post(createJob);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
