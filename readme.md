# fconfig_handler
A lightweight config handler with a npm package interface.

## Getting started
Install the module with `npm install fconfig_handler` or place it into your `package.json` and run `npm install`.

### Usage examples:
This is an example input that stores the user location depending on their input.
It will ask the user to enter the values if the 'server_location.json' file doesn't exist.

```javascript
const fconfig_handler = require("fconfig_handler");

let payload = {
    "city": { display:"City name"}, 
    "country": { display:"Country name"}, 
    "postcode": {type: "Integer"}
};

//Default config values
let config = {
    error_logs: true,
    allowCreation: true
}

let database_config = fconfig_handler("server_location.json", payload, config);
if(!database_config.doesExists()){
    database_config.getUserInputs();
}
```
