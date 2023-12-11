import test from './test'
console.log(test)
/**
 * The base for all Stardawn objects
 */
var SDObject = class {
    constructor(){
        this.body = null
        this.position = null
    }
}
class SDSpace extends Pts.CanvasSpace
{
    /**
     * @type {Pts.CanvasSpace()}
     */
    translate(x, y){
        return this._ctx.translate(x,y)
    }
}
// create an engine
var engine = Engine.create();
engine.gravity.scale = 0 
// create a renderer
/** @type {HTMLCanvasElement} */
let canvasElement =  document.getElementById("canvas-renderer") 
let ptsSpace = new SDSpace('#canvas-renderer', DoPTSThing)
let render = Render.create({
    canvas: canvasElement,
    engine: engine,
    options: {
        background: '#fff',
        hasBounds: false
    }
});
let center = new Pts.Pt(0,0)
let followCenter = new Pts.Pt()
let cursor = new Pts.Pt(0,0)
console.log(canvasElement)
let runTicks = 100
function RunPhysics() {
    if(runTicks > 0) {
        Engine.update(engine, 1000/60)
        console.log("Running Physics")
        runTicks--
    }   
}
let ptsForm = new Pts.CanvasForm(ptsSpace)
ptsSpace.background = '#0001'
function DoPTSThing() {
console.log(ptsForm)
console.log(ptsForm.ctx)
ptsForm.arc(new Pts.Pt([30,30]), 40, 79, 189, false)
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
    ptsForm.dash(false).fill("#f00").stroke("#450",4)
    CustomWorldRender(render, time)
}, action: (type, px, py, evt) => 
{ 
    inlog(evt)
    if (evt.type )
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
    console.log(type, px, py, evt)
}
} );
var GetState = () => { throw Error("not implement") }
ptsSpace.bindMouse().bindTouch().bindKeyboard().play()
}
var CreatePlayerBody = (x,y) => Bodies.fromVertices(x,y, Matter.Vertices.create([{x:0,y:30},{x:15, y:-15},{x:-15, y: -15}]),{render:{fillStyle:'#f00'}})
var PlayerA = CreatePlayerBody(-200,-200)
PlayerA.label = "Moron"
PlayerA.oncollide = oncollide
var PlayerB = CreatePlayerBody(200,200)
PlayerB.label = "Moron"
PlayerB.oncollide = oncollide
var asteroids = []
function oncollide() {
    console.log("HEY ME")
}
// asteroid field
for(var i = 0; i < 40; i++) asteroids.push(Bodies.circle(Math.random() * 1000 - 500, Math.random() * 1000 - 500, Math.random() * 40 + 10));
// add all of the bodies to the world
Composite.add(engine.world, [...asteroids, PlayerA, PlayerB]);
function ToInt()
{

}
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
//This broke introducing PTS. Will fix later
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

//window.addEventListener('resize', fitCanvas);
//little experimental thing
//fetch("/components/card.html").then((r) => r.text().then((html) => document.getElementById("card-container").innerHTML = html.repeat(4))) 
if (import.meta.hot) {
    import.meta.hot.accept((update) => {console.log("heyoooo!")})

}