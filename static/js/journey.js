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
    ResizePushContentUnder()
  });

function InitialiseJourneys(){
    /* This is the main driver of this Javascript file 
    gets all the relevant data needed and does some 
    checking to ensure it is valid data */
    announceJourneyPresence()
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

function ResizePushContentUnder(){
    Elements = document.getElementsByClassName("push-content-under")
    for (element of Elements){
        console.log(element.children[0].clientHeight)
        element.style.height = element.children[0].clientHeight + "px"
    }
}

function announceJourneyPresence(){
    document.getElementsByTagName("head")[0].setAttribute("id","journeyJS") 
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
                optionIds.push(related)
            }
        }
        journeyOptions.parent = id
        journeyOptions.optionElements = options
        journeyOptions.options = optionIds
    }
    return journeyOptions
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
                id = related
                element.addEventListener('click', (e) => {Navigation(e.target)})
            }
        }
    }
}

/* anything after this point is not called initially so its either called by an event listener
or by other means */

function Navigation(target){
    /* This will be the process of firstly hiding the current one and then 
    displaying the correct one using the call from the Click event handler */
    let id = target.getAttribute("related")
    let IdToHide = GetParent(target)
    if (id < IdToHide){
        /* invert the animation as the ID its calling is a previous step */
        console.log("inverted = true ")
        ShowNew(0, id, true)
        let Height = document.getElementById(id).clientHeight + "px"
        HideCurrent(Height, IdToHide, true)
    } else{
        let Height = document.getElementById(IdToHide).clientHeight + "px"
        console.log("inverted = false ")
        HideCurrent(Height, IdToHide, false)
        ShowNew(Height, id, false)
    }
    /* works kinda not happy with the results would be much nicer if the Resize was called and was able to detect the height on the showNew... */
    setTimeout(() => {
        ResizePushContentUnder()
    },animationLength + 30);
}

function GetParent(target){
    /* gets the parent ID to check pass to the hide function */
    for (journey of Journeys){
        for (element of journey.optionElements)
        if (element == target){
            return journey.parent
        }
    }
}

function HideCurrent(Height, id, invert){
/* animate the current displayed journey out direction depends on invert*/
    screenWidth = window.innerWidth + 100
    if (invert){
        $("#" + id).css({"bottom":Height})
        $("#" + id).animate({left:screenWidth},animationLength, () => {
            document.getElementById(id).classList.toggle("hide");
            $("#" + id).css({"bottom":0});
            $("#" + id).css({"left":0});
        });
    } else {
        $("#" + id).animate({left:-screenWidth},animationLength, () => {
            document.getElementById(id).classList.toggle("hide"); 
            document.getElementById(id).style.removeProperty("top");
            $("#" + id).css({"left":0});
        });
    }
}

function ShowNew(Height, id, invert){
/* animate the selected displayed journey in direction depends on invert*/
    screenWidth = window.innerWidth + 100
    if (invert){
        $("#" + id).css({"left":-screenWidth})
        document.getElementById(id).classList.toggle("hide")
        $("#" + id).animate({left:0},animationLength, () => {
            document.getElementById(id).style.removeProperty("bottom");
            $("#" + id).css({"left":0});
        });
    } else {
        $("#" + id).css({"bottom":Height})
        $("#" + id).css({"left":screenWidth})
        document.getElementById(id).classList.toggle("hide")
        $("#" + id).animate({left:0},animationLength, () => {
            document.getElementById(id).style.removeProperty("bottom");
            $("#" + id).css({"left":0});
        });
    }
}