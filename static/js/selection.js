var debugselection = true
// only used if debug is true

var beforeselectionList = $(".selectable")
var selectionList = []
for (var item of beforeselectionList){
    selectionList.push(item.id)
}
if (debugselection){
    console.log("selection.js connected")
    console.log("these html elements have been detected")
    console.log(selectionList)
    console.log("thats a total of " + selectionList.length)
}
window.addEventListener("load", function(event){
    if (debugselection){
        console.log("initialising!")
        checkBefore()
        console.log("Look for mulitple mentions of the same element that means there has been a problem with the selectionlist")
    }
    uniformSize()
    AddEvents()
    if (debugselection){
        console.log("Calibration test ready please pay attention to the html elements with the selectable tags and press spacebar when you are ready to run the calibration test")
        // copy and pasted from here: https://stackoverflow.com/questions/24386354/execute-js-code-after-pressing-the-spacebar 
        document.body.onkeyup = function(e) {
            if (e.key == " " || e.code == "Space"){
                elementTest()
            }
        }
    }
    // corrects any errors created by uniform size (caused by the browser cached font awesome icon not loading quickly enough)
    this.setTimeout(() =>{
        if (sizeChecker()){
            uniformSize()
        }
    },250)
});

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
        var el = document.getElementById(element)
        // This is a test to see if the selected tag is already active on the element
        if (el.classList.value.includes("selected")){
            console.log("element with ID: " + element + " Has already got the selected class added to it.")
            console.log("ignore this if that was intended of course!")
        }
    }
}
function elementTest(){
    console.log("detected elements should show blue")
    for (var element of selectionList){
        var el = document.getElementById(element)
        if (el.getAttribute('style') == 'background-color: blue !important'){
            el.setAttribute('style','');
        } else {
            el.setAttribute('style','background-color: blue !important');
            console.log("blue") 
        }     
    }
}
// end of automated tests 

function uniformSize(){
    // this function resizes elements to give a uniform look
    var sizes = []
    for (var element of selectionList){
        el = document.getElementById(element)
        sizes.push(el.offsetHeight)
    }
    console.log(sizes)
    var biggest = Math.max.apply(0,sizes) + "px"
    for (var element of selectionList){
        el = document.getElementById(element)
        el.style.height = biggest
    }
}

function AddEvents(){
    for (var element of selectionList){
        el = document.getElementById(element)
        el.addEventListener('click',(e) => {toggle(e)})
        if (debugselection){
            console.log("element with id: " + element + " should now be functioning")
        }
    }
}
function toggle(e){
    // Note to self: There has to be a better way to do this...
    // e is the pointer event
    // sometimes when the div is clicked it puts through the div itself which the first if catches
    // other times it sends a child element of the div which the else catches 
    // one fix is to ensure the div contains only full size elements making it impossible to select the underlying div
    // but this code is supposed to be extremely felxible as it will be reused in future projects on multiple selection pages.
    for (var element of selectionList){
        if (e.srcElement.id == element){
            id = e.srcElement.id
        } else if (e.srcElement.parentNode.id == element){
            id = e.srcElement.parentNode.id
        }
    }
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
function sizeChecker(){
    var response = false
    for (var element of selectionList){
        el = document.getElementById(element)
        var height = 0
        for (var child of el.children){
            console.log(child.offsetHeight)
            height = child.offsetHeight + height
        }
        height = height + 24
        console.log(height)
        if (el.offsetHeight < height ){
            el.style.height = height + "px"
            response = true
        }
    }
    return response
}