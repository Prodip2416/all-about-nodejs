const { hash, parseJSON } = require("../../helper/utlities");
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
  const phone =
    typeof requestProperty.queryStringObject.phone === "string" &&
    requestProperty.queryStringObject.phone.trim().length === 11
      ? requestProperty.queryStringObject.phone
      : null;

  if (phone) {
    data.read("users", phone, (err, userData) => {
      const user = { ...userData };
      if (!err && userData) {
        delete user.password;
        callback(200, user);
      } else {
        callback(404, {
          message: "User not found",
        });
      }
    });
  } else {
    data.list("users", (err, userFiles) => {
      if (!err && userFiles) {
        // get all users data...
        const allUsers = [];
        let completed = 0;

        // Read each user data in parallel
        userFiles.forEach((file) => {
          data.read("users", file, (err1, userData) => {
            completed++;

            if (!err1 && userData) {
              delete userData.password;
              allUsers.push(userData);
            }

            // Check if all reads are completed
            if (completed === userFiles.length) {
              callback(200, allUsers);
            }
          });
        });
        userFiles.forEach((file) => {
          data.read("users", file, (err1, userData) => {
            completed++;

            if (!err1 && userData) {
              delete userData.password;
              allUsers.push(userData);
            }

            // Check if all reads are completed
            if (completed === userFiles.length) {
              callback(200, allUsers);
            }
          });
        });
      } else {
        callback(500, {
          message: "Error reading data",
        });
      }
    });
  }
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
handler._user.put = (requestProperty, callback) => {
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

  if (phone) {
    if (firstName || lastName || password) {
      data.read("users", phone, (err1, userData) => {
        if (!err1 && userData) {
          userData.firstName = firstName || userData.firstName;
          userData.lastName = lastName || userData.lastName;
          userData.password = password ? hash(password) : userData.password;

          data.update("users", phone, userData, (err2) => {
            if (!err2) {
              callback(200, { message: "User updated successfully." });
            } else {
              callback(500, { error: "Could not update the user." });
            }
          });
        } else {
          callback(404, { error: "User not found." });
        }
      });
    } else {
      callback(400, {
        error: "You have to provide at least one field to update.",
      });
    }
  } else {
    callback(400, { error: "Invalid Phone No!." });
  }
};
handler._user.delete = (requestProperty, callback) => {
  const phone =
    typeof requestProperty.body.phone === "string" &&
    requestProperty.body.phone.trim().length === 11
      ? requestProperty.body.phone
      : null;
  if (phone) {
    data.read("users", phone, (err, userData) => {
      if (!err && userData) {
        data.delete("users", phone, (err1) => {
          if (!err1) {
            callback(200, { message: "User deleted successfully." });
          } else {
            callback(500, { error: "Could not delete the user." });
          }
        });
      } else {
        callback(404, { error: "User not found." });
      }
    });
  } else {
    callback(400, { error: "Invalid Phone No!." });
  }
};

module.exports = handler.userHandler;
