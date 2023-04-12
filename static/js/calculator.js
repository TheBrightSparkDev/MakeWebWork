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

let debugcalculator = false
let listoftargetobjects = []
let extracontext = []
let activatehidden = []

calculatorinitialiser()
function calculatorinitialiser(){
    if(debugcalculator){
        console.log("calculator.js connected")
    }
    createcontext(document.body.getElementsByTagName("input"), true)
    createcontext(extracontext, false)
    if(debugcalculator){
        for (target of listoftargetobjects){
            console.log(target)
        }
        checkforinputs()
    }
    for (element of activatehidden){
        calculate(element)
    }
    document.addEventListener("input" , (e) => calculate(e.target))
}

/* automatic tests */
function checkforinputs(){
    /* this function simply iterates through the context and makes sure theres an element for every target */
    for (target of listoftargetobjects){
        if (document.getElementById(target.name) == null){
            console.log("this is a target value that doesnt point to anything please fix: " + target.name)
        }
        /* This test has never failed because the situation is technically impossible 
        due to the way create context breaks the loop if it finds a match.
        However if you remove the break statement you will see this code in action */
        let numberofmatches = 0
        for (innertarget of listoftargetobjects){
            if (innertarget.name == target.name){
                numberofmatches++
            }
        }
        if (numberofmatches > 1){
            console.log(target.name + " has " + --numberofmatches + " duplicates")
        }
    }
}
/* end of automatic tests */
/* Initially run code */

function createcontext(elements, createextracontext){
    /* This iterates through the list */
    for (input of elements){
        /* This becomes true if the listoftargets doesnt contain a matching target */
        let createnewobject = false
        /* this checks if the input has a target not interested if it doesn't */
        if (input.getAttribute("target") != null){

            if (listoftargetobjects.length > 0){
                /* this goes through the list and checks if listofobject contains a matching target */
                for (target of listoftargetobjects){
                    if (target.name == input.getAttribute("target")){
                        /* checks if the id has already been added */
                        if (!target.inputelements.includes(input.id)){
                            target.inputelements.push(input.id)
                            createnewobject = false
                            break
                        } else {
                            createnewobject = false
                            break
                        }
                    } else {
                        /* no matching target so it must be new */
                        createnewobject = true
                    }
                }
            } else {
                /* there is nothing in the listoftargets so this is the first iteration */
                createnewobject = true
            }
            if (createnewobject){
            let targetobject = new Object()
            targetobject.name = input.getAttribute("target")
            targetobject.inputelements = []
            targetobject.inputelements.push(input.id)
            targetobject.format = ""
            listoftargetobjects.push(targetobject)
            }
            if (createextracontext){
                if (document.getElementById(input.getAttribute("target")) == null){
                    if (debugcalculator){
                        console.log("this is a target value that doesnt point to anything please fix: " + input.getAttribute("target"))
                    }
                } else {
                    extracontext.push(document.getElementById(input.getAttribute("target")))
                }
            }
            if (input.classList.contains("hide")){
                activatehidden.push(input)
            }
        }
    }
}

/* End of intially run code */

/* calculate calls parsecalc */
function calculate(inputelement){
    /* this line gets the calculated value */
    let valuetoinput = parsecalc(inputelement,inputelement.value)
    /* this line inputs the value into the target it also uses context to make sure no input gets added twice */
    inputintotarget(valuetoinput, inputelement) 
}

function parsecalc(inputelement, value){
    calc = inputelement.getAttribute("calc")
    if (calc.toLowerCase().includes("smartvaluescale")){

        if(debugcalculator){console.log("detected smartvaluescale")}
        return smartvaluescale(calc, parseInt(value), "smartvaluescale")

    } else if (calc.toLowerCase().includes("valuescale")){

        if(debugcalculator){console.log("detected valuescale")}
        return valuescale(calc, parseInt(value), "valuescale")

    } else if (calc.toLowerCase().includes("scale")){

        if(debugcalculator){console.log("detected scale")}
        return scale(calc, parseInt(value), "scale")

    } else if (calc.toLowerCase().includes("add")){

        if(debugcalculator){console.log("detected add")}
        return add(calc, inputelement, "add", parseInt(value))

    } else if (calc.toLowerCase().includes("subtract")){

        if(debugcalculator){console.log("detected subtract")}
        return subtract(calc, inputelement, "subtract", parseInt(value))

    } else if (calc.toLowerCase().includes("divide")){

        if(debugcalculator){console.log("detected divide")}
        return divide(calc, inputelement, value, "divide")

    } else {
        /* this means calc is invalid so just pass on the value and send debug message to console */
        console.log("calc didn't contain a recognised function check if this is correct: " + calc)
        console.log("Implemented functions are add and valuescale")
        return value
    }
}
/* parsecalc pushes the value to one of the calculation functions below */

/* below are all the calculation functions */

/* Valuescale takes a value and converts it to a specified ratio based on the parameters passed */
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
                if (isNaN(valuetoinput)){
                    valuetoinput = 0
                }
                return getvaluetoinputformat(listtoparse, parseInt(valuetoinput.toFixed('1'))) 
            } 
        }
    }
    /* this will treat anything higher than the last defined base and scale it as if it were the last ratio in the for loop */
    valuetoinput = (value / base * ratio)
    if (isNaN(valuetoinput)){
        valuetoinput = 0
    }
    return getvaluetoinputformat(listtoparse, valuetoinput) 
}
/* same as Valuescale except it used every scale so 5,100 10,50 put 10 into the valuescale you get 50 however smart makes the first 5 equal 100 and the last 5 equal 25 */
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
    valuetoinput = 0
    for (item of listtoparse){
        if (item.split(",")[0].toLowerCase() != "int"){
            base = parseInt(item.split(",")[0])
            ratio = parseInt(item.split(",")[1])
            if (value > 0){
                if (base <= value){ 
                    valuetoinput = valuetoinput + ratio
                    value = value - base
                } else if (base > value){
                    if (isNaN(valuetoinput)){
                        valuetoinput = 0
                    } else {
                        valuetoinput = valuetoinput + (value / base * ratio)
                    }
                    return getvaluetoinputformat(listtoparse, valuetoinput)  
                }
            }
        }
    }
    /* this will treat anything higher than the last defined base and scale it as if it were the last ratio in the for loop */
    return getvaluetoinputformat(listtoparse, valuetoinput)      
}
/* checks if the value is in the inputelement or the value then divides the number by the number specified in the calc attribute */
function divide(calc, inputelement, value, ignore){
    /* example data "[spreadover, pound, 24]" */
    let listtoparse = createvalidlist(calc.split(","), ignore)
    if(debugcalculator){
        console.log(calc)
        console.log(calc.split(","))
        console.log(listtoparse)
        console.log(inputelement)
        console.log(value)
    }
    if (value > 1){
        valuetoinput = value
    } else {
        valuetoinput = sanitizevalue(inputelement.textContent)
        valuetoinput = Number(valuetoinput)
    }
    for (item of listtoparse){
        if (!isNaN(item)){
            valuetoinput = valuetoinput / Number(item)
        }
    }
    /* valuetoinput or value contains the number that needs to be spread */
    /* the calc determines the number to be spread over and the format of the response */
    if (isNaN(valuetoinput)){
        return getvaluetoinputformat(listtoparse, 0) 
    } else {
        return getvaluetoinputformat(listtoparse, valuetoinput) 
    } 
}
/* add checks if the value is in the calc string the value or the inputelement.text content and then passes it on */
function add(calc, inputelement, ignore, value){
    let listtoparse = createvalidlist(calc.split(","), ignore)
    for (item of listtoparse){
        if (!isNaN(item)){
            value = item
        } else if (item == "text"){
            valuetoadd = inputelement.textContent
            valuetoadd = sanitizevalue(valuetoadd)
        } else if (item == "value") {
            valuetoadd = sanitizevalue(value)
        }
    }
    if(debugcalculator){
        console.log(calc)
        console.log(calc.split(","))
        console.log(listtoparse)
        console.log(value)
    }
    if (inputelement.getAttribute("type") == "checkbox"){
        if (inputelement.getAttribute("checked") == "true"){
            inputelement.setAttribute("checked", "false")
            valuetoadd = 0
        } else {
            inputelement.setAttribute("checked", "true")
            valuetoadd = sanitizevalue(value)
        }
    }
    return getvaluetoinputformat(listtoparse, valuetoadd)
}
/* same as add uses -Math.abs() */
function subtract(calc, inputelement, ignore, value){
    let listtoparse = createvalidlist(calc.split(","), ignore)
    for (item of listtoparse){
        if (!isNaN(item)){
            value = item
        } else if (item == "text"){
            valuetoadd = inputelement.textContent
            valuetoadd = sanitizevalue(valuetoadd)
        } else if (item == "value") {
            valuetoadd = sanitizevalue(value)
        }
    }
    if(debugcalculator){
        console.log(calc)
        console.log(calc.split(","))
        console.log(listtoparse)
        console.log(value)
    }
    if (inputelement.getAttribute("type") == "checkbox"){
        if (inputelement.getAttribute("checked") == "true"){
            inputelement.setAttribute("checked", "false")
            valuetoadd = 0
        } else {
            inputelement.setAttribute("checked", "true")
            -Math.abs(value)
            valuetoadd = sanitizevalue(value)
        }
    }
    valuetoadd = -Math.abs(valuetoadd)
    return getvaluetoinputformat(listtoparse, valuetoadd)
}
/* Absolute nightmare: takes a scale linear or inverted and converts it to the respective ratio so 1000 can equal 5 and 1 can equal 35 etc. implementing this 
was the closest thing to development hell I have ever experienced learned alot about percentages and ratios though!  */
function scale(calc, value, ignore){
    /* "scale, {int, percent}, {1,35}, {1000000,5}" */
    let listtoparse = createvalidlist(calc.split(","), ignore)
    if(debugcalculator){
        console.log(calc)
        console.log(calc.split(","))
        console.log(listtoparse)
    }
    /*  example data ['int,percent', '1,35', '1000000,5'] */
    /* Scale is getting the first two and pairing them up and the last tow and pairing them up so putting 
    1 here equals 35 putting 100000 here equals 5 and the hard part (everything inbetween needs to make sense too)
    AKA lots of maths and headaches */
    let valuetoinput = 0
    let scale = new Object()
    i = 0
    /* build the data */
    for (item of listtoparse){
        i++
        if (i == 2){
            scale.firstbase = parseInt(item.split(",")[0])
            scale.firstratio = parseInt(item.split(",")[1])
        } else if (i == 3){
            scale.secondbase = parseInt(item.split(",")[0])
            scale.secondratio = parseInt(item.split(",")[1])
        }
    }   
    /* there is probably a more efficient way to do this */
    let basediff = scale.firstbase - scale.secondbase
    let ratiodiff = scale.firstratio - scale.secondratio
    if (debugcalculator){ console.log(scale)}
    if (ratiodiff < 0){
        /* This means the possible values are linear */
        if (debugcalculator){console.log("linear base")}
        if (basediff < 0){
            if (debugcalculator){console.log("linear ratio")}
            /* this means the input value scales linear too */
            if (value > scale.firstbase){
                percentageofbase = ((value) / (scale.secondbase)) * 100 
            } else {
                percentageofbase = 0
            }
            tempvalue = (((scale.secondratio) / 100) * percentageofbase)
            addon = scale.firstratio - ((scale.firstratio / 100) * percentageofbase)
            valuetoinput = tempvalue + addon
        } else {
            /* this means the input value is inverted */
            if (debugcalculator){console.log("inverted ratio")}
            if (value > scale.secondbase){
                percentageofbase = ((value) / (scale.firstbase)) * 100 
            } else {
                percentageofbase = 0
            }
            tempvalue = (((scale.firstratio) / 100) * percentageofbase)
            addon = scale.secondratio - ((scale.secondratio / 100) * percentageofbase)
            valuetoinput = tempvalue + addon
        } 
        if (valuetoinput < scale.firstratio){
            valuetoinput = scale.firstratio
        } else if(valuetoinput > scale.secondratio){
            valuetoinput = scale.secondratio
        }
        if (basediff < 0){
            if (isNaN(valuetoinput)){
                valuetoinput = scale.firstratio
            }
        } else {
            if (isNaN(valuetoinput)){
                valuetoinput = scale.secondratio
            }
        }
    } else {
        /* This means the possible values are inverted */
        if (debugcalculator){console.log("inverted base")}
        if (basediff < 0){
            /* this means the input value scales linear too */
            if (debugcalculator){console.log("linear ratio")}
            if (value > scale.firstbase){
                percentageofbase = ((value) / (scale.secondbase)) * 100 
            } else {
                percentageofbase = 0
            }
            tempvalue = (((scale.secondratio) / 100) * percentageofbase)
            addon = scale.firstratio - ((scale.firstratio / 100) * percentageofbase)
            valuetoinput = tempvalue + addon
        } else {
            /* this means the input value is inverted */
            if (debugcalculator){console.log("inverted ratio")}
            if (value > scale.secondbase){
                percentageofbase = ((value) / (scale.firstbase)) * 100 
            } else {
                percentageofbase = 0
            }
            tempvalue = (((scale.firstratio) / 100) * percentageofbase)
            addon = scale.secondratio - ((scale.secondratio / 100) * percentageofbase)
            valuetoinput = tempvalue + addon
        }
        if (valuetoinput < scale.secondratio){
            valuetoinput = scale.secondratio
        } else if (valuetoinput > scale.firstratio){
            valuetoinput = scale.firstratio
        } 
        if (basediff < 0){
            if (isNaN(valuetoinput)){
                valuetoinput = scale.firstratio
            }
        } else {
            if (isNaN(valuetoinput)){
                valuetoinput = scale.secondratio
            }
        }
    }
    return getvaluetoinputformat(listtoparse, (parseInt(valuetoinput.toFixed(2))))      
}

/* end of all calculation functions */

/* end of parsecalc options */

/* This function is badly named it gets rid of used information from the calc and also corrects the unintended issues caused by split since
I used commas where I didn't need them example being in {100, 1 } couldve used : but it is what it is */
function createvalidlist(brokenlist, ignore){
    /* theres likely a better way to do this */
    let correctedlist = []
    let save = ""
    if (brokenlist.length != 1){
        for (item of brokenlist){
            if (item.includes("{")){
                save = item.trim()
                save = save.replace("{","")
            } else if (item.includes("}")){
                item = item.replace("}","")
                correctedlist.push(save + "," + item.trim())
                save = ""
            } else if(item.toLowerCase().includes(ignore)){
            } else {
                correctedlist.push(item.trim())
            }
        }
    } else {
        return brokenlist
    }
    return correctedlist
}

/* This function fixes the value variable as sometimes it can come through as a string with a character like £ or % etc */
function sanitizevalue(value){
    /* if value is a number don't need to do anything to it */
    if (isNaN(value)){
        /* this means its a string undefined or an empty string */
        if(value.length > 1){
            /* value is a string could have spaces or other characters that may make 
            using the number in equations difficult or turning it into an int impossible */
            value = value.replace("£","")
            value = value.replace("%","")
            value = value.replace("$","")
            value = value.replace(" ","")
        } else {
            /* value is empty string or 0 */
            value = 0
        }
    }
    return Number(value)
}

/* This function puts the extra character on the end or beginning of the input ( it actually creates an array in the correct order ) */
function getvaluetoinputformat(list, valuetoinput){
    if(list.length != 1){
        if (valuetoinput == NaN){
            valuetoinput = 0
        }
        if (list[0].split(",")[1].toLowerCase() == "int"){
            return valuetoinput
        } else if (list[0].split(",")[1].toLowerCase() == "percent"){
            return [valuetoinput, "%"]
        } else if (list[0].split(",")[1].toLowerCase() == "pound"){
            return ["£", valuetoinput]
        }
    } return valuetoinput
}

/* This function is called by the calculation function as the second function after everything above has run it takes the calculated
value and the target and prepares the data for update context and checks for target chains (targets that have targets) */
function inputintotarget(value , target){
    let targetattribute = target.getAttribute('target')
    let inputid = target.id
    let valuetoinput = 0
    let format = ""
    if (debugcalculator){
        console.log(value)
        console.log(typeof(value))
        console.log("following two are undefined if calc is add")
        console.log(value[0])
        console.log(value[1])
    }
    if (typeof(value) == "object"){
        if (isNaN(value[1])){
            valuetoinput = value[0]
            format = value[1]
            formatfirst = false
        } else {
            valuetoinput = value[1]
            format = value[0]
            formatfirst = true
        }
    } else {
        valuetoinput = value
        format = ""
        formatfirst = false
    }
    let targethastarget = true
    updatecontext(targetattribute, inputid, valuetoinput, format, formatfirst)
    if (document.getElementById(targetattribute).getAttribute("target") != null){
        updatedom()
        targethastarget = true
        if(debugcalculator){
            console.log(document.getElementById(targetattribute))
        }
        calculate(document.getElementById(targetattribute))
        targetattribute = document.getElementById(targetattribute).getAttribute("target")
        if(debugcalculator){console.log(targetattribute)}
    } else {
        targethastarget = false
    }
    updatedom()
}

/* This function is called he input into target it updates the various objects that were created by create context */
function updatecontext(targetattribute, inputid, value, format, formatfirst){
    for (target of listoftargetobjects){
        if (target.name == targetattribute){
            target[inputid] = value
            target.format = format
            target.formatfirst = formatfirst
        }
    }
}

/* This function is the only function that updates the DOM it loops through the context objects using the various values and the format
to update the DOM this was the only way to track multiple inputs without having them input multiple times */
function updatedom(){
    for (target of listoftargetobjects){
        valuetoinput = 0
        for (i in target){
            if (typeof(target[i]) == "number"){
                valuetoinput = valuetoinput + target[i]
            }
        }
        if (target.formatfirst){
            valuetoinput = target.format + valuetoinput.toFixed(2)
        } else {
            valuetoinput = valuetoinput.toFixed(2) + target.format
        }
        document.getElementById(target.name).innerText = valuetoinput
    }
    if (debugcalculator){
        console.log(listoftargetobjects)
    }
}


