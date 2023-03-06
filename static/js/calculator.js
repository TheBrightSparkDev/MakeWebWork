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

    }else {
        /* this means calc is invalid so just pass on the value and send debug message to console */
        console.log("calc didn't contain a recognised function check if this is correct: " + calc)
        console.log("Implemented functions are add and valuescale")
        return value
    }
}

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
    while (targethastarget){
        /* check return true if it finds a target attribute on the target element */
        updatecontext(targetattribute, inputid, valuetoinput, format, formatfirst)
        if (document.getElementById(targetattribute).getAttribute("target") != null){
            targethastarget = true
            targetattribute = document.getElementById(targetattribute).getAttribute("target")
        } else {
            targethastarget = false
        }
        
    }
    updatedom()
}

function updatecontext(targetattribute, inputid, value, format, formatfirst){
    for (target of listoftargetobjects){
        if (target.name == targetattribute){
            target[inputid] = value
            target.format = format
            target.formatfirst = formatfirst
        }
    }
}

function updatedom(){
    for (target of listoftargetobjects){
        valuetoinput = 0
        for (i in target){
            if (typeof(target[i]) == "number"){
                valuetoinput = valuetoinput + target[i]
            }
        }
        if (target.formatfirst){
            valuetoinput = target.format + valuetoinput
        } else {
            valuetoinput = valuetoinput + target.format
        }
        document.getElementById(target.name).innerText = valuetoinput
    }
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
        return [valuetoinput, "%"]
    } else if (list[0].split(",")[1].toLowerCase() == "pound"){
        return ["£", valuetoinput]
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

function add(calc, inputelement, ignore, value){
    let valuetoadd = createvalidlist(calc.split(","), ignore)
    if(debugcalculator){
        console.log(calc)
        console.log(calc.split(","))
        console.log(valuetoadd)
    }
    if (valuetoadd == "text"){
        console.log("text")
        valuetoadd = parseInt(inputelement.innerText)
    } else if (valuetoadd == "value") {
        console.log("value")
        return value
    } else {
        if (inputelement.getAttribute("checked") == "true"){
            inputelement.setAttribute("checked", "false")
            return 0
        } else {
            inputelement.setAttribute("checked", "true")
            return parseInt(valuetoadd)
        }
    }
}

function subtract(calc, inputelement, ignore, value){
    let valuetoadd = createvalidlist(calc.split(","), ignore)
    if(debugcalculator){
        console.log(calc)
        console.log(calc.split(","))
        console.log(valuetoadd)
    }
    if (valuetoadd == "text"){
        valuetoadd = parseInt(inputelement.innerText)
    } else if (valuetoadd == "value") {
        return -Math.abs(value)
    } else {
        if (inputelement.getAttribute("checked") == "true"){
            inputelement.setAttribute("checked", "false")
            return 0
        } else {
            inputelement.setAttribute("checked", "true")
            return parseInt(-Math.abs(valuetoadd))
        }
    }
}

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
    console.log(scale)

    if (ratiodiff < 0){
        /* This means the possible values are linear */
        console.log("linear base")
        if (basediff < 0){
            console.log("linear ratio")
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
            console.log("inverted ratio")
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
        console.log("inverted base")
        if (basediff < 0){
            /* this means the input value scales linear too */
            console.log("linear ratio")
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
            console.log("inverted ratio")
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
