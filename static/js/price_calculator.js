/* Optional extras
Adding an if to the animation time to check if there is some element with an animationLength and using that instead
*/

/* Set this to true if you want to see debug  */
let debugJourneys = true;
/* This is the length of the animations in ms */
let animationLength = 500;
/* This variable will eventually hold all the journey data */
let Journeys = []
/* This ensures all dom elements are loaded before running the initialiser */
window.addEventListener("load", function(event){
    InitialiseJourneys()
  });

function InitialiseJourneys(){
    /* This is the main driver of this Javascript file 
    gets all the relevant data needed and does some 
    checking to ensure it is valid data */
    let allIds = GetAllIds()
    for (id of allIds){
        /* This gets the options for that journey */
        Journeys.push(DetectJourneys(id))
    }
    if (debugJourneys){
        console.log(Journeys)
    }
    AutomaticTests(Journeys)
    console.log(Journeys)
    ActivateJourneys(Journeys)
}

function GetAllIds(){
    /* creates and returns a list of every ID on the page */
    /* This code was copy and pasted from here: 
    https://stackoverflow.com/questions/7115022/how-do-i-enumerate-all-of-the-html-ids-in-a-document-with-javascript */
    var allElements = document.getElementsByTagName("*");
    var allIds = [];
    for (var i = 0, n = allElements.length; i < n; ++i) {
        var el = allElements[i];
        /* I edited this */
        if (el.id){ 
            /* This makes sure element has an ID*/
            if (el.id.includes("Journey")){
                /* This makes sure the ID is a journey ID */
                allIds.push(el.id);
            }
        }
        /* end edit */
    }
    /* end of copy pasted code */
    return allIds
}

function DetectJourneys(id){
    /* This recieves the ID and makes a note of the ID and links it to the children elements */
    let journeyOptions = new Object()
    let parentElement = document.getElementById(id);
    if (parentElement.getElementsByClassName("JSJourneyOptions").length > 0){
        let optionParent = parentElement.getElementsByClassName("JSJourneyOptions")[0]
        let options = optionParent.children
        let optionIds = []
        for (option of options){
            if (option.getAttribute("related")){
                related = option.getAttribute("related")
                optionIds.push(getTarget(id, related))
            }
        }
        journeyOptions.parent = id
        journeyOptions.optionElements = options
        journeyOptions.options = optionIds
    }
    return journeyOptions
}

function getTarget(id, related){
    /* This function gets the optionpath and the current ID and returns the id of the target
    based on a few rules */
    if (related.includes("-")){
        return id.replace(related , "")
    } else {
        return id + "-" + related
    }
}

function AutomaticTests(Journeys){
    /* This is all about understanding the data retrieved and making sure all related have a 
    target also outputs errors in an easy to understand way letting the user know where their
    dead ends are */
    for (Journey of Journeys){
        Journey.validOptions = []
        for (option of Journey.options){
            if (document.getElementById(option) == null){
                if (debugJourneys){
                    console.log(Journey.parent + " refers to an id: " + option + " which couldn't be found")
                }
            } else {
                Journey.validOptions.push(option)
            }
        }
    }
}

function ActivateJourneys(Journeys){
    /* This adds the event listeners to all the journey options */
    for (Journey of Journeys){
        for (element of Journey.optionElements){
            if (element.getAttribute("related")){
                related = element.getAttribute("related")
                id = getTarget(Journey.parent, related)
                if (Journey.parent.length < id.length){
                    console.log("adding: " + id + " " + true + " properties to this element: " + element)
                    element.addEventListener('click', function() {Navigation(id, true)})
                } else {
                    console.log("adding: " + id + " " + false + " properties to this element: " + element)
                    element.addEventListener('click', function() {Navigation(id, false)})
                }
            }
        }
    }
}

/* anything after this point is not called initially so its either called by an event listener
or by other means */

function Navigation(id, invert){
    /* This will be the process of firstly hiding the current one and then 
    displaying the correct one using the call from the Click event handler */
    console.log("id: " + id)
    console.log("invert: " + invert)
    HideCurrent(invert)
    ShowNew(id, invert)
}

function HideCurrent(invert){
/* animate the current displayed journey out direction depends on invert*/
}

function ShowNew(journey, invert){
/* animate the selected displayed journey in direction depends on invert*/
}