const express = require("express");
const userRoute = require("./userRoutes");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
