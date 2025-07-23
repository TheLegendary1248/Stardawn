//Code for handling and creating an instance of a world
import SDSpace from "./sdspace";
import Matter from "matter-js"
import { CanvasForm } from "pts";

var SDWorld = class {
    constructor(spaceArgs) {
        this.engine = Matter.Engine.create()
        this.engine.gravity.scale = 0
        this.space = new SDSpace(...spaceArgs).setup({resize: true, retina: true})
        this.form = new CanvasForm(this.space)
        this.render = Matter.Render.create({
            canvas: this.space.element,
            engine: this.engine,
            options: {
                background: '#fff',
                hasBounds: false,
                showStats: true,
                showIds: true,
                showBounds: true,
                showCollisions: true,
                showPerformance: true,
                showVelocity: true,
                showPositions: true,
                showDebug: true
            }
        });
    }
}
export default SDWorld
