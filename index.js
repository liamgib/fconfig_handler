const jsonData = require("read-write-json");

module.exports.newConfigData = () => {
  return new require("./configInstance");
};

module.exports.loadData = fileName => {
  try {
    return jsonData.readJSONFile(fileName);
  } catch (err) {
    return null;
  }
};
