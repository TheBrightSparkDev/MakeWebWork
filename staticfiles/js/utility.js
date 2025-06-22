/* This is a JS file with logic that is used over many files and doesnt break functionality */
let debugutility = false

console.log("Utility connected")

// client colors
function MatchBorders(color) {
    const elements = document.querySelectorAll('.match-border');
    elements.forEach(el => {
      el.style.borderColor = color;
    });
}

function clientColor(){
    if (document.getElementById("clientColor")){
        const color = window.getComputedStyle(document.getElementById("clientColor")).color;
        console.log(color); // e.g., "rgb(0, 0, 0)"
        MatchBorders(color); 
    } else {
        if(debugutility){
            console.log("no client color detected")
        }
    }
}

for (element of $(".unhide")){
    element.addEventListener("click", (e) => showhide(e.target))
}

function showhide(target){
    if (debugutility){console.log("toggling: " + target.getAttribute("unhide"))}
    document.getElementById(target.getAttribute("unhide")).classList.toggle("hide");
}

function deleteempty(){
    for (element of $(".form-area")){
        if (element.children.length < 1){
            if (debugutility){
                console.log("deleting this element from the request because it is unanswered")
                console.log(element)
            }
            element.parentElement.remove()
        }
    }
}

window.addEventListener("load", function(event){
    if (debugutility){
        console.log("utility.js connected");
        let duplicates = checkforduplicateids();
        logduplicates(duplicates);
        deleteempty();
    }
    clientColor();
});

function checkforduplicateids(){
    /* creates and returns a list of every ID on the page */
    /* This code was copy and pasted from here: 
    https://stackoverflow.com/questions/7115022/how-do-i-enumerate-all-of-the-html-ids-in-a-document-with-javascript */
    var allElements = document.getElementsByTagName("*");
    var allIds = [];
    /* I edited this  */
    var duplicates = [];
    for (var i = 0, n = allElements.length; i < n; ++i) {
        var el = allElements[i];
        if (el.id){ 
            /* This makes sure element has an ID*/
            if (allIds.includes(el.id)){
                duplicates.push(el.id)
            } else {
                allIds.push(el.id);
            }
            /* end edit */
        }
    }
    /* end of copy pasted code */
    return duplicates
}

function logduplicates(duplicates){
    for(duplicate of duplicates){
        console.log("oops we have a duplicate ID click links below and fix the error please!")
        let stop = false
        try {
            console.log(document.querySelectorAll("#" + duplicate))
            console.log("found these duplicates of: " + duplicate)
        } catch (error) {
            console.log("This function doesnt like ids that are numbers so can only display the first one")
            console.log(document.getElementById(duplicate))
            console.log("found these duplicates of: " + duplicate)
        }
    }
}

function oneclickmanysubmits(element){
    search = element.getAttribute("optionname")
    let elements = document.getElementsByClassName(search)
    let ignorehiddeninputedit = false
    let broken = false
    let submit = true
    let valid = true
    for (el of elements){
        childnodes = el.children
        for (childnode of childnodes){
            let text = ""
            let errormessage = false
            if (childnode.tagName == "INPUT"){
                // visible input that is required
                if (childnode.hasAttribute('required')){
                    if (childnode.value.length < 1){
                        text = "This is a required field"
                        errormessage = true
                    }
                    // runs a regex on email types
                    if (childnode.getAttribute("type") == "email"){
                        if (!validemailaddress(childnode)){
                            text = "This is not a valid email address";
                            errormessage = true
                        }
                    }
                    // runs regex on tel types
                    if (childnode.getAttribute("type") == "tel"){
                        if (!validphonenumber(childnode)){
                            text = "This is not a valid phone number"
                            errormessage = true
                        }
                    }
                }
                // hidden inputs
                if (childnode.getAttribute("name") == "question" || childnode.getAttribute("name") == "contactoptionID"){
                    if (childnode.value.length < 1 ){
                        broken = true
                        errormessage = true
                    } else if (childnode.value != element.getAttribute("contactoption")){
                        if (childnode.getAttribute("name") == "contactoptionID"){
                            broken = true
                            errormessage = true
                        }
                    }
                }
            // solely for logging if debug is true of course
            } else if (childnode.tagName == "LABEL"){
                label = childnode.textContent
                if(debugutility){
                    console.log(label)
                }
            }
            invalid = appenderrormessage(errormessage, text, childnode)
            if (invalid){
                valid = false
            }
        // childloop end
        } 
        // the following block only cares for invalid data submit is true by design so only false if an error is found on any of the elements
        if (!broken){
            if (!valid){
                // if an input is invalid submitting is blocked
                submit = false
            }  
        } else {
            // if an edit to a hidden field is detected this block of code displays an alert and blocks the submit
            if (!ignorehiddeninputedit){alert("please dont edit any hidden form elements you will have to refresh the page to fix this issue")}
            ignorehiddeninputedit = true
            submit = false
        }
    // element loop end
    }
    // this block only runs if no errors were found above
    if (submit){
        let first = true
        let ajaxdatalist = []
        if (debugutility){console.log("successfully submitted")}
        // build data for AJAX request
        for (el of elements){
            childnodes = el.children
            ajaxdata = new Object 
            for (node of childnodes){
                if (node.tagName == "INPUT" || node.tagName == "TEXTAREA" || node.tagName == "SELECT" ){
                    ajaxdata[node.name] = node.value 
                }
            }
            el.classList.add("hide")
            ajaxdatalist.push(ajaxdata)
            url = el.getAttribute("action")
        }
        $.ajax({
            type: "POST",
            url: url,
            data: ajaxdatalist[0],
        });
        
        setTimeout(() => {
            for (ajaxdata of ajaxdatalist){
                if (first){
                    first = false
                } else {
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: ajaxdata,
                    });
                }
            }
        },500);

        element.textContent = "Thank you"
        element.setAttribute("onclick","")
        element.addEventListener('click', function () {
            this.parentElement.parentElement.classList.toggle("hide")
            }
        )
    } 
}

/* the following regex forms were created using https://regexr.com/ brilliant tool community patterns is where these came from */
function validphonenumber(element){
    var phonenoregex = new RegExp(/\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*/g);
    if(phonenoregex.test(element.value)) {
        if(debugutility){ console.log("valid number")}
      return true;
    }  
    else {  
      return false;
    }
}

function validemailaddress(element){
    var emailREGEX = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    if(emailREGEX.test(element.value)) {
        if(debugutility){console.log("valid email")}
      return true;
    }  
    else {  
      return false;
    }
}

function appenderrormessage(applybool, messagetoadd, element){
    // removes last error message if there was one
    if (element.nextElementSibling != null){
        siblingelement = element.nextElementSibling;
        if (siblingelement.classList.contains("errormessage")){
            siblingelement.remove();
        }
    }
    // checks if a new error message should be added
    if (applybool){
        // if true a new error message is added
        let pelement = document.createElement("p");
        pelement.setAttribute("class","errormessage")
        let text = document.createTextNode(messagetoadd);
        pelement.appendChild(text);
        element.insertAdjacentElement('afterend', pelement);
        element.style.border = "thick solid #FF0000";
        return true
    } else if (element.style.border = "thick solid #FF0000") {
        // gets rid of border if false
        element.style.border = "";
        return false
    }
}