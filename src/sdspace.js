class SDSpace extends Pts.CanvasSpace
{
    /**
     * @type {Pts.CanvasSpace()}
     */
    translate(x, y){
        return this._ctx.translate(x,y)
    }
}
export default SDSpace