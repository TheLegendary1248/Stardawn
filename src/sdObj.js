/**
 * The base for all Stardawn objects
 */
var SDObject = class {
    constructor(){
        this.body = null
        this.position = null
        this.velocity = null
        this.matter = null
        this.owner = null
    }
}
var k = [3,4,5, "hello"]
var SDObjectDef = class {
    constructor(){
        /**Number of ticks a full charge shot takes*/
        this.wait = null
        /** Total damage this object deals
         * @type {number} */
        this.damage = null
        /** How this object transforms the hit*/
        this.indextransform = null
        /**The speed of this projectile 
         * @type {number}
        */
        this.speed = null
        /**The other projectiles this one can create 
         * @type {(number|SDObjectDef)[]}
        */
        this.frag = null
        /**
         * The weight of this object in the info array
         */
        this.dataweight = null
        /** How this object gets put in the info array */
        this.insertion = null
    }
}
var SDAnimation = class {

}