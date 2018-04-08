var fs = require('fs');

var data = ""

var getObject = function (err, data) {
    if (err) {    
        throw err;
    }
    var arrayObject = JSON.parse(data);
    console.log("File: ", arrayObject[0].object[0].name);
}
fs.readFile('./src/Scenes.json', getObject)
