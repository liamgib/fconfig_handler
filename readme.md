# fconfig_handler
A lightweight config handler with a npm package interface.

## Getting started
Install the module with `npm install fconfig_handler` or place it into your `package.json` and run `npm install`.

### Usage examples:
This is an example input that stores the user location depending on their input.
It will ask the user to enter the values if the 'server_location.json' file doesn't exist.

```javascript
const fconfig_handler = require("fconfig_handler");

//Payload
let payload = {
    "city": { display:"City name"}, 
    "country": { display:"Country name"}, 
    "postcode": { display:"postcode", type: "Integer"}
};

//Default config values
let config = {
    error_logs: true,
    allowCreation: true
}

//Define config instance
let database_config = fconfig_handler("MySQL_database", payload, config);

//Load data - if file doesn't exist create file based on allowCreation config or override variable.
database_config.loadData().then(data => {
    console.log(data);
});

```
