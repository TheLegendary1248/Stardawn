let scripts = document.getElementsByTagName("script")
Array.from(scripts).forEach(e => e.onload = (e) => console.log(e.target) )
/** @type {HTMLElement} */
let txtElement = document.getElementById("temp")
/**
 * @param {string} stat 
 */
function UpdateStatus(stat){
    txtElement.textContent = toString(stat)
}
//console.log(scripts)'
