var readline = require('readline-sync');
var fs = require('fs');

var game = JSON.parse(fs.readFileSync('./src/game.json', 'utf8'));

var objetos = []
var inventario = []
var cenas = []
var cenaAtual 

inventario = game.inventario
objetos = game.objetos
cenaAtual = game.cenaAtual
cenas = game.cenas

const rl = readline
var i = 3

var start = true
var start2 = true
while(start){

    console.log("\n\n\n" + cenas[i].description)

    // dois while, um para interagir na cena, e outro para carregar a outra cena
    while(start2){
        var comandoUsuario = rl.prompt(">");

        var comando = comandoUsuario.toLowerCase().split(" ")
        console.log(comando)
        switch(comando[0]){
            case "exit": {
                start = false
                start2 = false
                break
            }

            case "use": {
                if(validacaoObjetoInventario() == false){
                    console.log("Comando inválido. Por favor, tente novamente")
                    continue
                }

                break
            }

            case "go": {
                break
            }

            case "info": {
                break
            }

            case "get": {

                let object = comando[1]
                let resposta = 'Comando inválido.'

                console.log(inventario)
                for(let posObj in inventario){          // procurando objeto no inventario
                    if(inventario[posObj] == object){   // se ja estiver
                        resposta = 'Objeto ' + object + ' já está no inventário.'
                        break
                    }
                }

                for(let posObj in cenas[i].object){     // procurando nos objetos da cena
                    if(cenas[i].object[posObj] == object){
                        if(cenas[i].object[posObj].got == -1){
                            resposta = "Nao é possivel pegar o " + object
                            break
                        }

                        cenas[i].object[posObj].got = 1
                        inventario.push(object)
                        resposta = 'Objeto ' + object + ' agora está no inventário.'
                        break
                    }
                }

                console.log(resposta)
            }
        }
    }

    i 

}


function validacaoObjetoInventario(){
    for(var posObjeto in inventario) {                  // percorrendo inventario para descobrir se ja tem objeto digitado
        if(comandoUsuario.indexOf(inventario[posObjeto]) != -1) {  // achamos o nome
            for(var posItem in objetos) {                   // procurando qual item tem o nomeObjeto
                if(objetos[posItem].name == inventario[posObjeto]){            // procurando o item pelo nome

                    var posComando = validacaoComando(objetos[posItem].commandCorrect)
                    if(posComando != -1){
                        console.log(objetos[posItem].txtPositivo[posComando])
                        return true
                    }

                    posComando = validacaoComando(objetos[posItem].commandDead)
                    if(posComando != -1){
                        console.log(objetos[posItem].txtDead[posComando])
                        return true
                    }

                    //console.log("Achamos objeto: " + item.description)
                }
            }
        }
    }
    return false
}

function validacaoComando(array){
    for(var posComando in array) {    // procurando no item o comando correto
        if(array[posComando] == comandoUsuario){
            if(validacaoObjetoCena(comandoUsuario)){
                return posComando
            }
        }
    }

    return -1
}

function validacaoObjetoCena(comandoUsuario){

    //console.log(cenas[i].object)
    for(var c in cenas[i].object) {
        //console.log(comandoUsuario.indexOf(cenas[i].object[c]))
        if(comandoUsuario.indexOf(cenas[i].object[c]) != -1){
            return true
        }
    }

    return false
}
