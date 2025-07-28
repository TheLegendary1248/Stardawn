import SDSpace from "./sdspace";
import { CanvasForm } from "pts";
import { Rand, hide_main_menu, DoPTSThing } from "./main";
import RAPIER from "@dimforge/rapier2d";
import { Pt } from 'pts'
/* Code interface for game state manipulation 
 */
class ServerController {
  players = [];
  world;
  canvas;
  form;
  constructor(){

  }
}
class Player {
  submitTurn(cursorPos){}
}
class Server {
  isOnline = false;

}
class World {
  world = new RAPIER.World({x:0,y:0})


}
globalThis.createDuel = () => {
  //create game 
  let server = new ServerController() 
  server.players.push(new Player()) 
  server.players.push(new Player()) 

  //create world
  console.log(ServerController.form)
  globalThis.rapierWorld = ServerController.world = new RAPIER.World({x:0,y:0}) //DONT FORGET THIS

  let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic();
  let getRigidBody = () => ServerController.world.createRigidBody(rigidBodyDesc);
  let getColDesc = () => { 
    let k = [Rand(),Rand(),Rand()]
    return RAPIER.ColliderDesc.ball((k[2] * 40 + 10) | 0).setTranslation((k[0] * 1000 - 500) | 0,(k[1] * 1000 - 500) | 0)
  }
  let asteroids = []
  for(var i = 0; i < 40; i++) 
    asteroids.push(ServerController.world.createCollider(getColDesc(),getRigidBody()));

  ServerController.canvas = new SDSpace(document.getElementById("canvas-renderer"), () => { DoPTSThing(ServerController.form, ServerController.world) }).setup({resize: true, retina: true})
  ServerController.form = new CanvasForm(ServerController.canvas)
  hide_main_menu()
}
