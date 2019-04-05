const fs = require('fs');
const filetypes = ["json"];

//Configuration
let logErrors = true;
let allowCreation = true;

//Global variables
let filename, type;
let error_code = false;


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
      let file_existing = loadData();
      if(file_existing == null){
        if(!allowCreation) throw 'file_does_not_exist';
      };
    } else throw 'expected_object';
    return module.exports;
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

module.exports.newConfigData = function newConfigData(){
  return new require("./configInstance");
};


module.exports.getErrorCode = function getErrorCode(){
  return error_code;
}

module.exports.clearErrorCode = function clearErrorCode(){
  error_code = false;
  return module.exports;
}

module.exports.saveFile = function saveFile(){
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

function loadData(){
  try {
  let loaded_file = JSON.parse(fs.readFileSync(filename, 'utf8'));
    return loaded_file
  } catch(e){
    return null;
  }
};

function error(...message){
  if(logErrors) console.log('[fconfig_handler] ' + message);
}

