var readline = require('readline-sync');
var fs = require('fs');

var game = JSON.parse(fs.readFileSync('./src/game.json', 'utf8'));

const rl = readline
var x = 0      //cena atual
var i = 0
var pos = 0
var jogo = true
var turno

while(jogo){

    console.log(game.cenas[x].description)
    turno = true
    console.log("Cena atual ---- " + x)
    // dois while, um para interagir na cena, e outro para carregar a outra cena

    while(turno){

        var comandoUsuario = rl.prompt("> ");
        var comando = comandoUsuario.toLowerCase().split(" ")
       // console.log(comando)
        
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
            case "use": {
                
                if(estaNoInventario()){
                    
                    if(comando[1] == "tocha" && x == 4){
                        game.cenas[x].resolved[0] = true
                        console.log(game.cenas[x])
                        console.log(game.objetos[8].txtPositivo[0])
                        break
                    }
                    else if(comando[1] == "alavanca" && x == 4 && (estaNaCena(1) != -1)){
                        console.log(game.objetos[6].textDead[0])
                        gameOver()
                        break
                    }
                    else if(comando[3] == "with" && estaNaCena(3) != -1){
                        console.log("aki")
                        comparaFraseUsuario()
                        continue
                    }
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
                }
                else if(comando[2] == "saida2"){
                    if(game.cenas[x].resolved[1]){
                        x = game.cenas[x].exit[1]
                        turno = false
                    }
                }
                else if(comando[2] == "saida3"){
                    if(game.cenas[x].resolved[2]){
                        x = game.cenas[x].exit[2]
                        turno = false
                    }
                }
                else{
                    comandoErro()
                }

            break
            }

            case "info": {
                info()
=======
>>>>>>> 9d074ebcc09a8dae798e74004f911418e43b4aae
            break
            }

            case "get": {
                
                if(estaNoInventario() == true){
                    console.log("Item ja esta no Inventario")
                    break
                } 
                else if(estaNaCena(1) != -1){
                    getObjetoInventario()
                    
                    if(comando[1] == "pergaminho" && x == 6){
                        pos = achaObjeto(comando[1])
                        
                        if(testaFraseCorreta(pos)){
                            game.cenas[x].resolved[0] = false //nao fugir ação
                        }
                    }
                    if(comando[1] == "jarro" && x == 3){
                        pos = achaObjeto(comando[1])
                        if(testaFraseCorreta(pos)){
                            resolved(true,1)
                        }
                    }
                    if(comando[1] == "ruby" && x == 5){
                        pos = achaObjeto(comando[1])
                        if(testaFraseCorreta(pos)){
                            resolved(true,0)
                        }
                    }
                }
                else{
                    comandoErro()
                }
                
            break
            }

            case "Save Game":{


            break
            }

            case "Load Game":{


            break
            }

            case "deliver": {
                if(comando[1] == "mumia" && x == 7){
                    pos = achaObjeto(comando[1])

                    if(pos != -1){
                        game.objetos[pos].txtPositivo[0]
                        game.objetos[pos].resolved[0] = true
                    }
                }

            break
            }

            case "open":{
                pos = achaObjeto(comando[1])
                if(pos != -1){
                    testaFraseCorreta(pos)
                }
                else {
                    comandoErro()
                }
                break
            }

            default:

            //CORRER", "AGACHAR", "IR_PULANDO", "RASTEJANDO", "GRITAR_ALTO
            //CORRER, tocar a FLAUTA, usar a FACA ou GRITAR
                
            if(comando[0] == "agachar" ||  comando[0] == "ir_pulando" || comando[0] == "gritar_alto" || (comando[0] == "correr" && x == 6) ){
                
                if(x == 6){
                    console.log("Não foi uma boa ideia, elas te picaram até a morte\n")
                }

                gameOver()
            }

            else if(comando[0] == "rastejar" || comando[0] == "correr" || comando[0] == "gritar"){

                if(x == 6){
                    console.log("As serpentes ficaram atordoadas com o barulho, fazendo assim que Indio Ana Jones pudesse ir saida")
                    game.cenas[x].resolved[0] = true

                }else{
                    console.log("Indio Ana Jones escapou por pouco")
                }

                x += 1  //carrega proxima cena
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
    for(i=0; i<game.objetos.length; i++){
        if(obj == game.objetos[i].name){
            return i
        }
    }
    return -1
}


function getObjetoInventario(){
    for(i=0; i< game.objetos.length; i++){
        if(comando[1] == game.objetos[i].name && game.objetos[i].got == 0){
            game.inventario[game.inventario.length] = game.objetos[i].name
            game.objetos[i].got = 1
            console.log(comando[1] + " esta no seu inventario")
        return i
        }
    }
    return -1
}

function estaNoInventario(){
    for(i = 0; i < game.inventario.length; i++){
        if(comando[1] == game.inventario[i]){
            return true
        }
    }
    return false
}

function estaNaCena(index){
    
    for(i = 0; i < game.cenas.length; i++){
        if(comando[index] == game.cenas[x].object[i]){
            return i
        }
    }    
    return -1
}

function comparaFraseUsuario(){
    for(i = 0; i < game.objetos.length; i++){
        if(comando[1] == game.objetos[i].name){
            
            if(testaFraseCorreta(i) != -1){
                return i        
            }
            else if(testaFraseMorte(i) != -1){
                return i
            }
        }
    }    
    comandoErro() 
    return -1
}

function testaFraseCorreta(pos){
    
    
    for(i = 0; i < game.objetos[pos].commandCorrect.length; i++){
        if(comandoUsuario == game.objetos[pos].commandCorrect[i]){
            console.log(game.objetos[pos].txtPositivo[i])
            return i
        }
    }
    return -1
    
}

function testaFraseMorte(posOM){
    for(i = 0; i < game.objetos[pos].commandDead.length; i++){
        
        if(comandoUsuario == game.objetos[pos].commandDead[i]){
            
            if( (pos == 0 && i == 0) || pos == 1){ //id's morte
                gameOver()
            }
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

function resolved(bool, posicao){
    game.cenas[bool].resolved[posicao] = true
}


function info(){
    console.log("\n\ncomandos validos:\n\n"+
    "\tuse OBJETO with OBJETO\n" +
    "\tget OBJETO\n" +
    "\tuse OBJETO\n" +
    "\tAÇÃO ex: PULAR\n" +
    "\tgo in SAIDA\n" +
    "\topen OBJETO\n" +
    "\tdeliver\n\n"
)
}