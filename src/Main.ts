var fs = require('fs');

var data = ""

var getObject = function (err, data) {
    if (err) {    
        throw err;
    }
    var arrayObject = JSON.parse(data);
    console.log("File: ", arrayObject[1].name);
}
fs.readFile('./src/Itens.json', getObject)
