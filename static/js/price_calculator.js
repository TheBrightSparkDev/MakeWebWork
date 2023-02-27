/* Optional extras
Adding an if to the animation time to check if there is some element with an animationLength and using that instead
*/

/* Set this to true if you want to see debug  */
let debugJourneys = True
/* This is the length of the animations in ms */
let animationLength = 500
/* This ensures all dom elements are loaded before running the initialiser */
window.addEventListener("load", function(event){
    InitialiseJourneys()
  });

function InitialiseJourneys(){
    /* This is the main driver of this Javascript file 
    gets all the relevant data needed and does some 
    checking to ensure it is valid data */
    let allIds = GetAllIds()
    let Journeys = DetectJourneys(allIds)
    let Continue = AutomaticTests(Journeys)
    if (Continue){
        ActivateJourneys(Journeys)
    }
}

function GetAllIds(){
    /* creates and returns a list of every ID on the page */
    /* This code was copy and pasted from here: 
    https://stackoverflow.com/questions/7115022/how-do-i-enumerate-all-of-the-html-ids-in-a-document-with-javascript */
    var allElements = document.getElementsByTagName("*");
    var allIds = [];
    for (var i = 0, n = allElements.length; i < n; ++i) {
        var el = allElements[i];
        if (el.id) { allIds.push(el.id); }
    }
    /* end of copy pasted code */
    return allIds
}

function DetectJourneys(){
    /* This recieves a list of all the IDS and makes links between the different IDs
    on the page once it has made at least one link it will add the base ID to the list */

}

function AutomaticTests(Journeys){
    /* This is all about understanding the data retrieved and making sure all related have a 
    target also outputs errors in an easy to understand way letting the user know where their
    dead ends are */
}

function ActivateJourneys(Journeys){
    /* This adds the event listeners to all the ids hidden or visible at the beginning of the file */
}

/* anything after this point is not called initially so its either called by an event listener
or by other means */

function Navigation(related, invert){
    /* This will be the process of firstly hiding the current one and then 
    displaying the correct one using the call from the Click event handler */
    HideCurrent(invert)
    ShowNew(related, invert)
}

function HideCurrent(invert){
/* animate the current displayed journey out direction depends on invert*/
}

function ShowNew(journey, invert){
/* animate the selected displayed journey in direction depends on invert*/
}