/**
 * To do list:
 * This file should be able to take this:
 * valuescale, {int,int}, {1, 5}, {50, 15}, {100,20}, {10000,1000}
 * take the value of the input and place it into the target using the set of ratios above
 * Additional requirements:
 * needs to ignore any text entered into the box
 * needs to append a string to the end of the result based on the first set of curlies
 * 
 * This file needs to be able to get the value of the target and add the value of the input to it
 * Additional requirements:
 * Needs to make a link between where the values came from that populated the target to avoid the same 
 * input adding more than once
 * 
 * This file needs to be able to take this:
 * 
 */

let debugcalculator = true

calculatorinitialiser()
function calculatorinitialiser(){
    if(debugcalculator){
        console.log("calculator.js connected")
        checkforinputs()
    }
    document.addEventListener("input" , (e) => calculate(e.target))
}

function checkforinputs(){
    let inputs = document.getElementsByTagName("input")
    for (input of inputs){

    }
}

function calculate(inputelement){
    let valuetoinput = parsecalc(inputelement.getAttribute("calc"),inputelement.value)
    inputintotarget(valuetoinput)
}

function parsecalc(calc, value){
    if (calc.toLowerCase().includes("smartvaluescale")){

        if(debugcalculator){console.log("detected smartvaluescale")}

        return smartvaluescale(calc, parseInt(value), "smartvaluescale")

    } else if (calc.toLowerCase().includes("valuescale")){

        if(debugcalculator){console.log("detected valuescale")}

        return valuescale(calc, parseInt(value), "valuescale")

    } else if (calc.toLowerCase().includes("add")){

        if(debugcalculator){console.log("detected add")}

        return add(calc, parseInt(value), "add")

    } else {
        /* this means calc is invalid so just pass on the value and send debug message to console */
        console.log("calc didn't contain a recognised function check if this is correct: " + calc)
        console.log("Implemented functions are add and valuescale")
        return value
    }
}

function inputintotarget(value){
    console.log(value)
}

function createvalidlist(brokenlist, ignore){
    /* theres likely a better way to do this */
    let correctedlist = []
    let save = ""
    for (item of brokenlist){
        if (item.includes("{")){
            save = item.trim()
            save = save.replace("{","")
        } else if (item.includes("}")){
            item = item.replace("}","")
            correctedlist.push(save + "," + item.trim())
            save = ""
        } else if(!item.toLowerCase().includes(ignore)){
            correctedlist.push(item.trim())
        }
    }
    return correctedlist
}

function getvaluetoinputformat(list, valuetoinput){
    if (list[0].split(",")[1].toLowerCase() == "int"){
        return valuetoinput
    } else if (list[0].split(",")[1].toLowerCase() == "percent"){
        return valuetoinput + "%"
    } else if (list[0].split(",")[1].toLowerCase() == "pound"){
        return "£" + valuetoinput
    } else if (valuetoinput == NaN){
        return 0
    }
}

/* below are all the calculation functions */

function valuescale(calc, value, ignore){
/* example data "valuescale, {int,int}, {5,0}, {100,250}, {1000,1500}, {10000,10000}" */
    let listtoparse = createvalidlist(calc.split(","), ignore)
    if(debugcalculator){
        console.log(calc)
        console.log(calc.split(","))
        console.log(listtoparse)
    }
    /*  example data ['{int,int}', '{5,0}', '{100,250}', '{1000,1500}', '{10000,10000}'] */
    for (item of listtoparse){
        if (item.split(",")[0].toLowerCase() != "int"){
            base = parseInt(item.split(",")[0])
            ratio = parseInt(item.split(",")[1])
            if (base >= value){ 
                valuetoinput = (value / base * ratio)
                return getvaluetoinputformat(listtoparse, valuetoinput) 
            } 
        }
    }
    /* this will treat anything higher than the last defined base and scale it as if it were the last ratio in the for loop */
    valuetoinput = (value / base * ratio)
    return getvaluetoinputformat(listtoparse, valuetoinput) 
}


function smartvaluescale(calc, value, ignore){
    /* "valuescale, {int,int}, {5,0}, {100,250}, {1000,1500}, {10000,10000}" */
    let listtoparse = createvalidlist(calc.split(","), ignore)
    if(debugcalculator){
        console.log(calc)
        console.log(calc.split(","))
        console.log(listtoparse)
    }
    /*  example data ['{int,int}', '{5,0}', '{100,250}', '{1000,1500}', '{10000,10000}'] */
    /* differentiate this to valuescale by giving the items memory so the first 5 are free the next 100 are 2.50 each etc.
    rather than a straigh ratio with valuescale does... */
    for (item of listtoparse){
        if (item.split(",")[0].toLowerCase() != "int"){
            base = parseInt(item.split(",")[0])
            ratio = parseInt(item.split(",")[1])
            if (base >= value){ 
                valuetoinput = (value / base * ratio)
                return getvaluetoinputformat(listtoparse, valuetoinput) 
            } 
        }
    }
    /* this will treat anything higher than the last defined base and scale it as if it were the last ratio in the for loop */
    valuetoinput = (value / base * ratio)
    return getvaluetoinputformat(listtoparse, valuetoinput)     
}

function add(calc, value, ignore){
    let listtoparse = createvalidlist(calc.split(","), ignore)
    if(debugcalculator){
        console.log(calc)
        console.log(calc.split(","))
        console.log(listtoparse)
    }
    for (item of listtoparse){

    }
}