console.log("connected");
/* rules for adding new elements to be caught by this
- you must add the class custom-scroll
- you must add the type of scroll
*/
// set this to false in production
var debug = true

/* Settings for scroll */
var scrollMultiplyer = 1 // higher = faster smaller = slower 
var waitPeriodMs = 50 // this is how long the scroll event has to wait between fires higher the number the better the performance

/* settings per object */
// hero cover 
const heroCover = {
    id: "hero-cover",
    // this is how long BEFORE it enters the screen do you want to start animating
    start: 0,
    // this is how long AFTER it leaves the screen do you want to end animations
    end: 0,
    direction: "up",
    // depending on your choice this will either be values to add to the left, right, top, bottom tag
    // to start off screen add offScreen as the value
    // to end on screen in the centre add onScreen as the value
    startpos:"",
    endpos:"",
    multiplyer:1
}
// make sure you add your element to this list.
const knownElements = [heroCover]

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
}

function testElements(){
    for (var element of elementList){
        var id = element.id
        if (id == ""){
            console.log("The element you are trying to animate doesn't have an ID.")
        } else {
            var check = 0
            for (item of knownElements){
                if (item.id == id){
                    check++
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

}