"use strict";

var readline = require("readline");
var rl = readline.createInterface(process.stdin, process.stdout);
var jsonData = require("read-write-json");
var currentData = {};

module.exports.get = function (displayName, attribute) {
  return new Promise(function (resolve, reject) {
    rl.setPrompt("Enter the " + displayName + ": ");
    rl.prompt();
    rl.on("line", function (lineData) {
      rl.close();
      rl = readline.createInterface(process.stdin, process.stdout);
      currentData[attribute] = lineData;
      resolve(undefined);
    });
  });
};

module.exports.saveData = function (fileName) {
  jsonData.writeJSONFile(fileName, currentData);
  console.log("Configuration file saved: " + fileName);
};