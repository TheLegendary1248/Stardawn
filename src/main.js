function creategame(){
  hide_main_menu()
  
}
function hide_main_menu(){
  hide_elem(document.querySelector("#home"))
  document.querySelector("#game").style.display = ""
}
/** Hides given element
  * @param {HTMLElement} elem 
  */
function hide_elem(elem){
  elem.style.display="none"  
}
