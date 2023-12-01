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
Alpine.store

// create an engine
var engine = Engine.create();
engine.gravity.scale = 0 
// create a renderer
let render = Render.create({
    canvas: document.getElementById("canvas-renderer"),
    engine: engine,
    options: {
        background: '#fff',
        hasBounds: true
    }
});
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
Render.run(render);
function addForces() {
    Body.applyForce(PlayerA, PlayerA.position, Vector.create(.01,.01))
    Body.applyForce(PlayerB, PlayerB.position, Vector.create(-1.0,-1.0))
}
window.addEventListener('mousedown',()=>addForces())
window.addEventListener('keydown',()=>Engine.update(engine))
function fitCanvas() {
    //https://github.com/liabru/matter-js/issues/955
    var winHeight = window.innerHeight;
    var winWidth = window.innerWidth;
    render.bounds.max.y = 800 * (Math.max(winWidth, winHeight) / winWidth); 
    render.bounds.max.x = 800 * (Math.max(winWidth, winHeight) / winHeight);
    render.bounds.min = Vector.create(0,0);
    Bounds.shift(render.bounds, Vector.create(0,0))
    console.log(`${winWidth}/${winHeight}`)
    render.options.width = winWidth;
    render.options.height = winHeight;
    render.canvas.width = winWidth;
    render.canvas.height = winHeight;
}
fitCanvas()
window.addEventListener('resize', fitCanvas);

fetch("/components/card.html").then((r) => r.text().then((html) => document.getElementById("card-container").innerHTML = html.repeat(4))) 
export default render 