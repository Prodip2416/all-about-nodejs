const http = require("http");
const handleReqResponse = require("./helper/handleReqRes.js");
const environments = require("./helper/environments");

const app = {};

app.createServer = () => {
  const server = http.createServer(handleReqResponse);
  server.listen(environments.port, () => {
    console.log(`Server is running on port ${environments.port}`);
  });
};

app.createServer();
