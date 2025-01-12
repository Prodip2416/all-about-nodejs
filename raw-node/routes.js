const sampleHandler = require("./handlers/routeHandler/sampleHandler");
const token = require("./handlers/routeHandler/tokenHandler");
const userHandler = require("./handlers/routeHandler/userHandler");
const check = require("./handlers/routeHandler/checkHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: token?.tokenHandler,
  check: check?.checkHandler
};

module.exports = routes;
