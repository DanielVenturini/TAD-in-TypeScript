// Declare your variables
var fs = require('fs');
var menObject;
// Read the file, and pass it to your callback
fs.readFile('./src/Scene.json', handleJSONFile);
// Handle the data 
var handleJSONFile = function (err, data) {
    if (err) {
        throw err;
    }
    menObject = JSON.parse(data);
    console.log(menObject);
};
