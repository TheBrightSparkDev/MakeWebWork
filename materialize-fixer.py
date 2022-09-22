f = open("colors.css")


def convert(val):
    # first number or letter
    print(val[0:1])
    list = ["A", "B", "C", "D", "E", "F"]
    if val[0:1] in list:
        if val[0:1] == "A":
            firstnum = 11
        elif val[0:1] == "B":
            firstnum = 12
        elif val[0:1] == "C":
            firstnum = 13
        elif val[0:1] == "D":
            firstnum = 14
        elif val[0:1] == "E":
            firstnum = 15
        elif val[0:1] == "F":
            firstnum = 16
    else:
        firstnum = val[0:1]
    # second number or letter
    if val[1:2] in list:
        if val[1:2] == "A":
            secondnum = 11
        elif val[1:2] == "B":
            secondnum = 12
        elif val[1:2] == "C":
            secondnum = 13
        elif val[1:2] == "D":
            secondnum = 14
        elif val[1:2] == "E":
            secondnum = 15
        elif val[1:2] == "F":
            secondnum = 16
    else:
        secondnum = val[1:2]
    print(firstnum)
    print(secondnum)
    firstnum = firstnum * 16
    value = firstnum + secondnum
    return value


def convertToRgba(hexval):
    first = convert(hexval[1:3])
    second = convert(hexval[3:5])
    third = convert(hexval[5:7])
    val = "(" + first + "," + second + "," + third + ")"
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
            rgba = convertToRgba(hexval)
            print(rgba)



