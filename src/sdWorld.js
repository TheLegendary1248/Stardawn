//Code for handling and creating an instance of a world
import SDSpace from "./sdspace";
import {Pts} from "./cdn"

var SDWorld = class {
    constructor(spaceArgs) {
        this.engine = Engine.create()
        this.engine.gravity.scale = 0
        this.space = new SDSpace(...spaceArgs).setup({resize: true, retina: true})
        this.form = new Pts.CanvasForm(this.space)
        this.render = Render.create({
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
        // //Fix resize
        this.space.element.width = window.innerWidth;
        this.space.element.height = window.innerHeight;
    }
}
export default SDWorld