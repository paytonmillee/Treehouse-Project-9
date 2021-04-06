"use strict";

// Loading the modules
const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./models/index");
const courseRouter = require("./routes/course");
const userRouter = require("./routes/user");

// Enabling global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// Creating Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Gives us HTTP Request Logging
app.use(morgan("dev"));

// Friendly message for the route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

// Setting up the routes
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);

//Testing Connection

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync()
  .then(() => {
    console.log(`Database & tables created!`);
  })
  .catch((error) => {
    console.log(`There was an error syncing the database: ${error}`);
  });

// Sends 404 if route does not match
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

//global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// Setting our port
app.set("port", process.env.PORT || 5000);

// Listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
