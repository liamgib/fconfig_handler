# fconfig_handler
A lightweight config handler with a npm package interface.

# Motivation
This project started as a simple little internal config handler used for various personal projects.
After some refinement, this was packaged up and fconfig_handler was created. 

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
let database_config = fconfig_handler("filename.json", payload, config);

//Load data - if file doesn't exist create file based on allowCreation config or override variable.
database_config.loadData().then(data => {
    console.log(data);
});
```
#### Returns: 
> { city: 'Brisbane', country: 'Australia', postcode: 4000 }

#### Simplified Version
``` javascript
const fconfig_handler = require("fconfig_handler");

//Define config instance
let database_config = fconfig_handler("filename.json", {
    "city": { display:"City name"}, 
    "country": { display:"Country name"}, 
    "postcode": { display:"postcode", type: "Integer"}
});

//Load data - if file doesn't exist create file based on allowCreation config or override variable.
database_config.loadData().then(data => {
    console.log(data);
});
```
#### Returns: 
> { city: 'Brisbane', country: 'Australia', postcode: 4000 }

### API Reference
All accessible functions are defined below. 

#### Init: 
To initialise a new config instance, use either of the following code snippets or the Usage example above.

##### Option 1:
``` javascript 
let database_config = fconfig_handler("filename.json", {
    "city": { display:"City name"}, 
    "country": { display:"Country name"}, 
    "postcode": { display:"postcode", type: "Integer"}
});
```

##### Option 2:
``` javascript 
let config = {
    error_logs: true,
    allowCreation: true
}

let database_config = fconfig_handler("filename.json", {
    "city": { display:"City name"}, 
    "country": { display:"Country name"}, 
    "postcode": { display:"postcode", type: "Integer"}
}, config);
```

#### getErrorCode()
This function will return the error_code preventing operation. 
Please see 'Errors' below for error codes and the respective meanings.

#### clearErrorCode()
This function will clear the error_code to allow the package to operate as usual.

#### getFullFilename()
This function will return the full filename provided.

#### doesExist()
This function will return if the data file has been created.

#### save()
This function will save the data in the memory to the data file.

#### loadData(override)
(Optional) Parameter - 'Override' Default [false]
This function will load the data from the file or ask for user input if config variable 'allowCreation' is set to true or the functions override variable is set to true.

#### getUserInputs()
This function will ask the user via console to enter the values.
The existing file will be overridden. 
This function will automatically run if it needs to create the file in 'loadData()'.

#### getData()
This function will return all of the values and variables within the memory.

### setValue(identifier, value, save)
Parameter - 'identifier' The identifier to update, ie 'postcode'.
Parameter - 'value'  The value to set the identifier, ie '2000'.
(Optional) Parameter - 'save' Default [true] 
This function will set the value of the given identifier. 
If 'save' is true the file will be saved afterwards.

### Errors

##### 'load_data_error'
The loaded data experienced an error. It is either corrupted or the syntax is invalid. Perhaps call getUserInput() to reask for values? Or use .setValue().

##### 'expected_object' 
The payload given on init was not a typeof Object. 

##### 'expected_string' 
The filename given on init was not a typeof string. 

##### 'invalid_filename'
The filname given on init was not valid. Example usage 'Mysql_Database.json'

##### 'invalid_filetype'
The filetype given at the end of the filename is invalid. 
At the given time, the only acceptable filetype is '.json'.
The filename may also be invalid if it contains a '.'
