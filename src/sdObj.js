import k from "./defaultSDObj"
/**
 * The base for all Stardawn objects
 */
var SDObject = class {
    constructor(){
        this.id = null
        /**
         * @type {Matter.Body | Matter.Composite}
         */
        this.matter = null
        this.owner = null
        this.persistentData = null
        this.segmentData = null
    }
}
var SDObjectDef = class {
    constructor(){
        /** The associated number ID of this object definition
         * @type {number}
         */
        this.id
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
        /** The size of this object in bytes in the info array
         * @type {Number}
         */
        this.dataSize = null
    }
}
var ObjectList = {}

export {SDObject, ObjectList, SDObjectDef}