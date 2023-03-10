/* This is a JS file with logic that is used over many files and doesnt break functionality */
let debugutiliy = true

for (element of $(".unhide")){
    element.addEventListener("click", (e) => showhide(e.target))
}

function showhide(target){
    if (debugutiliy){console.log("toggling: " + target.getAttribute("unhide"))}
    document.getElementById(target.getAttribute("unhide")).classList.toggle("hide")
}

window.addEventListener("load", function(event){
    if (debugutiliy = true){
        console.log("utility.js connected")
        let duplicates = checkforduplicateids()
        logduplicates(duplicates)
    }
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
    console.log(element)
    search = element.getAttribute("optionname")
    elements = document.getElementsByClassName(search)
    let valid = true
    let ignorehiddeninputedit = false
    let ignoreemptyfield = false
    let broken = false
    let empty = false
    let emailaddress = false
    let phonenumber = false
    let submit = true
    for (el of elements){
        /* check if valid */
        childnodes = el.children
        for (childnode of childnodes){
            let pelement = document.createElement("p");
            pelement.setAttribute("class","errormessage")
            if (childnode.tagName == "INPUT"){
                if (childnode.hasAttribute('required')){
                    if (childnode.value.length < 1){
                        empty = true
                    } else {
                        
                    }
                }
                if (childnode.getAttribute("name") == "question"){
                    if (childnode.value.length < 1){
                        broken = true
                    } 
                }
                if (childnode.getAttribute("name") == "contactoptionID"){
                    if (childnode.value != element.getAttribute("contactoption")){
                        if (childnode.value.length < 1){
                            broken = true
                        } 
                    }
                }
                if (empty){
                    // gets rid of last errormessage ready for new one
                    if (childnode.nextElementSibling != null){
                        childnode.nextElementSibling.remove()
                    }
                    let text = document.createTextNode("This is a required field ");
                    pelement.appendChild(text);
                    childnode.insertAdjacentElement('afterend', pelement)
                    childnode.style.border = "thick solid #FF0000"
                    valid = false
                    empty = false
                } 

                if (childnode.getAttribute("type") == "email"){

                    emailaddress = validemailaddress(childnode)

                    if (!emailaddress){
                        // gets rid of last errormessage ready for new one
                        if (childnode.nextElementSibling != null){
                            childnode.nextElementSibling.remove()
                        }
                        let text = document.createTextNode("This is not a valid email address ");
                        pelement.appendChild(text);
                        childnode.insertAdjacentElement('afterend', pelement)
                        childnode.style.border = "thick solid #FF0000"
                        valid = false
                        empty = false
                    } else {
                        if (childnode.nextElementSibling != null){
                            childnode.nextElementSibling.remove()
                        }
                    }

                }
                if (childnode.getAttribute("type") == "tel"){
                    
                    phonenumber = validphonenumber(childnode)

                    if (!phonenumber){
                        // gets rid of last errormessage ready for new one
                        if (childnode.nextElementSibling != null){
                            childnode.nextElementSibling.remove()
                        }
                        let text = document.createTextNode("This is not a valid phone number ");
                        pelement.appendChild(text);
                        childnode.insertAdjacentElement('afterend', pelement)
                        childnode.style.border = "thick solid #FF0000"
                        valid = false
                        empty = false
                    } else {
                        if (childnode.nextElementSibling != null){
                            childnode.nextElementSibling.remove()
                        }
                    }
                    
    
                }

            } else if (childnode.tagName == "LABEL"){
                label = childnode.textContent
                console.log(label)
            }
        }

        if (!broken){
            if (valid){
                if (!phonenumber && !emailaddress){
                    console.log("successfully inputted all correctly")
                    if (childnode.nextElementSibling != null){
                        childnode.nextElementSibling.remove()
                    }
                } else {
                    submit = false
                }
            } else {
                if (!ignoreemptyfield){
                    alert("please answer all required questions")
                    ignoreemptyfield = true
                    submit = false
                }
            }  
        } else {
            if (!ignorehiddeninputedit){
                alert("please dont edit any hidden form elements you will have to refresh the page to fix this issue")
                submit = false
            }
            ignorehiddeninputedit = true
            submit = false
        }
    }   
    if (submit){
        console.log("successfully submitted")
        for (el of elements){
            //el.submit()
        }
    }

}
/* the following regex forms were created using https://regexr.com/ brilliant tool community patterns is where these came from */
function validphonenumber(element){
    console.log(element.value)
    var phonenoregex = new RegExp(/\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*/g);
    if(phonenoregex.test(element.value)) {
        console.log("valid number")
      return true;
    }  
    else {  
      return false;
    }
}

function validemailaddress(element){
    console.log(element.value)
    var emailREGEX = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    if(emailREGEX.test(element.value)) {
        console.log("valid email")
      return true;
    }  
    else {  
      return false;
    }
}

