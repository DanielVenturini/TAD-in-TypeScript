var readline = require('readline-sync');
var fs = require('fs');

const rl = readline

var jogo = true
var turno

var game = inicializaGame()

var x = game.cenaAtual      //cena atual
var i = 0
var pos = 0

while(jogo){

    console.log(game.cenas[x].description + "\n")
    turno = true
    
    if( x == 8 ){
        creditos()
        jogo = false
        turno = false
        break
    }

    while(turno){

        var comandoUsuario = rl.prompt("> ");
        var comando = comandoUsuario.toLowerCase()
        comando = split(comando)

       switch(comando[0]){
           case "inventario": {
               printInventario()
               break
           }

            case "exit": {
                jogo = false
                turno = false
                break
            }

            case "check": {
                if(estaNoInventario()){
                    console.log(game.objetos[achaObjeto(comando[1])].description)
                    break
                }

                pos = estaNaCena(1)
                if(estaNaCena(1) != -1){
                    console.log(getObjeto(comando[1]).description)
                    break
                }

                console.log("Objeto nao esta no inventario nem na cena ou nao existe.")
                break
            }

            case "use": {

                if(estaNoInventario()){

                    if(comando[1] == "tocha" && x == 4){
                        resolved(true,0)
                        pos = achaObjeto(comando[1])
                        if(pos != -1){
                            console.log(game.objetos[8].txtPositivo[0])
                        }
                        break
                    }

                    else if(comando[2] == "with" && estaNaCena(3) != -1){
                        comparaFraseUsuario()
                        if( comando[1] == "isqueiro" && comando[3] == "tocha"){
                            game.cenas[x].resolved[2] = true
                        }

                        if(comando[1] == "flauta"){
                            resolved(true, 0)
                        }

                        if(comando[3] == "mumia" && x == 7){
                            //game.objetos[pos].resolved[0] = true
                            resolved(true, 0)    
                        }
                        continue
                    }
                }
                else if(comando[1] == "alavanca" && x == 4){
                    console.log(game.objetos[6].textDead[0])
                    gameOver()
                    break
                }
                
                comandoErro()
                break
            }

            case "go": {
                
                if(comando[2] == "saida1" || comando[2] == "saida"){                                       
                    if(game.cenas[x].resolved[0] == true){
                        x = game.cenas[x].exit[0]
                        turno = false
                    }
                    else {
                        comandoErro()                        
                    }
                }
                else if(comando[2] == "saida2"){
                    if(game.cenas[x].resolved[1]){
                        x = game.cenas[x].exit[1]
                        turno = false
                    }
                    else {
                        comandoErro()                        
                    }
                }
                else if(comando[2] == "saida3"){
                    if(game.cenas[x].resolved[2]){
                        x = game.cenas[x].exit[2]
                        turno = false
                    }
                    else{
                        comandoErro()
                    }
                }
                else{
                    comandoErro()
                }

            break
            }

            case "info": {
                info()
                break
            }

            case "get": {

                if(comando.length > 2){
                    comandoErro()
                }

                if(estaNoInventario() == true){
                    printMensagem(0)
                    break
                } else if(estaNaCena(1) != -1){
                    addObjetoInventario()

                    if(comando[1] == "pergaminho" && x == 6) {
                        pos = achaObjeto(comando[1])
                        if(testaFraseCorreta(pos) != -1){
                            resolved(false,0)
                        }
                    } else if(comando[1] == "jarro"){
                        pos = achaObjeto(comando[1])
                        if(testaFraseCorreta(pos) != -1){
                            resolved(true,1)
                        }
                    } else if(comando[1] == "ruby"){
                        pos = achaObjeto(comando[1])
                        if(testaFraseCorreta(pos) != -1){
                            resolved(true,0)
                        }
                    }
                } else{
                    comandoErro()
                }
                
            break
            }

            case "save":{
                game.cenaAtual = x
                save(comando[1])
                break
            }

            case "load":{
                game = load(comando[1])
                x = game.cenaAtual
                console.log(game.cenas[x].description)
                break
            }

            case "open":{
                pos = achaObjeto(comando[1])
                if(pos != -1 && x == 5){
                    testaFraseCorreta(pos)
                    resolved(true,0)
                    game.objetos[10].got = 0
                }
                else {
                comandoErro()
                }
                break
            }

            default:

            if(comando[0] == "agachar" ||  comando[0] == "ir_pulando" || comando[0] == "gritar_alto" || (comando[0] == "correr" && x != 2)){

                if(x == 6){
                    printMensagem(1)
                } else if(x == 9){
                    printMensagem(2)
                } else if(x ==2){
                    printMensagem(9)
                }

                gameOver()
            }

            else if(comando[0] == "rastejar" || comando[0] == "correr" || comando[0] == "gritar"){
                if(x == 6){
                    printMensagem(3)
                    resolved(true,0)                    
                }else{
                    printMensagem(4)
                }
                
                resolved(true,0)
           
            } else if(comando[0] == "ficar_parado" && x == 7){
                let i
                for(i = 0; i < game.inventario.length; i++){
                    if("ruby" == game.inventario[i]){
                        printMensagem(5)
                        gameOver()
                        break
                    }
                    else if("ouro" == game.inventario[i]){
                        printMensagem(5)
                        gameOver()
                        break
                    }
                }
                if(i == game.inventario.length){
                    printMensagem(6)
                    resolved(true,0)
                }
            } else if(comandoUsuario == "deitar_canto"){
                //console.log("Indio Ana Jones escapou por pouco" + "e conseguiu encontrar a saida do tunel")
                printMensagem(7)
                x = game.cenas[x].exit[0]   
                turno = false 
            }
            else{
                comandoErro()
            }

            break

        }
    }
}

function achaObjeto(obj){
    for(let i = 0; i < game.objetos.length; i ++){
        if(obj == game.objetos[i].name){
            return i
        }
    }
    return -1
}

function addObjetoInventario(){
    for(let i = 0; i < game.objetos.length; i++){
        if(comando[1] == game.objetos[i].name){
            if(game.objetos[i].got == -1){
                comandoErro()
                return -1
            }

            game.inventario[game.inventario.length] = game.objetos[i].name
            game.objetos[i].got = 1
            console.log(comando[1] + " foi adicionado ao seu inventario")
            return i
        }
    }

    return -1
}

function estaNoInventario(){
    for(let i = 0; i < game.inventario.length; i++){
        if(comando[1] == game.inventario[i]){
            return true
        }
    }
    return false
}

function estaNaCena(index){

    // iterar apenas nos objetos da cena
    for(let i = 0; i < game.cenas[x].object.length; i++){
        if(comando[index] == game.cenas[x].object[i]){
            return i
        }
    }
    return -1
}

function getObjeto(objeto){
    for(let i = 0; i < game.objetos.length; i ++){
        if(objeto == game.objetos[i].name){
            return game.objetos[i]
        }
    }

    return null
}

function comparaFraseUsuario(){
    for(let i = 0; i < game.objetos.length; i++){
        if(comando[1] == game.objetos[i].name){
            let a = i
            if(testaFraseCorreta(i) != -1){
                return i
            }
            else if(testaFraseMorte(a) != -1){
                return i
            }
        }
    }    
    comandoErro() 
    return -1
}

function testaFraseCorreta(pos){

    for(let i = 0; i < game.objetos[pos].commandCorrect.length; i++){
        if(comandoUsuario == game.objetos[pos].commandCorrect[i]){
            console.log(game.objetos[pos].txtPositivo[i])
            return i
        }
    }
    return -1
    
}

function testaFraseMorte(pos){

    for(let i = 0; i < game.objetos[pos].commandDead.length; i++){
        
        if(comandoUsuario == game.objetos[pos].commandDead[i]){
            console.log(game.objetos[pos].txtDead[i])
            gameOver()
            return i
        }
    }
    return -1
}

function printInventario(){
    console.log(game.inventario)
}

function gameOver(){
    console.log("\n\n*************GAME_OVER***********\n\n")
    jogo = false
    turno = false
}

function comandoErro(){
    console.log("Comando Invalido")
}

function resolved(b, posicao){
    game.cenas[x].resolved[posicao] = b
}

function info(){
    console.log("\n\ncomandos validos:\n\n"+
    "\tuse OBJETO with OBJETO\n" +
    "\tget OBJETO\n"    +
    "\tuse OBJETO\n"    +
    "\tAÇÃO ex: PULAR\n"+
    "\tgo in SAIDA\n"   +
    "\topen OBJETO\n"   +
    "\tdeliver OBJETO\n"       +
    "\t\ncheck  OBJETO\n"       +
    "\t\nsave nomePartida\n"      +
    "\t\nload nomePartida\n"      +
    "\t\nEXIT\n"        
)
}

function creditos(){
    console.log("\n\nAutores e desenvolvedores:")
    console.log("\tDaniel e Luiz")
    console.log("\nCodico do jogo:")
    console.log("\nhttps://github.com/DanielVenturini/TAD-in-TypeScript") 
    console.log("\n\nObrigado por jogar\n\n")
    console.log("\nFIM\n\n")
    
}

function printMensagem(pos){
    console.log(game.cenasJogo[pos])
}

function split(variavel){

    var array = []

    let pos = 0
    let string = ""
    for(let i = 0; i < variavel.length; i ++){

        if(variavel[i] == " " && i > 0){
            array[pos] = string
            pos ++
            string = ""
            continue
        }

        string += variavel[i]
    }

    array[pos] = string
    return array
}


function inicializaGame(){
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
    console.log("\n\n\n\n")
    console.log("\t\t\t\t\t\t\t\t\tOPCOES:")
    console.log("\t\t\t\t\t\t\t\t\tNEWGAME")
    console.log("\t\t\t\t\t\t\t\t\tload NOME_LOAD")
    console.log("\n\n\n\n")

    while(true){

    let comandoUsuario = rl.prompt("\n\n> ")
    let opc = split(comandoUsuario.toLowerCase())

        switch(opc[0]){
            case "newgame": {
                try{
                    return JSON.parse(fs.readFileSync('./src/game.json', 'utf8'))
                } catch (e){
                    console.log("Arquivo /src/game.json nao existe")
                    jogo = false
                }
            }

            case "load": {
                try{
                    return load(opc[1])
                } catch (e) {
                    console.log("Arquivo /src/save/" + opc[1] + ".json nao existe")
                    continue
                }
            }

            case "exit": {
                jogo = false
                creditos()
                return true
            }

            default: {
                console.log("Comando invalido.")
            }
        }
    }
}

function save(nameSave){
    nameSave += '.json'
    fs.writeFileSync('./src/save/' + nameSave, JSON.stringify(game))
    console.log("Jogo salvo com sucesso em ./src/save/" + nameSave)
}

function load(nameLoad){
    nameLoad += '.json'
    return JSON.parse(fs.readFileSync('./src/save/' + nameLoad, 'utf8'))
}