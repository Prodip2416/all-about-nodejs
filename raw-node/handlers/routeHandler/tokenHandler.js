const {
  hash,
  createRandomString,
  parseJSON,
} = require("../../helper/utlities");
const data = require("../../lib/data");

const handler = {};
handler.tokenHandler = (requestProperty, callback) => {
  const allowedMethods = ["get", "post", "put", "delete"];
  if (allowedMethods.includes(requestProperty.method)) {
    handler._token[requestProperty.method](requestProperty, callback);
  } else {
    return callback(405, {
      message: `Method ${requestProperty.method} is not allowed.`,
    });
  }
};

handler._token = {};

handler._token.get = (requestProperty, callback) => {
  const id =
    typeof requestProperty.queryStringObject.id === "string" &&
    requestProperty.queryStringObject.id.trim().length === 20
      ? requestProperty.queryStringObject.id
      : null;

  if (id) {
    data.read("tokens", id, (err, tokenData) => {
      const tokenDatas = { ...tokenData };
      if (!err && tokenDatas) {
        callback(200, tokenDatas);
      } else {
        callback(404, {
          message: "Token not found",
        });
      }
    });
  } else {
    callback(404, {
      message: "Token is invalid!",
    });
  }
};
handler._token.post = (requestProperty, callback) => {
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

  if (phone && password) {
    data.read("users", phone, (err, userData) => {
      if (!err && userData) {
        const hashedPassword = hash(password);
        if (hashedPassword === userData.password) {
          const tokenId = createRandomString(20);
          const expires = Date.now() + 60 * 60 * 1000;
          let tokenObject = {
            phone,
            id: tokenId,
            expires,
          };
          data.create("tokens", tokenId, tokenObject, (err1) => {
            if (!err1) {
              callback(200, tokenObject);
            } else {
              callback(500, {
                error: "There was an error in the server side.",
              });
            }
          });
        } else {
          callback(400, {
            error: "incorrect password!.",
          });
        }
      } else {
        callback(400, {
          error: "phone no is invalid!.",
        });
      }
    });
  }
};
handler._token.put = (requestProperty, callback) => {
  const id =
    typeof requestProperty.body.id === "string" &&
    requestProperty.body.id.trim().length === 20
      ? requestProperty.body.id
      : null;
  const extend =
    typeof requestProperty.body.extend === "boolean" &&
    requestProperty.body.extend === true
      ? requestProperty.body.extend
      : false;
  if (id && extend) {
    data.read("tokens", id, (err, tokenData) => {
      if (!err && tokenData) {
        if (tokenData.expires > Date.now()) {
          tokenData.expires = Date.now() + 60 * 60 * 1000;
          data.update("tokens", id, tokenData, (err1) => {
            if (!err1) {
              callback(200, tokenData);
            } else {
              callback(500, {
                error: "There was an error in the server side.",
              });
            }
          });
        } else {
          callback(400, {
            error: "Token has expired!.",
          });
        }
      } else {
        callback(400, {
          error: "Token not found!.",
        });
      }
    });
  } else {
    callback(400, {
      error: "Missing required fields!",
    });
  }
};
handler._token.delete = (requestProperty, callback) => {
  const id =
    typeof requestProperty.body.id === "string" &&
    requestProperty.body.id.trim().length === 20
      ? requestProperty.body.id
      : null;

  if (id) {
    data.read("tokens", id, (err, tokenData) => {
      if (!err && tokenData) {
        data.delete("tokens", id, (err1) => {
          if (!err1) {
            callback(200, { message: "Token deleted successfully." });
          } else {
            callback(500, {
              error: "Could not delete the token.",
            });
          }
        });
      } else {
        callback(404, {
          error: "Token not found.",
        });
      }
    });
  } else {
    callback(400, {
      error: "Token is invalid!",
    });
  }
};
handler._token.verify = (id, phone, callback) => {
  data.read("tokens", id, (err, tokenData) => {
    if (!err && tokenData) {
      if (tokenData.phone === phone && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

module.exports = handler;
