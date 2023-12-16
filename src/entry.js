//import HTMLInsert from "./HTMLInsert";
import SDSpace from "./sdspace";
import SDWorld from "./sdWorld";
// create a renderer
/** @type {HTMLCanvasElement} */
let canvasElement =  document.getElementById("canvas-renderer",DoPTSThing)
let world = new SDWorld([canvasElement,DoPTSThing]) 
let ptsSpace = world.space
let followCursor = new Pts.Pt(0,0)
let center = new Pts.Pt(0,0)
let followCenter = new Pts.Pt()
let cursor = new Pts.Pt(0,0)
let render = world.render
let runTicks = 64
function RunPhysics() {
    if(runTicks > 0) {
        Engine.update(engine, 1000/60)
        console.log("Running Physics")
        runTicks--
    }   
}
let ptsForm = world.form
ptsSpace.background = '#0000'
function DoPTSThing() {
ptsSpace.autoResize = true
ptsSpace.add( 
    { animate: (time, ftime) => {
    RunPhysics()
    let m = ptsSpace.ctx.globalCompositeOperation
    ptsSpace.ctx.globalCompositeOperation = "source-in"
    ptsSpace.clear()
    ptsForm.composite()
    ptsSpace.translate(ptsSpace.width/2, ptsSpace.height/2)
    followCenter = Pts.Geom.interpolate(followCenter, center, Math.min(ftime * 6 / 1000, 1))
    
    ptsSpace.translate(followCenter.x, followCenter.y)
    //Cursor
    ptsForm.fillOnly("#112").circle(Pts.Circle.fromCenter([0,0], 516));
    ptsForm.strokeOnly("#fff", 3).dash(true,time/200).point(cursor, 16, "circle")
    ptsForm.fillOnly("#f00").point(cursor, 3, "circle")
    
    //Reset
    ptsSpace.ctx.scale(1,1)
    ptsForm.dash(false).fill("#ffff").stroke("#450f",4)
    
    CustomWorldRender(render, time)
    ptsSpace.ctx.resetTransform()
    ptsSpace.ctx.globalCompositeOperation = "difference"
    ptsForm.fillOnly("#fff").point(followCursor, 6, "circle")
    ptsForm.strokeOnly("#fff").point(followCursor, 16, "circle")
    inlog(ptsSpace.pixelScale)
}, action: (type, px, py, evt) => 
{ 
    inlog({type, px, py, evt})
    if (type == "keydown") 
    {
        var moveFunc = (m) => { center.add(m); console.log(m) } 
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
        center.add([evt.movementX,evt.movementY])
    }
    if (type == "click") 
    {
        cursor = (new Pts.Pt([px - ptsSpace.width/2, py - ptsSpace.height/2])).$subtract(center)
        cursor.x |= 0
        cursor.y |= 0
    }
    followCursor = new Pts.Pt(px, py)
}
} );
ptsSpace.bindMouse().bindTouch().bindKeyboard().play()
}
var CreatePlayerBody = (x,y) => Bodies.fromVertices(x,y, Matter.Vertices.create([{x:0,y:30},{x:15, y:-15},{x:-15, y: -15}]),{render:{fillStyle:'#f00'}})
var PlayerA = CreatePlayerBody(-200,-200)
PlayerA.label = "Moron"
PlayerA.oncollide = oncollide
var PlayerB = CreatePlayerBody(200,200)
PlayerB.label = "Moron"
PlayerB.oncollide = oncollide
PlayerB.render.strokeStyle = "#ff0"
var asteroids = []
function oncollide() {
    console.log("HEY ME")
}
var engine = world.engine
// asteroid field
for(var i = 0; i < 40; i++) asteroids.push(Bodies.circle(Math.random() * 1000 - 500, Math.random() * 1000 - 500, Math.random() * 40 + 10));
// add all of the bodies to the world
Composite.add(engine.world, [...asteroids, PlayerA, PlayerB]);
Events.on(engine, "collisionStart", function(event) {
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
    Body.applyForce(PlayerA, PlayerA.position, Vector.mult(Vector.sub(cursor, PlayerA.position), 0.00001))
    Body.applyForce(PlayerB, PlayerB.position, Vector.mult(Vector.sub(cursor, PlayerB.position), 0.00001))
    //Run physics
    runTicks = 60
    //Get world current state
}
ptsSpace.pixelScale = 2
export { render, ptsForm, ptsSpace}