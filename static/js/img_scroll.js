/* rules for adding new elements to be caught by this
- These all refer to the html element
- you must add the class custom-scroll
- you must add an id of your choosing
- you must define the start,end,startpos,endpos,direction in an attribute named animationprops in this order
*/
var debugimgscroll = false; // set this to false in production
if (debugimgscroll){
    console.log("connected img scroll");
}
var SelectionJS = false;
/* these are predefined variables you can use when defining animation properties */
var screenHeight = window.innerHeight;
var screenWidth = window.innerWidth;
/* Settings for scroll */
var waitPeriodMs = 30; // this is how long the scroll event has to wait between fires higher the number the better the performance the more jagged the animations become
const propslist = ["start","end","startpos","endpos"]; // this is essential for the createObjects function. It's a list of property names in the order they should be declared
/* This is a list of elements that need to be animated */
var elementList = $(".custom-scroll");
/* this list will hold the objects that contain the properties for animation */
var currentPage = [];
/* this is where variables that need to persist are initialised */
var currScrollPos = window.scrollY;
var lastPos = 0;
var scrolled = 0;
var DontReload = false;

/* this forces the script to wait for the page to load */
window.addEventListener("load", function(event){
    InitialiseImgScroll();
    DontReload = CheckForSelectionJSOrJourneyJS();
});

function CheckForSelectionJSOrJourneyJS(){
    /**
     * This function disables the reload on page resize if it detects selection.js or Journey.js as 
     * this would ruin the experience for a user if they resize the browser after pressing 
     * submit. It also means that animations will not set back to the position they should be
     * perfectly on these pages but it's a small price to pay. Eventually this will be redundant
     * when I correctly implement a way of recalculating the position of animated elements without
     * refreshing but that sounds like a future me problem...
     */
    if (document.getElementsByTagName("head")[0].getAttribute("id") == "SelectionJS" || document.getElementsByTagName("head")[0].getAttribute("id") == "journeyJS" ){
        if (debugimgscroll){console.log("Detected: " + document.getElementsByTagName("head")[0].getAttribute("id"));}
        return true;
    } else {
        if (debugimgscroll){console.log("No SelectionJS or JourneyJS Detected");}
        return false;
    }
}

function InitialiseImgScroll(){
    /**
     * This function calls all the essential functions to do with initialising elements.
     * This function can also call the test cases if the debugimgscroll variable is set to true.
     * The other option was jest for java testing but this was a much cleaner approach and very simple to implement
     * It also sped up development massively as it very clearly states any issues related to the HTML elements
     */
    // these are here to handle window resizing
    screenHeight = window.innerHeight;
    screenWidth = window.innerWidth;
    if (debugimgscroll){
    testHTMLElements();
    }
    createObjects();
    if (debugimgscroll){
        checkObjects();
        }
    activateCurrent();
}
// automatic tests (only work when debugimgscroll set to true)
function testHTMLElements(){
    for (var element of elementList){
        // Check ID matches a knownElements item
        var id = element.id;
        if (id == ""){
            console.log("The element you are trying to animate doesn't have an ID.");
        }
        var checkProps = document.getElementById(id).getAttribute("animationprops");
        if (checkProps == ""){
            console.log("The element you are trying to animate doesn't have an animationprops attribute.");
            console.log("animationprops needs to be in this format start,end,direction,startpos,endpos");
            console.log("add help to any of the above to log out an explaination");
        }
    }
}
function checkObjects(){
    /**
     * This function is only called when debugimgscroll is true 
     * It looks at the values determined by the user and lets the user know if there are any mistakes
     */
    // currentPage is a list of objects
    for (var el of currentPage){
        // this for loop looks for the word help in any of the values
        for (var prop in el){
            if (`${el[prop]}` == "help"){
                console.log("You're seeing this because you set the property: " + prop + " to 'help' on the element with id: " + el.id);
                console.log("First a little sanity check");
                console.log("There should be 4 commas no spaces all required even if 0");
                console.log("The objects properties you need to set are in the following order you only need to put a list of values");
                console.log("start: number, I would advise keeping this as 0 as it will only be animated when on screen that way");
                console.log("end: number or screenheight, setting the value to screenheight will result in the being animated for the entire time it is on screen only");
                console.log("startpos: number or screenwidth, this is the default position you want it to start in setting it to screenWidth will move the item offscreen");
                console.log("endpos: number or screenwidth or screenheight, This tells the file where the item should finish setting it to screenwidth will amke it animate off the screen");
                console.log("direction: up,down,left,right, what way do you want it to be animated essentially");
                console.log("System will now resume normal checks");
            }
        }
        // this checks if start is a number
        if (typeof el.start !== "number"){
            console.log("error in element with ID: " + el.id);
            console.log("Take note below of acceptable values");
            console.log("start: number, I would advise keeping this as 0 as it will only be animated when on screen that way");
        }
        // this checks if end is a number
        if (typeof el.end !== "number"){
            console.log("error in element with ID: " + el.id);
            console.log("Take note below of acceptable values");
            console.log("end: number or screenheight, setting the value to screenheight will result in the being animated for the entire time it is on screen only");
        }
        // this checks if startpos is a number
        if (typeof el.startpos !== "number"){
            console.log("error in element with ID: " + el.id);
            console.log("Take note below of acceptable values");
            console.log("startpos: number or screenwidth, this is the default position you want it to start in setting it to screenWidth will move the item offscreen");
        }
        // this checks if endpos is a number
        if (typeof el.endpos !== "number"){
            console.log("error in element with ID: " + el.id);
            console.log("Take note below of acceptable values");
            console.log("endpos: positive number or screenwidth or screenheight, This tells the file where the item should finish setting it to screenwidth will make it animate off the screen");
        }
        // this checks if direction is a valid value
        if (!(el.direction == "top" || el.direction == "bottom" || el.direction == "left" || el.direction == "right")){
            console.log("error in element with ID: " + el.id);
            console.log("Take note below of acceptable values be careful of spelling, capslock or spaces");
            console.log("direction: up,down,left,right, what direction do you want it to be animated essentially");
        }
        // this checks if start and end values are the same as it will result in no movement
        if (el.start == el.end){
            console.log("setting the start and end to the same value will result in the item never animating these are the first two values START,END,startpos,endpos,direction");
        }
        // this checks if startpos and endpos values are the same as it will also result in no movement
        if (el.startpos == el.endpos){
            console.log("setting the startpos and endpos to the same value will result in the item never animating these are the values 3 and 4 start,end,STARTPOS,ENDPOS,direction");
        }
    }
}
// end of automatic tests 

function createObjects(){
    /**
     * This function gets the ID and the animationprops values and sets it to an object called el
     * This object will have multiple instances and will be used when calculating any animations
     * The function also will correct any values where possible such as up to top or screenHeight 
     * to the value of the screenheight variable
     */
    // this will generate an object that will at the end of this function contain the properties
    for (var element of elementList){
        var el = new Object();
        el.id = element.id;
        // This retrieves the animationprops attribute
        var props = document.getElementById(el.id).getAttribute("animationprops");
        el.width = document.getElementById(el.id).offsetWidth / 2;
        // this iterates through a list of property names in the same order they should be declared
        for (var prop of propslist){
            var slice = props.indexOf(",");
            // this is if the variable is set to a negative number
            var invert = false;
            el[prop] = props.slice(0,slice);
            // this corrects the value if the developer has chosen a variable
            if(el[prop].toLowerCase().includes("-")){
                invert = true;
            }
            if (el[prop].toLowerCase().includes("screenheight")){
                var value = screenHeight;
                // this handles if the user has used a calculation of screenheight
                if (el[prop].includes("/") || el[prop].includes("*")){
                    var sliceTwo = el[prop].indexOf("t");
                    var calc = el[prop].substring(sliceTwo + 1);
                    value = screenHeight + calc;
                    value = eval(value);
                } 
                if (invert){
                    el[prop] = -Math.abs(value);
                } else {
                    el[prop] = value;
                }
            } else if( el[prop].toLowerCase().includes("screenwidth")){
                var value = screenWidth;
                // this handles if the user has used a calculation of screenwidth
                if (el[prop].includes("/") || el[prop].includes("*")){
                    var sliceTwo = el[prop].indexOf("h");
                    var calc = el[prop].substring(sliceTwo + 1);
                    value = screenWidth + calc;
                    value = eval(value);
                }
                if (invert){
                    el[prop] = -Math.abs(value);
                } else {
                    el[prop] = value;
                }
            }
            el[prop] = Number(el[prop]);
            // this removes the value and its comma so next time it gets the next value
            props = props.substring((slice + 1));
        }
        el.direction = props;
        // this corrects the value so that animating it becomes easier
        if (el.direction === "left"){
            el.endpos = el.endpos - el.width;
        }
        if (el.direction === "right"){
            el.endpos = el.endpos - el.width;
        }
        if (el.direction === "up"){
            el.direction = "top";
        }
        if (el.direction === "down"){
            el.direction = "top";
        }
        currentPage.push(el);
    }
    if (debugimgscroll){
        for (var element of currentPage){
            console.log(element);
        }
    }    
}
function activateCurrent(){
    /**
     * This function sets the values that determine when and when not to 
     * animate the elements 
    */
    for (var element of currentPage){
        // get element 
        var el = $("#" + element.id);
        // get position of the element in relation to the top of the page
        // this if statement catches the instances where the user has scrolled and then resized page
        if(resizing){
            for (var tempEl of tempList){
                if (tempEl.id == element.id){
                    // sets when the element should start animating
                    element.begin = tempEl.begin;
                }
            }
        } else {
            var posFromTop = el.offset().top;
            // sets when the element should start animating
            element.begin = posFromTop - screenHeight + element.start;
        }
        // calculate the amount the image needs to move per scroll movement based on how far it needs to travel
        // Math.abs guaratees a positive number        
        var distanceTravelled = Math.abs(element.startpos - element.endpos);
        var lengthOfAnimation = Math.abs(element.end - element.start);
        if(debugimgscroll){
            console.log(distanceTravelled);
            console.log(lengthOfAnimation);
        }
        element.finish = element.begin + lengthOfAnimation;
        // Now we have the two numbers we need to calculate an amount to multiply the scroll wheel by 
        element.multiplyer = distanceTravelled / lengthOfAnimation;
        if (debugimgscroll){
            console.log("this is just after the element has been activated");
            console.log(element);
        }
        if (element.direction === "top" || element.direction === "bottom"){
            element.direction = "margin-" + element.direction;
        } else {
            // this makes the container stay the same size
            var parent = document.getElementById(element.id).parentElement;
            var height = document.getElementById(element.id).clientHeight + "px";
            parent.classList.add("animation");
            parent.setAttribute("style", `height:${height};`);
            el.css("position","absolute");
        }
        // sets the style that will be used to animate
        el.css(element.direction, "0");
    }
    updateAll(currScrollPos);
}
/* 
This is where the variables are constantly updated 
by the scroll event this one even will update every element
on the page when it's their turn of course!
the following code was copy and pasted from this site: 
https://www.javascripttutorial.net/javascript-dom/javascript-scroll-events/ 
*/
// this detects the scroll event and recalculates the animation properties
let scrolling = false;
window.addEventListener("scroll" ,(e) => {
    scrolling = true;
});
setInterval(() => {
    if (scrolling) {
        scrolling = false;
        currScrollPos = window.scrollY;
        updateAll(currScrollPos);
    }
},waitPeriodMs);
function updateAll(currScrollPos){
    /**
     * 
     */
    var offset = 0;
    // this variable is used to offset everything after a vertical animation is played
    for (var element of currentPage){
        // used to set the offset variable at the end of animation calculation
        var val;
        var scrollPosition = currScrollPos - offset;
        // if the element affects the margin top all elements after will have their begin and finish offset 
        var el = $("#" + element.id);
        if (debugimgscroll){
            console.log(element.id);
            console.log("offset = " + offset);
            console.log("scrollPosition: " + scrollPosition);
            console.log("begin: " + element.begin);
            console.log("finish: " + element.finish);
            console.log(element.id);
        }
        if (scrollPosition < (element.begin)){ // if current scroll pos is less that begin
            el.css(element.direction, element.startpos); // sets pos to start position
            val = element.startpos;
            if (debugimgscroll){
                console.log("less than begin");
            }
        } else if (scrollPosition > element.finish){ // if current scroll pos is more than finish
            el.css(element.direction, element.endpos); // sets the pos to end position 
            val = element.endpos;
            if (debugimgscroll){
                console.log("more than finish");
            }
        } else { // else covers when its between the values
            var dist = ((scrollPosition - element.begin) * element.multiplyer);
            if (debugimgscroll){
                console.log("between finish and start");
                console.log("distance: " + dist);
            }
            // this is to avoid a jump as the mulitplyer calculation isn't perfect
            if (element.endpos < (element.startpos - dist)){
                el.css(element.direction, (element.startpos - dist));
                val = (element.startpos - dist);
            } else {
                el.css(element.direction, element.endpos);
                val = element.endpos;
            }
            if (element.direction == "margin-top"){
                offset = val;
            } else if (element.direction == "margin-bottom"){
                offset = val;
            }        
        }
        if (element.direction == "margin-top"){
            offset = val;
        } else if (element.direction == "margin-bottom"){
            offset = val;
        }
    } 
}
// this detects screen resizing and recalculates the animation properties
let resizing = false;
window.addEventListener("resize", function(event){
    resizing = true;
  });
setInterval(() => {
    if (resizing) {
    // this section of code is here to save the origional begin so that resizing doesn't ruin animations
    var wait = true;
    setInterval(() => {
        if (wait){
            wait = false;
        }
    },250);
    if (!DontReload){
        location.reload();
    }
    resizing = false;
    }
},1000);