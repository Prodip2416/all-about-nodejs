const url = require("url");
const stringDecoder = require("string_decoder");
const routes = require("../routes");
const notFoundHandler = require("../handlers/routeHandler/notFoundHandler");
const { parseJSON } = require("./utlities");

const handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headers;

  const requestProperty = {
    parsedUrl,
    path,
    trimedPath,
    method,
    queryStringObject,
    headerObject,
  };

  const decoder = new stringDecoder.StringDecoder("utf8");
  let realData = "";

  const chosenHandler = routes[trimedPath]
    ? routes[trimedPath]
    : notFoundHandler;

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();

    requestProperty.body = parseJSON(realData);

    chosenHandler(requestProperty, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" && payload !== null ? payload : {};

      const payloadString = JSON.stringify(payload);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = handleReqRes;
