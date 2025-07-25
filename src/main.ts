import "./mangle.ts"
/*=================MAIN.JS====================*/
function creategame(){
  hide_main_menu()
  // initializeGame()
  
}
function hide_main_menu(){
  hide_elem(document.querySelector("#home"))
  document.querySelector("#game").style.display = ""
  window.dispatchEvent(new Event("resize")) //Triggers pts.CanvasSpace autoresize feature
}
/** Hides given element
  * @param {HTMLElement} elem 
  */
function hide_elem(elem){
  elem.style.display="none"  
}
globalThis.creategame = creategame
/*=================UTILS.JS===================*/

globalThis.clamp = function (number, min, max) { return Math.max(min, Math.min(number, max))}
globalThis.mulberry32 = function(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}
/**
 * Create an element that 
 */
var captured = []
//Dev things
globalThis.sd_core = {meta:{}} //Instead of logging everything, i figure to keep it here
/*============================================*/
//import HTMLInsert from "./HTMLInsert";
import SDSpace from "./sdspace";
import SDWorld from "./sdWorld";
import { SDObject } from "./sdObj";
import Matter from "matter-js"
// import Alpine from "alpinejs"
import { Pt, Geom, Circle } from 'pts'
// import "./inlog.js"
var worldHTML = await import("./html/world.html?raw")
// console.log(worldHTML.default)
// document.getElementsByTagName("body")[0].innerHTML += worldHTML.default
var seed = 1248;
var Rand = mulberry32(seed)
var zoom = 1;
var Cursor = {
    followCursor: new Pt(0,0),
    viewCenter: new Pt(0,0),
    smoothViewCenter: new Pt(0,0),
    inputCursor: new Pt(0,0),
    /**Smooths the current cursor values to such */
    smooth(ftime: Number) {
        this.smoothViewCenter = Geom.interpolate(Cursor.smoothViewCenter, Cursor.viewCenter, Math.min(ftime * 6 / 1000, 1))
    }
}
let world = new SDWorld([document.getElementById("canvas-renderer"),DoPTSThing]) 
let ptsSpace = world.space
let runTicks = 64
function RunPhysics() {
    if(runTicks > 0) {
        Matter.Engine.update(engine, 1)
        runTicks--
    }
}
let ptsForm = world.form
ptsSpace.background = '#0000'
var DrawWorldArea = () => {
  const gradient = ptsForm.ctx.createLinearGradient(20, 0, 220, 0);

// Add three color stops
    gradient.addColorStop(0, "green");
    gradient.addColorStop(0.5, "cyan");
    gradient.addColorStop(1, "green");
    ptsForm.fillOnly("#112").circle(Circle.fromCenter([0,0], 516));
}
function DoPTSThing() {
ptsSpace.add( 
    { animate: (time, ftime) => {
    //Run World
    RunPhysics()
    //Clear canvas
    ptsSpace.ctx.globalCompositeOperation = "source-in"
    ptsSpace.clear()
    ptsForm.composite()
    
    Cursor.smooth(ftime)
    //VIEWPORT TRANSFORMS
    //Center view
    ptsSpace.translate(ptsSpace.width / 2, ptsSpace.height / 2)
    //Zoom
    ptsSpace.ctx.scale(zoom, zoom)
    //Offset to view center
    ptsSpace.translate(Cursor.smoothViewCenter.x,Cursor.smoothViewCenter.y)
    
    DrawWorldArea()
    //Reset
    ptsSpace.ctx.scale(1,1)
    ptsForm.dash(false).fill("#ffff").stroke("#450f",4)
    
    CustomWorldRender(world.render, time)
    //Cursor
    ptsForm.strokeOnly("#fff", 3 / zoom).dash(true,time/200).point(Cursor.inputCursor, 16 / zoom, "circle")
    ptsForm.fillOnly("#f00").point(Cursor.inputCursor, 3 / zoom, "circle")
    ptsForm.dash(false)
    //UI Draw
    ptsSpace.ctx.resetTransform()
    ptsSpace.ctx.scale(ptsSpace.pixelScale,ptsSpace.pixelScale)
    //Follow cursor
    ptsSpace.ctx.globalCompositeOperation = "difference"
    ptsForm.fillOnly("#fff").point(Cursor.followCursor, 6, "circle")
    ptsForm.strokeOnly("#fff", 4).point(Cursor.followCursor, 16, "circle")
    
},
/** @param {Event | TouchEvent} evt */ 
action: (type, px, py, evt: (Event & KeyboardEvent & DragEvent & TouchEvent)) => 
{ 
    if(globalThis.TouchEvent) var isTouch = evt instanceof TouchEvent
    if (type == "keydown") 
    {
        var moveFunc = (m) => { Cursor.viewCenter.add(m); } 
        switch (evt.key) {
            case "w": case "ArrowUp": moveFunc([0,10]); break;
            case "a": case "ArrowLeft": moveFunc([10,0]); break;
            case "s": case "ArrowDown": moveFunc([0,-10]); break;
            case "d": case "ArrowRight": moveFunc([-10,0]); break;
            case " ": PlayTimeSegment(); break;
        }
    }
    if (type == "drag")
    {
        if(isTouch)
        {
            console.log(evt.touches)
            Cursor.viewCenter.add([evt.movementX / zoom, evt.movementY / zoom])
        }
        else Cursor.viewCenter.add([evt.movementX / zoom,evt.movementY / zoom])
    }
    if (type == "click") 
    {
        var toPos = (a) => {
            var inputPt = new Pt(a)
            inputPt[0] -= ptsSpace.width / 2
            inputPt[1] -= ptsSpace.height / 2
            inputPt.divide(zoom)
            inputPt.subtract(Cursor.viewCenter)
            return inputPt
        }
        Cursor.inputCursor = toPos([px,py])
        Cursor.inputCursor.x |= 0
        Cursor.inputCursor.y |= 0
    }
    Cursor.followCursor = new Pt(px, py)   
}
} );
ptsSpace.bindMouse().bindTouch().bindKeyboard().play()
}
const defaultBodyOptions: Matter.IBodyDefinition = {
    friction: 0,
    frictionAir: 0,
    restitution: 0
}
var CreatePlayerBody = (x,y) => {
    var k = 
    Matter.Bodies.fromVertices(x,y, 
        [{x:0,y:30},{x:15, y:-15},{x:-15, y: -15}], defaultBodyOptions)
    k.mass = 1
    return k
}

var Players = []
var PlayerA = CreatePlayerBody(-200,-200)
PlayerA.label = "Player A"
var PlayerB = CreatePlayerBody(200,200)
PlayerB.label = "Player B"
PlayerB.render.strokeStyle = "#ff0"
var asteroids = []
var engine = world.engine
// asteroid field
for(var i = 0; i < 40; i++) asteroids.push(Matter.Bodies.circle((Rand() * 1000 - 500) | 0, (Rand() * 1000 - 500) | 0, (Rand() * 40 + 10) | 0, defaultBodyOptions));
// add all of the bodies to the world
Matter.Composite.add(engine.world, [...asteroids, PlayerA, PlayerB]);
Matter.Events.on(engine, "collisionStart", function(event) {
    var pairs = event.pairs
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var bodyA = pair.bodyA
        var bodyB = pair.bodyB
        if(bodyA.oncollide) bodyA.oncollide()
        if(bodyB.oncollide) bodyB.oncollide()
    }
})
function PlayTimeSegment() {
    //Init
    Matter.Body.applyForce(PlayerA, PlayerA.position, 
        Matter.Vector.div(Matter.Vector.sub(Cursor.inputCursor, PlayerA.position), 256)
        // {x:1, y:1}
        )
        
    Matter.Body.applyForce(PlayerB, PlayerB.position, 
        Matter.Vector.div(Matter.Vector.sub(PlayerB.position, Cursor.inputCursor), 256))
    //Run physics
    runTicks = 64
    //Get world current state
}

window.addEventListener("wheel", (e) => {
    var delta = (e.deltaY / 1000) * zoom
    zoom -= delta
    zoom = clamp(zoom, 0.25, 4)
})
// Alpine.data('world', () => ({
//     text: "hey world",
//
//     toggle() {
//         this.open = ! this.open
//     },
// }))
export { Cursor, world, zoom}
