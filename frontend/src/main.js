
var Engine = Matter.Engine,
    Render = Matter.Render,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
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
let render = Render.create({
    canvas: document.getElementById("canvas-renderer"),
    engine: engine,
    options: {
        background: '#fff',
        hasBounds: true
    }
});
var CreatePlayerBody = (x,y) => Bodies.circle(x,y,30)

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

window.addEventListener('keydown',()=>Engine.update(engine))

//https://github.com/liabru/matter-js/issues/955
window.addEventListener('resize', () => {
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
  });

export default render 