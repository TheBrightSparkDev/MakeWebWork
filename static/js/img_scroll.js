console.log("connected");
document.addEventListener("scroll",(e) =>{
        console.log(window.pageYOffset)
        /* this if statement will tell the system to resize bigger or smaller depending on if you scrolled up or down */
        if (lastoffset){
            if (lastoffset > window.pageYOffset)
        }
        var offset = window.pageYOffset
        var currSize = document.getElementById("hero-resize").style.height
        document.getElementById("hero-resize").style.height=(currSize - offset)
        var lastoffset = offset
    })