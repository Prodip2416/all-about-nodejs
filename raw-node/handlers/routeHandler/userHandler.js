const { hash } = require("../../helper/utlities");
const data = require("../../lib/data");

const handler = {};
handler.userHandler = (requestProperty, callback) => {
  const allowedMethods = ["get", "post", "put", "delete"];
  if (allowedMethods.includes(requestProperty.method)) {
    handler._user[requestProperty.method](requestProperty, callback);
  } else {
    return callback(405, {
      message: `Method ${requestProperty.method} is not allowed.`,
    });
  }
};

handler._user = {};

handler._user.get = (requestProperty, callback) => {
  callback(200, {
    message: "User data",
  });
};
handler._user.post = (requestProperty, callback) => {
  const firstName =
    typeof requestProperty.body.firstName === "string" &&
    requestProperty.body.firstName.trim().length > 0
      ? requestProperty.body.firstName
      : null;
  const lastName =
    typeof requestProperty.body.lastName === "string" &&
    requestProperty.body.lastName.trim().length > 0
      ? requestProperty.body.lastName
      : null;
  const phone =
    typeof requestProperty.body.phone === "string" &&
    requestProperty.body.phone.trim().length === 11
      ? requestProperty.body.phone
      : null;
  const password =
    typeof requestProperty.body.password === "string" &&
    requestProperty.body.password.trim().length > 0
      ? requestProperty.body.password
      : null;
  const tosAgreement =
    typeof requestProperty.body.tosAgreement === "boolean"
      ? requestProperty.body.tosAgreement
      : null;
  if (firstName && lastName && password && phone && tosAgreement) {
    data.read("users", phone, (err, userData) => {
      if (err) {
        const userDetails = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        data.create("users", phone, userDetails, (err1) => {
          if (!err1) {
            callback(200, { message: "User created successfully" });
          } else {
            callback(500, { error: "Could not create the user" });
          }
        });
      } else {
        callback(400, { error: "User already exist" });
      }
    });
  } else {
    callback(400, {
      error: "you have a problem in your request",
    });
  }
};
handler._user.put = (requestProperty, callback) => {};
handler._user.delete = (requestProperty, callback) => {};

module.exports = handler.userHandler;
