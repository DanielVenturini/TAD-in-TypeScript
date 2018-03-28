/// <reference path = "ArrayList.ts" />

class Scenes{
  private id: number
  private title: string
  private description: string
  private object: ArrayList

  constructor (id:number, title: string, description: string, object: ArrayList){
    this.id = id
    this.title = title
    this.description = description
    this.object = object
    }
}
