const http = require("http");
const handleReqRes = require("../helper/handleReqRes");
const environments = require("../helper/environments");
const { sendTwilioSms } = require("../helper/notifications.js");

const server = {};

// send sms.....
// sendTwilioSms('01911111111', 'Hello world', (err) => {
//   console.log(`this is the error`, err);
// });


server.createServer = () => {
  const server = http.createServer(handleReqRes);
  server.listen(environments.port, () => {
    console.log(`Server is running on port ${environments.port}`);
  });
};

server.init = () => {
    server.createServer();
}


module.exports = server;
