var debugselection = true
// this came from this site: https://www.sitepoint.com/delay-sleep-pause-wait/#:~:text=The%20standard%20way%20of%20creating,()%20%3D%3E%20%7B%20console.
// only used if debug is true
// not used
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
var selectionList = $(".selectable")
if (debugselection){
    console.log("selection.js connected")
    console.log("these html elements have been detected")
    console.log(selectionList)
}
var selectionList = $(".selectable")
window.addEventListener("load", function(event){
    if (debugselection){
        console.log("initialising!")
        checkBefore()
    }
    AddEvents()
    if (debugselection){
        console.log("Calibration test ready please pay attention to the html elements with the selectable tags and press spacebar when you are ready to run the calibration test")
        // copy and pasted from here: https://stackoverflow.com/questions/24386354/execute-js-code-after-pressing-the-spacebar 
        document.body.onkeyup = function(e) {
            if (e.key == " " || e.code == "Space"){
                elementTest()
            } else if (e.key == "t" || e.code == "t"){
                toggleTest()
            }
        }
    }
});
function toggleTest(){
    console.log("toggling all elements")
    for (var element of selectionList){
        toggle(element.id)
    }
}
function checkBefore(){
    console.log("This is just a helpful note:")
    console.log("if you want the color to to be different when selected the css rules you want to target are .selectable:hover and .selected background-color and color")
    if (selectionList.len < 1){
        console.log("Looks like the script hasn't detected any HTML elements that can be selected")
        console.log("This is down to two potential problems you may not have added the class selectable to any of the html elements or the page loaded before the html did")
        console.log("Either add selectable to a html element on the page")
        console.log("Make sure this js file is called later in the DOM it is set to wait until DOM is loaded so this is unlikely to be the cause.")
    }
    for (var element of selectionList){
        var el = document.getElementById(element.id)
        // This is a test to see if the selected tag is already active on the element
        if (el.classList.value.includes("selected")){
            console.log("element with ID: " + element.id + " Has already got the selected class added to it.")
            console.log("ignore this if that was intended of course!")
        }
    }
}
function elementTest(){
    console.log("detected elements should show blue")
    for (var element of selectionList){
        var el = document.getElementById(element.id)
        if (el.getAttribute('style') == 'background-color: blue !important'){
            el.setAttribute('style','');
        } else {
            el.setAttribute('style','background-color: blue !important');
            console.log("blue") 
        }     
    }
}
function AddEvents(){
    for (var element of selectionList){
        el = document.getElementById(element.id)
        el.addEventListener('click',() => {toggle(element.id)})
        if (debugselection){
            console.log("element with id: " + element.id + " should now be functioning")
        }
    }
}
function toggle(id){
    el = document.getElementById(id)
    el.classList.toggle("selected")
    if(el.classList.value.includes("selected")){
        el.setAttribute("selected","True")
        if (debugselection){
            console.log("element with id " + id + " should have been toggled so the selected attribute equals True")
            console.log("This is the current value of selected: " + el.getAttribute("selected"))
            console.log("This runs if it detects the class selected is on the element")
        }
    } else {
        el.setAttribute("selected","False")
        if (debugselection){
            console.log("element with id " + id + " should have been toggled so the selected attribute equals False") 
            console.log("This is the current value of selected: " + el.getAttribute("selected"))
            console.log("This runs if it doesn't detect the class selected is on the element")
        }
    }
}