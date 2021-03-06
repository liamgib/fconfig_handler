const fs = require('fs');
const readline = require("readline");
const filetypes = ["json"];

//Configuration
let logErrors = true;
let allowCreation = true;

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
      if(config["allowCreation"] == false){
        allowCreation = false;
      }
    } else if(typeof config !== 'undefined') throw 'expected_object';

    //Process payload
    if(typeof values ==='object'){
      data = values;
      return module.exports;
    } else throw 'expected_object';
  } catch(e) {
    if(e === 'expected_object') error("expected variable type Object.");
    if(e === 'expected_string') error("expected variable type String.");
    if(e === 'invalid_filename') error("invalid file name provided.");
    if(e === 'invalid_filetype') error("unexpected filetype provided.");
    error_code = e;
    return module.exports;
  }
}

/**
 * This function will return the current error code if a recent error occured.
 * @returns {number} Returns the current error code if any, else false.
 */
module.exports.getErrorCode = function getErrorCode(){
  return error_code;
}

/**
 * This function will clear all error codes and allow the system to continue running.
 * Should be unlikely to occur.
 */
module.exports.clearErrorCode = function clearErrorCode(){
  error_code = false;
  return module.exports;
}


/**
 * This function will return the full filename.
 * @returns {string} The full filename with .type on the end.
 */
module.exports.getFullFilename = function getFullFilename(){
  return filename + "." + type;
}

/**
 * This function will check if the associative data file exists.
 * @returns {boolean} if the data file exists.
 */
module.exports.doesExists = function doesExists(){
  try {
    return fs.existsSync(module.exports.getFullFilename());
  } catch(e){
    return false;
  }
};

/**
 * The function will clear the current data saved in memory.
 */
module.exports.save = function save(){
  let processed_data = {};
  let i = 0;
  for(let value in data){
    processed_data[value] = data[value]["value"];
    i++;
    if(i == Object.keys(data).length){
      if(isAllowedToRun()){
        fs.writeFileSync(module.exports.getFullFilename(), JSON.stringify(processed_data, null, 2));
        return module.exports;
      }else{
        error("unable to run function - please check getErrorCode()")
        return module.exports;
      }
    }
  }
}

/**
 * Load data from file or ask for user input if allowCreation is set to true or override set to true.
 * @returns {Object} Returns loaded data from file or user input.
 */
module.exports.loadData = async function(override=false){
  if(!module.exports.doesExists() && (allowCreation || override)){
    module.exports.getUserInputs().then(function(){
      return data;
    });
  }else{
    try{
    let loaded_data = JSON.parse(fs.readFileSync(module.exports.getFullFilename(), 'utf8'));
    let i = 0;
    for(let value in loaded_data){
      i++;
      data[value]["value"] = loaded_data[value];
      if(Object.keys(loaded_data).length == i){
        return loaded_data;
      }
    }
    }catch(e){
      return 'load_data_error';
    }
  }
}


/**
 * The function re-iterats through variables and asks the user for the input.
 * It contains an internal function.
 * @returns {Promise} Will resolve true when complete.
 */
module.exports.getUserInputs = async function getUserInput(){
  i = 0;
  function getInput(){
    let keys = Object.keys(data);
    variable = keys[i];
    options = data[variable];
    let display = variable;
    let type = options["type"] == undefined ? "String" : (options["type"] == "String") ? "String" : "Integer";

    i++;
    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt("Enter the " + display + ": ");
    rl.prompt();
    rl.on("line", lineData => {
      rl.close();
      //Check line input type.
      if(type == "Integer" && !lineData.match("-?\\d+(\\.\\d+)?")){
        i--;
        console.log("Invalid input type, expected (" + type.toLowerCase() + ") - was given: (" + (typeof lineData) + ")");
        getInput();
      }else{
        
        data[variable]["value"] = (type == "Integer") ? parseFloat(lineData) : lineData;
        if(i == keys.length){
          module.exports.save();
          return true;
        }else{
          getInput();
        }
      }
    });
  }
  return await getInput();
}

/**
 * Used to retrieve the current data in the memory_pool.
 * Call .save() to save it to the file.
 * @returns {Object} Loaded data in memory pool
 */
module.exports.getData = function getData(){
  let processed_data = {};
  let i = 0;
  for(let value in data){
    processed_data[value] = data[value]["value"];
    i++;
    if(i == Object.keys(data).length){
      return processed_data;
    }
  }
}

/**
 * Used to set value of an identifier.
 * @param {string} identifier The identifier to update, ie 'postcode'.
 * @param value The value to set the identifier, ie '2000'.
 * @param {Object=} save (Optional) If true, the file will be saved automatically.
 */
module.exports.setValue = function setValue(identifier, value, save=true){
  data[identifier]["value"] = value;
  if(save) module.exports.save();
}

function error(...message){
  if(logErrors) console.log('[fconfig_handler] ' + message);
}

