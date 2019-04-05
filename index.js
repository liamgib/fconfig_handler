const jsonData = require("read-write-json");
const filetypes = ["json"];
let logErrors = true;
let filename, type;

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
      
    } else throw 'expected_object';

  } catch(e) {
    if(e === 'expected_object') error("expected variable type Object.");
    if(e === 'expected_string') error("expected variable type String.");
    if(e === 'invalid_filename') error("invalid file name provided.");
    if(e === 'invalid_filetype') error("unexpected filetype provided.");

  }
}

module.exports.newConfigData = function newConfigData(){
  return new require("./configInstance");
};

module.exports.loadData = function loadData(fileName){
  try {
    return jsonData.readJSONFile(fileName);
  } catch (err) {
    return null;
  }
};


function error(...message){
  if(logErrors) console.log('[fconfig_handler] ' + message);
}