var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

    

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    canvas: document.getElementById("canvas-renderer"),
    engine: engine,
    options: {
        background: '#fff',
        hasBounds: true
    }
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

window.addEventListener('keydown',()=>Engine.update(engine))

//https://github.com/liabru/matter-js/issues/955
window.addEventListener('resize', () => {
    var winHeight = window.innerHeight;
    var winWidth = window.innerWidth;
    render.bounds.max.y = 800 * (Math.max(winWidth, winHeight) / winWidth); 
    render.bounds.max.x = 800 * (Math.max(winWidth, winHeight) / winHeight);
    console.log(`${winWidth}/${winHeight}`)
    render.options.width = winWidth;
    render.options.height = winHeight;
    render.canvas.width = winWidth;
    render.canvas.height = winHeight;
  });