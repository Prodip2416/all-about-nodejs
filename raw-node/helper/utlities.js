const crypto = require("crypto");
const environments = require("./environments");

const utlities = {};

utlities.parseJSON = (jsonString) => {
  let output;
  try {
    output = JSON.parse(jsonString);
  } catch (err) {
    // console.log(err);
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

utlities.createRandomString = (strLen)=>{
  if (!Number.isInteger(strLen) || strLen < 1) {
    return false;
  }
  const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < strLen; i++) {
    randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return randomString;
}

module.exports = utlities;
