var Engine = Matter.Engine,
    Render = Matter.Render,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Vector = Matter.Vector;
/**
 * The base for all Stardawn objects
 */
class SDObject {
    
}

// create an engine
var engine = Engine.create();
engine.gravity.scale = 0 
// create a renderer
/** @type {HTMLCanvasElement} */
let canvasElement =  document.getElementById("canvas-renderer") 
let render = Render.create({
    canvas: canvasElement,
    engine: engine,
    options: {
        background: '#fff',
        hasBounds: true
    }
});
console.log(canvasElement)
// create pts space
let ptsSpace = new Pts.CanvasSpace('#canvas-renderer',
DoPTSThing
)

let ptsForm = ptsSpace.getForm()
function DoPTSThing() {
console.log(ptsForm)
console.log(ptsForm.ctx)
ptsForm.arc(new Pts.Pt([30,30]), 40, 79, 189, false)
ptsSpace.add( (time, ftime) => {
    Render.world(render, time)
    ptsForm.stroke("#fff").fill("#f03").circle( [10, 10] );
    ptsForm.point( [25, 47], 10 );
    
    //console.log(time)
} );
ptsSpace.play()
}
function RunFrame(){
    Engine.update(engine)
    console.log("Ran Matter Frame")
}
var CreatePlayerBody = (x,y) => Bodies.circle(x,y,20,{frictionAir: 0})

var PlayerA = CreatePlayerBody(40,80)
var PlayerB = CreatePlayerBody(80,40)

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground, PlayerA, PlayerB]);

// run the renderer
//Render.run(render);
function addForces() {
    Body.applyForce(PlayerA, PlayerA.position, Vector.create(.01,.01))
    Body.applyForce(PlayerB, PlayerB.position, Vector.create(-1.0,-1.0))
}
window.addEventListener('mousedown',()=>addForces())
window.addEventListener('keydown',RunFrame)
/**
 * Poor function that does the thing it needs to 
 * @param {Matter.Render} render 
 */
function DebugRender(render) {

}
//This broke introducing PTS. Will fix later
// function fitCanvas() {
//     //https://github.com/liabru/matter-js/issues/955
//     var winHeight = window.innerHeight;
//     var winWidth = window.innerWidth;
//     render.bounds.max.y = 800 * (Math.max(winWidth, winHeight) / winWidth); 
//     render.bounds.max.x = 800 * (Math.max(winWidth, winHeight) / winHeight);
//     render.bounds.min = Vector.create(0,0);
//     Bounds.shift(render.bounds, Vector.create(0,0))
//     console.log(`${winWidth}/${winHeight}`)
//     render.options.width = winWidth;
//     render.options.height = winHeight;
//     render.canvas.width = winWidth;
//     render.canvas.height = winHeight;
// }
// fitCanvas()
//window.addEventListener('resize', fitCanvas);

//little experimental thing
//fetch("/components/card.html").then((r) => r.text().then((html) => document.getElementById("card-container").innerHTML = html.repeat(4))) 
//export default render 