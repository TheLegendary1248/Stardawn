class SDSpace extends Pts.CanvasSpace
{

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