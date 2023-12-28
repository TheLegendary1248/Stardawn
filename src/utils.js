/**
 * Clamps the given value to a range
 * @param {*} number 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
globalThis.clamp = function (number, min, max) { return Math.max(min, Math.min(number, max))}
globalThis.mulberry32 = function(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}