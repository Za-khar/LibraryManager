require("dotenv").config();

const FileTypes = ["image/png", "image/jpeg", "image/jpg"];

class Config {
  get(param, defVal = undefined) {
    if (process.env[param]) {
      return process.env[param];
    }

    return defVal;
  }

  getFileTypes() {
    return FileTypes;
  }
}

module.exports = new Config();
