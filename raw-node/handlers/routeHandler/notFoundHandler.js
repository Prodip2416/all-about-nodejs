const notFoundHandler = (requestProperty, callback) => {
  console.log(requestProperty);
  console.log("Not Found handler");

  callback(404, {
    message: "Your requested url was not found",
  });
};

module.exports = notFoundHandler;
