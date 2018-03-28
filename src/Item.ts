/// <reference path = "ArrayList.ts" />


class Item{
    private id: number
    private name: string
    private description: string
    private txtPositive: string
    private txtNegative: string
    private commandCorrect: ArrayList
    private targetScene: number
    private resorved: boolean
    private got: boolean 

    constructor(id:number, name:string, description:string, txtPositive:string, txtNegative:string, 
        commandCorrect: ArrayList, targetScene:number, resorved: boolean, got: boolean){
      
            this.id = id
            this.name = name
            this.description = description
            this.txtNegative = txtNegative
            this.txtPositive = txtPositive
            this.commandCorrect = commandCorrect
            this.targetScene = targetScene
            this.resorved = resorved
            this.got = got
    }
  
    
  }
  