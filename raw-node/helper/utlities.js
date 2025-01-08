const crypto = require("crypto");
const environments = require("./environments");

const utlities = {};

utlities.parseJSON = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch (err) {
    console.log(err);
    output = {};
  }

  return output;
};
utlities.hash = (password) => {
  if (password.length > 0) {
    const hash = crypto
      .createHmac("sha256", environments.secretKey)
      .update(password) 
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

module.exports = utlities;
