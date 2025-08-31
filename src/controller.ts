import SDSpace from "./sdspace";
import { CanvasForm } from "pts";
import { Rand, hide_main_menu, DoPTSThing, defaultBodyOptions, world } from "./main";
import Matter from "matter-js";
import { Pt } from 'pts'
/* Code interface for game state manipulation 
 */
class ServerController {
  players = [];
  engine: Matter.Engine;
  canvas;
  form;
  constructor(){

  }
}
class Player {
  state = {
    health: null,
    savedChoices: null
  }
  submitTurn(turnOpts)
  {
    turnOpts.cursorPos  
    if(turnOpts.cardChoice = 1){ if(savedChoices.length <= 2) savedChoices.push(turn)}

  }
}
class Server {
  isOnline = false;

}
class World {
  world = new Matter.World({x:0,y:0})
  state = {
    cardRNGSeed
  }
}
globalThis.createDuel = () => {
  //create game 
  let server = new ServerController() 
  server.players.push(new Player()) 
  server.players.push(new Player()) 

  //create world
  console.log(ServerController.form)
  ServerController.engine = new Matter.Engine.create()
  DefaultArenaGen(ServerController.engine.world)

  let players = []

  ServerController.canvas = new SDSpace(document.getElementById("canvas-renderer"), () => { DoPTSThing(ServerController.form, ServerController.world) }).setup({resize: true, retina: true})
  ServerController.form = new CanvasForm(ServerController.canvas)
  hide_main_menu()
}
function AsteroidShapeGen(){
  throw new Error("didn't code this yet lol")
}
function DefaultArenaGen(world: Matter.World){
  let asteroids = []
  for(var i = 0; i < 40; i++) asteroids.push(Matter.Bodies.circle((Rand() * 1000 - 500) | 0, (Rand() * 1000 - 500) | 0, (Rand() * 40 + 10) | 0, defaultBodyOptions));
  Matter.Composite.add(world, [...asteroids]);
}
