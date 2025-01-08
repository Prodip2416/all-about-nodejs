const http = require("http");
const handleReqResponse = require("./helper/handleReqRes.js");
const environments = require("./helper/environments");
const data = require("./lib/data");

const app = {};

// data.create(
//   "test",
//   "newFile",
//   { name: "bangladesh", language: "bangla" },
//   (err) => {
//     console.log(err);
//   }
// );
// data.update(
//   "test",
//   "newFile",
//   { name: "Bangladesh 2.0", language: "Bangla" },
//   (err) => {
//     console.log(err);
//   }

// data.read(
//   "test",
//   "newFile",
//   (err, data) => {
//     console.log(data);
//   }
// );

// data.list(
//   "test",
//   (err, data) => {
//     console.log(data);
//   }
// );

// data.delete(
//   "test",
//   "newFile",
//   (msg) => {
//     console.log(msg);
//   }
// );

app.createServer = () => {
  const server = http.createServer(handleReqResponse);
  server.listen(environments.port, () => {
    console.log(`Server is running on port ${environments.port}`);
  });
};

app.createServer();
