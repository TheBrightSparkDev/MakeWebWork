console.log("connected");
/* These are settings for the img scroll resizer this can all be set before the page loads fully */
var scrollMultiplyer = 1.5 // this is how quickly the image shrinks when user scrolls
var waitPeriodMs = 40 // this is how long the scroll event has to wait between fires higher the number the better the performance
var element = $("#hero-resize") // this is the image
var elementHolder = $("#hero-holder")
/* this forces the script to wait for the page to load */
window.addEventListener("load", function(event){
    initialSizer()
  });
function initialSizer(){
    /* these are the necessary  variables */
    var windowHeight = window.innerHeight // useful to set and know the origional height of the image
    var windowWidth = window.innerWidth // useful to get the distance left needs to be adjusted by
    var element = $("#hero-resize") // this is the image
    var offset = window.pageYOffset // this gets the current scroll position this is for refreshes
    /* this section sets the height, left of the object initially and takes into account current scroll postion */
    var heightForElements = windowHeight - (offset * scrollMultiplyer) // this is one of two places the scrollMultiplyer setting is used
    element.css("height",heightForElements) 
    elementHolder.css("height",heightForElements)
    var intElementWidth = element.width() // this gets the width as an int
    var newleft = (((intElementWidth / 2) - intElementWidth) + (windowWidth / 2)) // declares newleft
    element.css("left", newleft) // sets the css left property as newleft
}
/* the following code was copy and pasted from this site: https://www.javascripttutorial.net/javascript-dom/javascript-scroll-events/ */
let scrolling = false;
document.addEventListener("scroll" ,(e) => {
    scrolling = true;
});
setInterval(() => {
    if (scrolling) {
        scrolling = false;
        // this if statement was not copy and pasted
        if (window.pageYOffset < 500){
            var windowHeight = window.innerHeight // useful to set and know the origional height of the image
            var offset = window.pageYOffset // this gets the current scroll position 
            var windowWidth = window.innerWidth // useful to get the distance left needs to be adjusted by
            var heightForElements = windowHeight - (offset * scrollMultiplyer) // this is one of two places the scrollMultiplyer setting is used
            element.css("height",heightForElements)
            elementHolder.css("height",heightForElements)
            var intElementWidth = element.width() // this gets the width as an int
            var newleft = (((intElementWidth / 2) - intElementWidth) + (windowWidth / 2)) // declares newleft
            element.css("left", newleft) // sets the css left property as newleft
        }
    }
},waitPeriodMs);