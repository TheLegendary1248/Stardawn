let scripts = document.getElementsByTagName("script")
// globalThis.meta.loadedScriptTags = []
// Array.from(scripts).forEach(e => e.onload = (e) => globalThis.meta.loadedScriptTags.push(e.target) )
/** @type {HTMLElement} */
let txtElement = document.getElementById("temp")
/**
 * @param {string} stat 
 */
function UpdateStatus(stat){
    txtElement.textContent = toString(stat)
}
//console.log(scripts)'
