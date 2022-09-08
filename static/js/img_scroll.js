console.log("connected");
/* rules for adding new elements to be caught by this
- you must add the class custom-scroll
- you must add the type of scroll
*/
// set this to false in production
var debug = true
/* this is to compliment the settings */
var screenHeight = window.innerHeight
var screenWidth = window.innerWidth
/* Settings for scroll */
var scrollMultiplyer = 1 // higher = faster smaller = slower 
var waitPeriodMs = 20 // this is how long the scroll event has to wait between fires higher the number the better the performance

/**
 *  settings per object 
 * example
 * const idnospaces = {
 * id: string, this is the elements ID
 * start: int, this is how long BEFORE it enters the screen do you want to start animating
 * end: int, this is how long AFTER it enters the screen do you want to stop animating
 * direction: string, left, top
 * startpos: int, this is the starting position of the animation 
 * endpos: int, this is the ending position of the animation
 * }
 */

// hero cover 
const heroCover = {
    id: "hero-cover",
    start: 0,
    end: screenHeight,
    direction: "margin-top",
    startpos: 0,
    endpos: -Math.abs(screenHeight / 2),
}

// make sure you add your element to this list.
// make sure that the elements are in order of display as there is a complex calculation done at the beginning
const knownElements = [heroCover]
// this becomes the list of items on the current page.
const currentPage = []
/* This is where the elements get called */
var elementList = $(".custom-scroll")
/* this is where variables that need to persist stay */
var currScrollPos = window.scrollY
var lastPos = 0
var scrolled = 0
var offset = 0
/* this forces the script to wait for the page to load */
window.addEventListener("load", function(event){
    Initializer()
  });

function Initializer(){
    if (debug){
    testElements()
    }
    checkKnown()
    activateCurrent()
}
// automatic tests (only work when debug set to true)
function testElements(){
    for (var element of elementList){
        // Check ID matches a knownElements item
        var id = element.id
        if (id == ""){
            console.log("The element you are trying to animate doesn't have an ID.")
        } else {
            var check = 0
            for (item of knownElements){
                if (item.id == id){
                    check++
                    // checks the options are valid
                    checkInts(item) // checks ints are ints
                    checkStrings(item) // checks strings are strings
                }
            }
            // this triggers if it can't find a matching setting object
            if (check == 0){
                console.log(id)
                console.log("No object was found with a matching ID.")
            }
            // this triggers if you have two settings for the same ID
            if (check > 1){
                console.log("More than one object was found with a matching ID make sure ID is unique")
            }
        }
    }
}
function checkInts(item){
    if (typeof item.start !== "number" ){
        console.log("Error in: " + item.id + " in value item.start")
        console.log(item.start + " is not an int")
    } else if (typeof item.end !== "number"){
        console.log("Error in: " + item.id + " in value item.end")
        console.log(item.end + " is not an int")
    } else if (typeof item.startpos !== "number" ){
        console.log("Error in: " + item.id + " in value item.startpos")
        console.log(item.startpos + " is not an int")
    } else if (typeof item.endpos !== "number"){
        console.log("Error in: " + item.id + " in value item.endpos")
        console.log(item.endpos + " is not an int")
    } else if (typeof item.multiplyer !== "number"){
        console.log("Error in: " + item.id + " in value item.muliplyer")
        console.log(item.multiplyer + " is not an int")
    } 
}
function checkStrings(item){
    if (typeof item.direction !== "string"){
        console.log("Error in: " + item.id)
        console.log(item.direction + " is not a string")
    } else if (item.direction == "left" || item.direction == "top"){
        // if it lands here the item.direction is valid
    } else {
        console.log("Error in: " + item.id)
        console.log(item.direction + " is not a valid option")
        console.log("valid options are left or top")
    }
}
// end of automatic tests 
function checkKnown(){
    // this code activates only the elements on the page
    for (var element of knownElements){
        for (var el of elementList){
            if (el.id == element.id){
                currentPage.push(element)
            }
        }
    }
}
function activateCurrent(){
    for (var element of currentPage){
        /* This function doesn't set the intial position of the elements it just tells the browser when it should animate and when it shouldn't */
        // get element 
        var el = $("#" + element.id)
        // get position of the element in relation to the top of the page
        var posFromTop = document.querySelector("#" + element.id).offset().top
        // set two points when to start animating and when to stop 
        element.begin = posFromTop - screenHeight - element.start + offset
        element.finish = posFromTop - screenHeight + element.end + offset
        // if the element affects the margin top all elements after will have their begin and finish offset 
        if (element.direction == "margin-top"){
            var addToOffset = element.startpos + element.endpos
            // only true if animation moves everything up
            if (element.startpos > element.endpos){
                // increases how quickly the rest of the elements are animated
                offset + addToOffset
            } else {
                // decreases how quickly the rest of the elements are animated
                offset - addToOffset
            }               
        }
        // calculate the amount the image needs to move per scroll movement based on how far it needs to travel
        // Math.abs guaratees a positive number
        var distanceTravelled = Math.abs(element.startpos + element.endpos)
        var lengthOfAnimation = Math.abs(element.end - element.start)
        // Now we have the two numbers we need to calculate an amount to multiply the scroll wheel by 
        element.multiplyer = lengthOfAnimation / distanceTravelled
    }
    setInitialPos(element.id)
}
function setInitialPos(){
    /* The goal of this function is to use the currScrollPos and calculate where each element should be in their respective animations
    this is only really usefull if the page gets refreshed as without this it was causing some visual bugs such as animations
    moving to far over or downwards putting every other animation out aswell */
    
}
/* 
This is where the variables are constantly updated 
by the scroll event this one even will update every element
on the page when it's their turn of course!
the following code was copy and pasted from this site: 
https://www.javascripttutorial.net/javascript-dom/javascript-scroll-events/ 
*/
let scrolling = false;
document.addEventListener("scroll" ,(e) => {
    scrolling = true;
});
setInterval(() => {
    if (scrolling) {
        scrolling = false;
        currScrollPos = window.scrollY
        scrolled = currScrollPos - lastPos
        lastPos = currScrollPos
        updateAll(currScrollPos, scrolled)
    }
},waitPeriodMs);
function updateAll(currScrollPos, scrolled){
    // animates elements that are supposed to be animated
    for (var element of currentPage){
        
    } 
}