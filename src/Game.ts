/// <reference path = "Scene.ts" />

var readline = require('readline-sync');
var fs = require('fs');

class Game{
  scenes: 


   
  constructor(){

    var game = JSON.parse(fs.readFileSync('./src/game.json', 'utf8'));
    this.scenes = game.cenas

    
  }
  
}



