"use strict";

var jsonData = require("read-write-json");

module.exports = function () {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  console.log(values);
};

module.exports.newConfigData = function () {
  return new require("./configInstance");
};

module.exports.loadData = function (fileName) {
  try {
    return jsonData.readJSONFile(fileName);
  } catch (err) {
    return null;
  }
};