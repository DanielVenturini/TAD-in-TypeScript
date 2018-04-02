// Vamos usar o módulo 'fs' para ler algum arquivo
var fs = require('fs');
// Na variável menObject será o objeto daonde recuperaremos o JSON
var menObject;
// data é onde guardaremos o arquivo JSON
var data = ""

// O JavaScript interpreta toda função como sendo um Objeto. Por isso podemos guardá-la em uma variável:
var handleJSONFile = function (err, data) {
    if (err) {      // se der algum erro, lança a exceção
        throw err;
    }

    // Não deu nenhum erro, então transforma o arquivo em Objeto
    menObject = JSON.parse(data);
    // E printa o campo 'description'
    console.log("File: ", menObject.description)
}

// Aqui iremos ler o arquivo ./src/Scene.json'.
// O outro parâmetro é o objeto que será executado quando a função retornar algum valor.
// Esta outra função tem dois parâmetros:(err, data).
// Se a função fs.readFile() retornar algum erro, este erro - exceção - será 'jogado' na primeira variável de parâmetro: err.
// Se der tudo certo, o retorno - o texto JSON - será 'jogado' na segunda variável de parametro: data.

fs.readFile('./src/Scene.json', handleJSONFile)

// Essa função é assincrona, ou seja, quando ela vai executar, a execução do código não fica preso nessa linha.
// Se tivesse algo aqui para baixo, o JavaScript continuaria a executar. Entao por isso passamos a função
// 'handleJSONFile', pois quando readFile retornar algo, esta função será executada automaticamente.