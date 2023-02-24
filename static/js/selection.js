// this javascript file is set to activate and handle multiple selection pages 
// I really liked the idea that someone could personalise content to suit what they 
// are interested in so I created this so you would have a list of things to choose from
// once you have made your choice only the things that interest you are left allowing you to 
// read more. I then had a great idea to do the same with forms I had two options: recreate this 
// file and I would have a much simpler job but I chose option two I am trying to challenge myself 
// so this file will behave differently depending on the ID of the submit button I will also have 
// to make a few catches to ensure that someone can't edit the id and break the page. 

// bug when page resized everything is reset

// found a shortcut.. this is the only thing that distinguishes a form from a submit 
// Jquery supports some animation effects vanilla supports changing styles. 
// having both equals max flexibilty
if (document.getElementById("submit")){
    var elJquery = $("#submit")
    var elVanilla = document.getElementById("submit")
} else if (document.getElementById("form")) {
    var elJquery = $("#form")
    var elVanilla = document.getElementById("form")
}
var debugselection = true // Set to true to debug page
var submitted = false // true after submit 
var submitActivated = false // true after at least one element selected
var beforeSelectionList = $(".selectable") // this gets a list of elements
var selectionList = [] // this becomes a list of IDs found on the elements in beforeSelectionList
for (var item of beforeSelectionList){
    selectionList.push(item.id)
}
var selectedElsList = [] // this is a global variable as it's used in submit and back functions 
if (debugselection){
    console.log("selection.js connected")
    console.log("these html elements have been detected")
    console.log(selectionList)
    console.log("thats a total of " + selectionList.length)
}
// essentially the main function 
window.addEventListener("load", function(event){
    // this is true if required elements are active on the html page
    var initialise = ElementChecker()
    if (debugselection){
        console.log("initialising!")
        checkBefore()
        console.log("Look for mulitple mentions of the same element that means there has been a problem with the selectionlist")
    }
    // If this is false that means this file is not needed so nothing happens
    if (initialise){
        announcePresence()
        uniformSize()
        AddEvents()
        if (debugselection){
            console.log("Calibration test ready please pay attention to the html elements with the selectable tags and press spacebar when you are ready to run the calibration test")
            // copy and pasted from here: https://stackoverflow.com/questions/24386354/execute-js-code-after-pressing-the-spacebar 
            document.body.onkeyup = function(e) {
                if (e.key == " " || e.code == "Space"){
                    elementTest()
                }
            // end of copy and pasted code
            }
        }
        // corrects any errors created by uniform size (caused by the browser cached font awesome icon not loading quickly enough)
        this.setTimeout(() =>{
            if (sizeChecker()){
                uniformSize()
            }
        },250)
    }
});

// Automated tests only happen when debugSelection is set to true

function checkBefore(){
    console.log("if submit found it will be the next log")
    console.log(document.getElementById("submit"))
    console.log("if form found it will be the next log")
    console.log(document.getElementById("form"))
    if ( document.getElementById("submit") && document.getElementById("form")){
        console.log("You currently cant have a submit and a form multiple select on the same page sorry! In the future you can though! Clicking one button will activate both")
    }
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
    console.log("In order for the submit button to function correctly there needs to be an initial div and an aftersubmit div")
    if (!document.getElementById("intial")){
        // this means there isn't an initial div
        console.log("no initial div found")
    }
    if (!document.getElementById("afterSubmit")){
        // this means there isn't an aftersubmit div
        console.log("no aftersubmit div found")
    }
    if (!document.getElementById("back")){
        // this means there isn't an aftersubmit div
        console.log("In order for users to have a good experience an element with the back id should be present so users can reset page to the initial state make sure it's in the after submit section of course")
    }
    // need a test to make sure back is hidden initially 
}
function elementTest(){
    console.log("detected elements should show blue")
    for (var element of selectionList){
        var el = document.getElementById(element)
        if (el.getAttribute('style').includes('background-color: blue !important')){
            el.setAttribute('style','');
        } else {
            el.setAttribute('style','background-color: blue !important');
            console.log("blue") 
        }     
        uniformSize()
    }
}
// end of automated tests 

function announcePresence(){
    document.getElementsByTagName("head")[0].setAttribute("id","SelectionJS") 
}

function ElementChecker(){
    // this file checks elements are present true if they are false if they are not
    // a false response from this will stop this file from functioning 
    if (typeof elJquery == "undefined"){
        // this means there isn't a submit or form button on the page
        if((selectionList.len < 1)){
            // this means there is no selectable elements on the page
            if (!document.getElementById("intial")){
                // this means there isn't an initial div
                if (!document.getElementById("afterSubmit")){
                    // this means there isn't an aftersubmit div
                    return false
                }
            }
        }
    }
    // if one test fails above it returns true
    return true
}

function uniformSize(){
    // this function resizes elements to give a uniform look
    if (!submitted){
        var sizes = []
        for (var element of selectionList){
            el = document.getElementById(element)
            sizes.push(el.offsetHeight)
        }
        var biggest = Math.max.apply(0,sizes) + "px"
        if (submitted){
            for (var element of remain){
                el = document.getElementById(element)
                el.style.height = biggest
            }
        } else {
            for (var element of selectionList){
                el = document.getElementById(element)
                el.style.height = biggest
            }
        }
    }
}

function AddEvents(){
    // this function adds the event listeners so the user can select elements on the page
    for (var element of selectionList){
        el = document.getElementById(element)
        el.addEventListener('click',(e) => {toggle(e)})
        if (debugselection){
            console.log("element with id: " + element + " should now be functioning")
        }
    }
    if (document.getElementById("back")){
        document.getElementById("back").addEventListener('click',() => {back()})
        console.log("back activated")
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
        if (debugselection){
            console.log("element with id " + id + " should have been toggled so the selected attribute equals True")
            console.log("This runs if it detects the class selected is on the element")
        }
    } else {
        if (debugselection){
            console.log("element with id " + id + " should have been toggled so the selected attribute equals False") 
            console.log("This runs if it doesn't detect the class selected is on the element")
        }
    }
    if ($(".selected").length > 0){
        displaySubmit(true)
    } else {
        displaySubmit(false)
    }
}
function sizeChecker(){
    // this checks the sizes of elements on the page
    // if it detects the selectable elements contents are too large to fit in parent DIV
    // it calls uniformsize function to correct the element and keep all elements the same size
    var response = false
    for (var element of selectionList){
        el = document.getElementById(element)
        var height = 0
        for (var child of el.children){
            if (debugselection){
                console.log(child.offsetHeight)
            }
            height = child.offsetHeight + height
        }
        // this is subjective 24 is margin of title and description P tags added together had difficulty getting the margin reliably 
        // possible improvement: Get margin of each element somehow and add to total
        height = height + 24
        if (debugselection){
            console.log(height) 
        }
        if (el.offsetHeight < height ){
            el.style.height = height + "px"
            response = true
        } else if (el.offsetHeight > (height + 50 )){
            el.style.height = height + "px"
            response = true
        }
    }
    // returns bool true if elements inside are too big for container false otherwise
    return response
}
function displaySubmit(bool){
    // bool is a boolean if true displays the submit button is false hides it
    if(bool){
        elJquery.fadeIn("fast")
        if (!submitActivated){
        elVanilla.addEventListener('click',() => {submit()})
        submitActivated = true
        }
    } else {
        elJquery.fadeOut("fast")
        if (submitActivated){
            elVanilla.removeEventListener('click',() => {submit()})
            submitActivated = false
        }
    }
}

function submit(){
    submitted = true
    var selectedEls = $(".selected")
    for (var item of selectedEls){
        selectedElsList.push(item.id)
    }
    document.getElementById("initial").style.display = "none"
    for (var id of selectedElsList){
        if(document.getElementById(id+"hide").classList.contains("hide")){
            document.getElementById(id+"hide").classList.toggle("hide") 
        }
    }
    document.getElementById("afterSubmit").style.display = "block"
    displaySubmit(false)
    selectedElsList = []
}

function back(){
    submitted = false
    document.getElementById("afterSubmit").style.display = "none"
    var selectedEls = $(".selected")
    for (var item of selectedEls){
        selectedElsList.push(item.id)
    }
    for (var id of selectedElsList){
        document.getElementById(id).classList.toggle("selected")
        if(!document.getElementById(id+"hide").classList.contains("hide")){
            document.getElementById(id+"hide").classList.toggle("hide") 
        }
    }
    document.getElementById("initial").style.display = "block"
    if (sizeChecker()){
        uniformSize()
    }
    selectedElsList = []
}
// This corrects any elements that don't look right after a resize event and 
// makes them all the same size again
let resizing = false;
window.addEventListener("resize", function(event){
    resizing = true;
  });
setInterval(() => {
    if (resizing) {
    var wait = true
    setInterval(() => {
        if (wait){
            wait = false
        }
    },250);
    resizing = false
    if (sizeChecker()){
        uniformSize()
    }
    }
},1000);