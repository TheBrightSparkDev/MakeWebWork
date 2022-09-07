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
    multiplyer:1.5,
}



// make sure you add your element to this list.
const knownElements = [heroCover]
// this becomes the list of items on the current page.
const currentPage = []
/* This is where the elements get called */
var elementList = $(".custom-scroll")
/* this is where variables that need to persist stay */
var currScrollPos = window.pageYOffset
console.log(currScrollPos)
var lastPos = 0
var scrolled = 0
console.log(scrolled)
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
        el.css("position", "relative")
        // gets the actual position of the element now
        var coords = document.querySelector("#" + element.id).getBoundingClientRect()
        element.top = coords.top + currScrollPos
        element.bottom = coords.bottom + currScrollPos
        element.start = -Math.abs(screenHeight) - element.start
        element.progress = 0
        var el = $("#" + element.id)
        // sets startpos of element taking into account current scroll position
        if (currScrollPos > (element.top + element.start)){
            // value is the amount past the start point of the animation the page has gone
            var value = (currScrollPos - (element.top + element.start)) * element.multiplyer
            if (element.startpos > element.endpos){
                // invert scroll (move up or left when scrolling down)
                console.log("value is executed here")
                if (-Math.abs(value) > element.endpos){
                    element.progress = -Math.abs(value)
                    el.css(element.direction, element.progress)
                } else {
                    el.css(element.direction, element.endpos)
                }
            } else {
                // normal scroll (move down or right when scrolling up)
                if (value < element.endpos){
                    element.progress = value
                    el.css(element.direction, element.progress)
                } else {
                    el.css(element.direction, element.endpos)
                }
            }
        }
        // corrects all the values based on clients window size
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
        scrolled = currScrollPos - lastPos
        lastPos = currScrollPos
        updateAll(currScrollPos, scrolled)
    }
},waitPeriodMs);
function updateAll(currScrollPos, scrolled){
    // animates elements that are supposed to be animated
    for (var element of currentPage){
        // checking position of element
        var coords = document.querySelector("#" + element.id).getBoundingClientRect()
        element.top = coords.top + currScrollPos
        element.bottom = coords.bottom + currScrollPos
        // these elements attributes determine whether the object should be animated
        if (debug){
            console.log(element.id)
            console.log("more or equal to " + element.top + element.start)
            console.log("less or equal to " + element.bottom + element.end)
            console.log("scrolpos " + currScrollPos)
            console.log(currScrollPos >= (element.top + element.start) && currScrollPos <= (element.bottom + element.end))
            if (element.progress > element.endpos){
                console.log("the element.progress was set to high for this to be animated the bug is handled but it shouldnt happen")
            }
        }
        if (currScrollPos >= (element.top + element.start) && currScrollPos <= (element.bottom + element.end)){
            // animate this
            console.log(scrolled)
            if (element.startpos > element.endpos){
                // invert scroll (move up or left when scrolling down)
                // this is a bug catcher from function activateCurrent()
                if (element.progress < element.endpos){
                    element.progress = element.endpos
                }
                element.progress = element.progress - (scrolled * element.multiplyer)
                if (element.progress >= element.endpos && element.progress <= element.startpos){
                    var el = $("#" + element.id)
                    el.css(element.direction, (element.progress - (scrolled * element.multiplyer)))
                    console.log("updated upwards")
                }
            } else {
                // normal scroll (move down or right when scrolling up)
                if (element.progress > element.endpos){
                    element.progress = element.endpos
                }
                element.progress = element.progress + (scrolled * element.multiplyer)
                if (element.progress <= element.endpos && element.progress >= element.startpos){
                    var el = $("#" + element.id)
                    el.css(element.direction, (element.progress + (scrolled * element.multiplyer)))
                    console.log("updated downwards")
                }
            }

        }
    } 
}