import SDSpace from "./sdspace";
import { CanvasForm } from "pts";
import { hide_main_menu, DoPTSThing } from "./main";
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
  ServerController.canvas = new SDSpace(document.getElementById("canvas-renderer"), () => DoPTSThing(ServerController.form)).setup({resize: true, retina: true})
  ServerController.form = new CanvasForm(ServerController.canvas)
  // console.log(ServerController)
  ServerController.world = new World() 
  // ServerController.form.fillOnly("#112").circle(Circle.fromCenter([0,0], 516));
  hide_main_menu()
}
