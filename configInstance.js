const readline = require("readline");
var rl = readline.createInterface(process.stdin, process.stdout);
const jsonData = require("read-write-json");
let currentData = {};

module.exports.get = (displayName, attribute) => {
  return new Promise((resolve, reject) => {
    rl.setPrompt("Enter the " + displayName + ": ");
    rl.prompt();
    rl.on("line", lineData => {
      rl.close();
      rl = readline.createInterface(process.stdin, process.stdout);
      currentData[attribute] = lineData;
      resolve(this);
    });
  });
};

module.exports.saveData = fileName => {
  jsonData.writeJSONFile(fileName, currentData);
  console.log("Configuration file saved: " + fileName);
};

function getThis() {
  return this;
}
