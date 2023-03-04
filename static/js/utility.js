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
