const fs = require('fs');
const readline = require("readline");
const filetypes = ["json"];

//Configuration
let logErrors = true;


//Global variables
let filename, type;
let error_code = false;
function isAllowedToRun(){
  return !error_code ? true : false;
}

//Data
let data = {};

/**
 * This is the primary function when this instance is created.
 * @param {string} name The file name type. Example: 'MySQL_Cred.json' or 'MySQL_Cred'. 
 * @param {Object} values This contains all of the values stored and the atributes.
 * @param {Object=} config (Optional) This contains all of the configuration attributes for this instances behaviour.
 */
module.exports = function main(name, values, config){
  try {
    //Process filename
    if(typeof name === 'string'){
      name = name.split('.');

      if(name.length > 2) throw 'invalid_filename';
      if(name.length == 1) name[1] = "json";
      if(filetypes.includes(name[1].toLowerCase())){
        type = name[1];
        filename = name[0];
      }else throw 'invalid_filetype';

    } else throw 'expected_string';

    //Process configuration
    if(typeof config === 'object'){
      if(config["error_logs"] == false){
        logErrors = false;
      }
    } else if(typeof config !== 'undefined') throw 'expected_object';

    //Process payload
    if(typeof values ==='object'){
      return module.exports.doesExists();
    } else throw 'expected_object';
  } catch(e) {
    if(e === 'expected_object') error("expected variable type Object.");
    if(e === 'expected_string') error("expected variable type String.");
    if(e === 'invalid_filename') error("invalid file name provided.");
    if(e === 'invalid_filetype') error("unexpected filetype provided.");
    if(e === 'file_does_not_exist') error("the file doesn't exist and allowCreation is set to false.");
    error_code = e;
    return module.exports;
  }
}



module.exports.getErrorCode = function getErrorCode(){
  return error_code;
}

module.exports.clearErrorCode = function clearErrorCode(){
  error_code = false;
  return module.exports;
}

module.exports.save = function save(){
  if(isAllowedToRun()){
    fs.writeFileSync(getFullFilename(), JSON.stringify({"data": 2}, null, 2));
    return module.exports;
  }else{
    error("unable to run function - please check getErrorCode()")
    return module.exports;
  }
}

module.exports.forceReload = function forceReload(){
  if(isAllowedToRun()){
    loadData();
    return module.exports;
  }else{
    error("unable to run function - please check getErrorCode() or reset with clearErrorCode()")
    return module.exports;
  }
}

module.exports.getFullFilename = function getFullFilename(){
  return filename + "." + type;
}

module.exports.doesExists = function doesExists(){
  try {
    return fs.existsSync(module.exorts.getFullFilename());
  } catch(e){
    return false;
  }
};

async function getUserInput(variable, options){
  let display = variable;
  if(options["display"] !== undefined){
    display = options["display"];
  }

  var rl = readline.createInterface(process.stdin, process.stdout);
  rl.setPrompt("Enter the " + display + ": ");
    rl.prompt();
    rl.on("line", lineData => {
      rl.close();
      rl = readline.createInterface(process.stdin, process.stdout);
      data[variable]["value"] = lineData
      return true;
    });
}




function error(...message){
  if(logErrors) console.log('[fconfig_handler] ' + message);
}

