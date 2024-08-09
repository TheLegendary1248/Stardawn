import { CanvasSpace } from "pts"
class SDSpace extends CanvasSpace
{
    /**
     * @param {string | Element} elem 
     * @param {function} [callback]
     */
    constructor(elem, callback){
        super(elem, callback)
        //
    }
    /**
     * @type {Pts.CanvasSpace()}
     */
    translate(x, y){
        return this._ctx.translate(x,y)
    }
    
}
export default SDSpace
