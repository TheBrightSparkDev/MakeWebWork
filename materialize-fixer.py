"""
I am aware that a few lines dont conform to pep8 standards
but this is a quick and dirty script to correct the 
materialize colors into RGBA allowing me to set transparency
without inheritance the css it generates is quite chunky
so may look into a clever function that minimises the css
file in the future but for now it will do.
"""

f = open("colors-before-fixing.css")


def convert(val):
    # first number or letter
    abclist = ["A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f"]
    if val[0:1] in abclist:
        if val[0:1] == "A" or val[0:1] == "a":
            firstnum = 10
        elif val[0:1] == "B" or val[0:1] == "b":
            firstnum = 11
        elif val[0:1] == "C" or val[0:1] == "c":
            firstnum = 12
        elif val[0:1] == "D" or val[0:1] == "d":
            firstnum = 13
        elif val[0:1] == "E" or val[0:1] == "e":
            firstnum = 14
        elif val[0:1] == "F" or val[0:1] == "f":
            firstnum = 15
    else:
        firstnum = int(val[0:1])
    # second number or letter
    if val[1:2] in abclist:
        if val[1:2] == "A" or val[1:2] == "a":
            secondnum = 10
        elif val[1:2] == "B" or val[1:2] == "b":
            secondnum = 11
        elif val[1:2] == "C" or val[1:2] == "c":
            secondnum = 12
        elif val[1:2] == "D" or val[1:2] == "d":
            secondnum = 13
        elif val[1:2] == "E" or val[1:2] == "e":
            secondnum = 14
        elif val[1:2] == "F" or val[1:2] == "f":
            secondnum = 15
    else:
        secondnum = int(val[1:2])
    firstnum = firstnum * 16
    value = firstnum + secondnum
    return value


def convertToRgba(hexval):
    first = str(convert(hexval[1:3]))
    second = str(convert(hexval[3:5]))
    third = str(convert(hexval[5:7]))
    val = "(" + first + "," + second + "," + third 
    return val


for line in f:
    if "*" in line:
        print(line)
    elif "transparent" in line:
        print(line)
    else:
        if "." in line:
            number = line.index('{') - 1
            name = line[1:number]
            hashnum = line.index('#')
            end = hashnum + 7
            hexval = line[hashnum:end]
            rgb = convertToRgba(hexval)
            if "text" in name:
                print(name + "{color: rgba" + rgb + ", 1) !important;}")
                print(name + ".op-9" + "{color: rgba" + rgb + ", 0.9) !important;}")
                print(name + ".op-8" + "{color: rgba" + rgb + ", 0.8) !important;}")
                print(name + ".op-7" + "{color: rgba" + rgb + ", 0.7) !important;}")
                print(name + ".op-6" + "{color: rgba" + rgb + ", 0.6) !important;}")
                print(name + ".op-5" + "{color: rgba" + rgb + ", 0.5) !important;}")
                print(name + ".op-4" + "{color: rgba" + rgb + ", 0.4) !important;}")
                print(name + ".op-3" + "{color: rgba" + rgb + ", 0.3) !important;}")
                print(name + ".op-2" + "{color: rgba" + rgb + ", 0.2) !important;}")
                print(name + ".op-1" + "{color: rgba" + rgb + ", 0.1) !important;}")
            else:
                print(name + "{background-color: rgba" + rgb + ", 1) !important;}")
                print(name + ".op-9" + "{background-color: rgba" + rgb + ", 0.9) !important;}")
                print(name + ".op-8" + "{background-color: rgba" + rgb + ", 0.8) !important;}")
                print(name + ".op-7" + "{background-color: rgba" + rgb + ", 0.7) !important;}")
                print(name + ".op-6" + "{background-color: rgba" + rgb + ", 0.6) !important;}")
                print(name + ".op-5" + "{background-color: rgba" + rgb + ", 0.5) !important;}")
                print(name + ".op-4" + "{background-color: rgba" + rgb + ", 0.4) !important;}")
                print(name + ".op-3" + "{background-color: rgba" + rgb + ", 0.3) !important;}")
                print(name + ".op-2" + "{background-color: rgba" + rgb + ", 0.2) !important;}")
                print(name + ".op-1" + "{background-color: rgba" + rgb + ", 0.1) !important;}")

