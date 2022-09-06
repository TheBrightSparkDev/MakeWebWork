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
var waitPeriodMs = 50 // this is how long the scroll event has to wait between fires higher the number the better the performance

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
 * mulitplyer: int, this multiplies the scroll value when calculating how far the variable should move
 * }
 */

// hero cover 
const heroCover = {
    id: "hero-cover",
    start: 0,
    end: 0,
    direction: "top",
    startpos:0,
    endpos: -Math.abs(screenHeight),
    multiplyer:1,
}



// make sure you add your element to this list.
const knownElements = [heroCover]
// this becomes the list of items on the current page.
const currentPage = []
/* This is where the elements get called */
var elementList = $(".custom-scroll")
/* this is where variables that need to persist stay */
var currScrollPos = window.pageYOffset
var lastPos = 0
var scrolled = window.pageYOffset
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
        var el = $("#" + element.id)
        // sets startpos
        el.css("position", "relative")
        el.css(element.direction, element.startpos)
        // gets the actual position of the element initially
        var coords = document.querySelector("#" + element.id).getBoundingClientRect()
        element.top = coords.top
        element.bottom = coords.bottom
        // corrects all the values based on clients window size
        element.start = element.start - window.innerHeight
        element.progress = 0
    }
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
        currScrollPos = window.pageYOffset
        scrolled = lastPos - currScrollPos
        lastPos = currScrollPos
        updateAll(currScrollPos, scrolled, lastPos)
    }
},waitPeriodMs);
function updateAll(currScrollPos, scrolled, lastPos){
    // animates elements that are supposed to be animated
    for (var element of currentPage){
        console.log(currScrollPos)
        console.log(element.top + element.start)
        console.log(element.bottom + element.end)
        var coords = document.querySelector("#" + element.id).getBoundingClientRect()
        element.top = coords.top 
        element.bottom = coords.bottom 
        if (currScrollPos >= (element.top + element.start) && currScrollPos <= (element.bottom + element.end)){
            // animate element
            console.log("animate this")
            console.log(element.endpos)
            console.log(element.startpos)
            if (element.startpos > element.endpos){
                // makes element move up or left
                // checks value wont be out of endpos bounds
                console.log("element needs to be moved up")
                if (-Math.abs(scrolled) + element.progress >= element.endpos){
                    // if out of endpos bounds need to set it to endpos
                    console.log("out of endpos bounds")
                    var el = $("#" + element.id)
                    el.css(element.direction, element.endpos)
                    element.progress = element.endpos
                } else {
                    // code is within end bounds so check if in start bounds
                    if (-Math.abs(scrolled) + element.progress <= element.startpos){
                        // element out of start bounds so set value to startpos
                        console.log("out of startpos bounds")
                        var el = $("#" + element.id)
                        el.css(element.direction, element.startpos)
                        element.progress = element.startpos
                    } else {
                        // element within both bounds
                        console.log("animating")
                        console.log(scrolled)
                        console.log(element.progress)
                        var el = $("#" + element.id)
                        el.css(element.direction, (element.progress - scrolled))
                        element.progress = element.progress - scrolled
                    }
                }
            } else {
                // makes element move down or right
                console.log("element needs to be moved down")
                if (scrolled + element.progress >= element.endpos){
                    // if out of endpos bounds need to set it to endpos
                    $("#" + element.id).css(element.direction, element.endpos)
                    element.progress = element.endpos
                } else {
                    // code is within end bounds so check if in start bounds
                    if (scrolled + element.progress <= element.startpos){
                        // element out of start bounds so set value to startpos
                        $("#" + element.id).css(element.direction, element.startpos)
                        element.progress = element.startpos
                    } else {
                        // element within both bounds

                        $("#" + element.id).css(element.direction, element.progress + scrolled)
                        element.progress = element.progress + scrolled
                    }
                }
            }
            
        } else {
            console.log("dont animate this")
        }
    } 
}