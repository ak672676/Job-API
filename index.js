const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

const notFoundMiddleware = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const authenticated = require("./middleware/authenticated");

const connectDB = require("./db");

const authRoute = require("./route/auth");
const jobRoute = require("./route/job");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/job", authenticated, jobRoute);

app.use(notFoundMiddleware);
app.use(errorHandler);

const startBackend = async () => {
  const port = process.env.PORT || 4000;
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, () => {
      console.log(`server started at port ${port}`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
startBackend();
