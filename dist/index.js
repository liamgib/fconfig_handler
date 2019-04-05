"use strict";

var jsonData = require("read-write-json");

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