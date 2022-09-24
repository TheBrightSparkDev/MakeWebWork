var debug = true
var selectionList = $(".selectable")
if (debug){
    console.log("selection.js connected")
    console.log(selectionList)
}
var selectionList = $(".selectable")
window.addEventListener("load", function(event){
    console.log("initialising!")
    AddEvents()
  });
function AddEvents(){
    console.log("in initialiser")
    for (var element of selectionList){
        console.log("in initialiser")
        el = document.getElementById(element.id)
        el.addEventListener('click',() => {toggle(element.id)})
    }
}
function toggle(id){
    el = document.getElementById(id)
    el.classList.toggle("selected")
    if("selected" in el.classList){
        el.attribute("selected","True")
    }
}