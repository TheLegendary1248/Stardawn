//Code for handling and creating an instance of a world
import SDSpace from "./sdspace";

var SDWorld = class {
    constructor(spaceArgs) {
        this.engine = Engine.create()
        this.engine.gravity.scale = 0
        this.space = new SDSpace(...spaceArgs)
        this.form = new Pts.CanvasForm(this.space)
        this.render = Render.create({
            canvas: spaceArgs[0],
            engine: this.engine,
            options: {
                background: '#fff',
                hasBounds: false
            }
        });
    }
}
export default SDWorld