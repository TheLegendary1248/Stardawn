function creategame(){
  hide_main_menu()
  // initializeGame()
  
}
function hide_main_menu(){
  hide_elem(document.querySelector("#home"))
  document.querySelector("#game").style.display = ""
  window.dispatchEvent(new Event("resize")) //Triggers pts.CanvasSpace autoresize feature
}
/** Hides given element
  * @param {HTMLElement} elem 
  */
function hide_elem(elem){
  elem.style.display="none"  
}
globalThis.creategame = creategame
