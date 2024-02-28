const express = require("express");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const routes = require("./routes");
const helmet = require("helmet");
const { errorHandler } = require("./middlewares/common");
const {
  requestHandler,
  routeNotFoundHandler,
} = require("./middlewares/common");

const app = express();

app.use(helmet());

app.use((req, res, next) => {
  requestHandler(req, res, next);
});

// parse json request body
app.use(express.json());

app.use(
  morgan("dev", {
    skip: (req, res) => res.statusCode === 404 || res.statusCode === "404",
    //  skip OPTIONS method request in logs
  })
);

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options("*", cors());

// v1 api routes
app.use("/", routes);

app.use((req, res, next) => {
  routeNotFoundHandler(req, res, next);
});

app.use(errorHandler);

module.exports = app;
