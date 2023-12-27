//import HTMLInsert from "./HTMLInsert";
import SDSpace from "./sdspace";
import SDWorld from "./sdWorld";
import { SDObject } from "./sdObj";
import { Alpine, Matter, Pts } from "./cdn";
import "./inlog.js"
function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
  }
var seed = 1248;
var Rand = mulberry32(seed)
var zoom = 1;
var Cursor = {
    followCursor: new Pts.Pt(0,0),
    viewCenter: new Pts.Pt(0,0),
    smoothViewCenter: new Pts.Pt(0,0),
    inputCursor: new Pts.Pt(0,0),
    //I don't have a good name for it right now
    f(ftime) {
        this.smoothViewCenter = Pts.Geom.interpolate(Cursor.smoothViewCenter, Cursor.viewCenter, Math.min(ftime * 6 / 1000, 1))
    }
}
// create a renderer
let world = new SDWorld([document.getElementById("canvas-renderer"),DoPTSThing]) 
let ptsSpace = world.space
let runTicks = 64
function RunPhysics() {
    if(runTicks > 0) {
        Engine.update(engine, 1)
        runTicks--
    }
}
let ptsForm = world.form
ptsSpace.background = '#0000'
var DrawWorldArea = () => {
    ptsForm.fillOnly("#112").circle(Pts.Circle.fromCenter([0,0], 516));
}
function DoPTSThing() {
ptsSpace.autoResize = true
ptsSpace.add( 
    { animate: (time, ftime) => {
    //Run World
    RunPhysics()
    //Clear canvas
    ptsSpace.ctx.globalCompositeOperation = "source-in"
    ptsSpace.clear()
    ptsForm.composite()
    
    Cursor.f(ftime)
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
    var isTouch = evt instanceof TouchEvent
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
            var inputPt = new Pts.Pt(a)
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
    Cursor.followCursor = new Pts.Pt(px, py)   
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
    Bodies.fromVertices(x,y, 
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
for(var i = 0; i < 40; i++) asteroids.push(Bodies.circle((Rand() * 1000 - 500) | 0, (Rand() * 1000 - 500) | 0, (Rand() * 40 + 10) | 0, defaultBodyOptions));
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
    Body.applyForce(PlayerA, PlayerA.position, 
        Vector.div(Vector.sub(Cursor.inputCursor, PlayerA.position), 256)
        // {x:1, y:1}
        )
        
    Body.applyForce(PlayerB, PlayerB.position, 
        Vector.div(Vector.sub(PlayerB.position, Cursor.inputCursor), 256))
    //Run physics
    runTicks = 64
    //Get world current state
}
window.addEventListener("wheel", (e) => {
    var delta = (e.deltaY / 1000) * zoom
    zoom -= delta
    zoom = clamp(zoom, 0.25, 4)
})

export { Cursor, world, zoom}