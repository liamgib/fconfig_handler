const jsonData = require("read-write-json");
let logErrors = true;

module.exports = function main(values, configuration){
  try {
    //Process configuration
    if(typeof configuration === 'object'){
      
q   
    } else if(typeof configuration !== 'undefined') throw 'expected_object';

    //Process payload
    if(typeof values ==='object'){

    } else throw 'expected_object';

  } catch(e) {
    if(e === 'expected_object') error("expected variable type Object.");

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