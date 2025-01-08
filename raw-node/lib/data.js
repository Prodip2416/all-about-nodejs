const fs = require("fs");
const path = require("path");

const lib = {};

// Base directory of the data folder
lib.basedir = path.join(__dirname, "/../.data/");

// Create a new file
lib.create = (dir, file, data, callback) => {
  // Check if directory exists, if not create it
  const dirPath = path.join(lib.basedir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Create file path
  const filePath = path.join(dirPath, `${file}.json`);

  // Open file for writing
  fs.open(filePath, "wx", (err, fileDescriptor) => {
    if (err) {
      return callback("Could not create new file, it may already exist");
    }

    try {
      // Convert data to string if it's an object
      const stringData =
        typeof data === "object"
          ? JSON.stringify(data)
          : JSON.stringify(JSON.parse(data));

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if (err) {
          return callback("Error writing to new file");
        }

        fs.close(fileDescriptor, (err) => {
          if (err) {
            return callback("Error closing new file");
          }
          callback(false);
        });
      });
    } catch (e) {
      return callback("Error processing data. Invalid JSON.");
    }
  });
};

// Add read operation
lib.read = (dir, file, callback) => {
  const filePath = path.join(lib.basedir, dir, `${file}.json`);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    try {
      const parsedData = JSON.parse(data);
      callback(false, parsedData);
    } catch (e) {
      callback("Error parsing file content");
    }
  });
};

// Add update operation
lib.update = (dir, file, data, callback) => {
  const filePath = path.join(lib.basedir, dir, `${file}.json`);

  // Open file for writing
  fs.open(filePath, "r+", (err, fileDescriptor) => {
    if (err) {
      return callback("Could not open file for updating, it may not exist");
    }

    try {
      const stringData =
        typeof data === "object"
          ? JSON.stringify(data)
          : JSON.stringify(JSON.parse(data));

      // Truncate the file
      fs.ftruncate(fileDescriptor, (err) => {
        if (err) {
          return callback("Error truncating file");
        }

        // Write to file and close it
        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (err) {
            return callback("Error writing to existing file");
          }

          fs.close(fileDescriptor, (err) => {
            if (err) {
              return callback("Error closing file");
            }
            callback(false);
          });
        });
      });
    } catch (e) {
      return callback("Error processing data. Invalid JSON.");
    }
  });
};

// Add delete operation
lib.delete = (dir, file, callback) => {
  const filePath = path.join(lib.basedir, dir, `${file}.json`);
  fs.unlink(filePath, (err) => {
    if (err) {
      return callback("Error deleting file");
    }
    callback(false);
  });
};

// Add list operation to get all files in a directory
lib.list = (dir, callback) => {
  const dirPath = path.join(lib.basedir, dir);
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return callback("Error reading directory");
    }
    // Remove .json extension from filenames
    const trimmedFileNames = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(".json", ""));
    callback(false, trimmedFileNames);
  });
};

module.exports = lib;
