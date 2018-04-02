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

  getId():number{
    return this.id
  }

  setId(id:number){
    this.id = id
  }

  getTitle():string{
    return this.title
  }

  setTitle(title:string){
    this.title = title
  }

  getDescription():string{
    return this.description
  }

  setDescription(description:string){
    this.description = description
  }

  getObjects():ArrayList{
    return this.object
  }

  setObjects(object:ArrayList){
    this.object = object
  }
}
