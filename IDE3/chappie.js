/*
*/
debugDepth = -1;
queue = [];
classifier = "Play";

tr = [
    {Outlook:"Sunny", Temperature:"Hot", Humidity:"High", Wind:"True", Play:"No"},
    {Outlook:"Sunny", Temperature:"Hot", Humidity:"High", Wind:"False", Play:"No"},
    {Outlook:"Sunny", Temperature:"Mild", Humidity:"High", Wind:"False", Play:"No"},
    {Outlook:"Sunny", Temperature:"Mild", Humidity:"Normal", Wind:"True", Play:"Yes"},
    {Outlook:"Sunny", Temperature:"Cool", Humidity:"Normal", Wind:"False", Play:"Yes"},
    {Outlook:"Overcast", Temperature:"Hot", Humidity:"High", Wind:"False", Play:"Yes"},
    {Outlook:"Overcast", Temperature:"Hot", Humidity:"Normal", Wind:"False", Play:"Yes"},
    {Outlook:"Overcast", Temperature:"Mild", Humidity:"High", Wind:"True", Play:"No"},
    {Outlook:"Overcast", Temperature:"Cool", Humidity:"Normal", Wind:"True", Play:"No"},
    {Outlook:"Rain", Temperature:"Mild", Humidity:"High", Wind:"True", Play:"No"},
    {Outlook:"Rain", Temperature:"Mild", Humidity:"High", Wind:"False", Play:"Yes"},
    {Outlook:"Rain", Temperature:"Mild", Humidity:"Normal", Wind:"False", Play:"Yes"},
    {Outlook:"Rain", Temperature:"Cool", Humidity:"Normal", Wind:"False", Play:"Yes"},
    {Outlook:"Rain", Temperature:"Cool", Humidity:"Normal", Wind:"True", Play:"No"},
]

var id3Node = function(attr, children, classes) {
    this.attribute = attr;
    this.children = values;
    this.classes = classes;

    this.classify = function() {
        var total = 0;
        for(var c in this.classes) {
            console.log(this.classic + " =");
        }
    }
}

/*
Prettifier for printing numbers.
*/
var printNum = function(num) {
    var precision = 1000;
    return String(Math.trunc(num*precision)/precision);
}

/*
Returns an array containing all the values found for an attribute.

    attr:   Attribute whose possible values you want to find.
    set:    List of objects with said attribute.
*/
var domainOf = function(attr, set) {
    if(typeof(set) === 'undefined') set = tr;
    var values = [];
    for(var entry in set) {
        if(set[entry][attr] != null && values.indexOf(set[entry][attr]) == -1) {
            values.push(set[entry][attr]);
        }
    }
    return values;
}

/*
Returns an array of objects, whose contents are the result of applying a "filter" to
 a source array.

    conds:  An object that will serve as the "filter." Only objects from the
     source list whose variables match this object's variables will be returned.
    set:    The list of objects to filter from.
*/
var where = function(conds, set) {
    if(typeof(set) === 'undefined') set = tr;
    var result = [];
    for(var entry in set) {
        var ok = true;
        for(var cond in conds) {
            if(set[entry][cond] != conds[cond]) {
                ok = false;
                break;
            }
        }
        if(ok) {
            result.push(set[entry]);
        }
    }
    return result;
}

/*
Returns an object whose variables are the values of an attribute. The values
 of the object's variables are the amount of times the attribute value appeared.
The returned object also contains a variable called "_Total", which is the
 sum of all of its values.

    attr:   Attribute whose possible values you want, and their count.
    set:    List of objects with said attribute.
*/
var proportionsOf = function(attr, set) {
    if(typeof(set) === 'undefined') set = tr;
    var proportions = {};
    var domain = domainOf(attr);
    for(var value in domain) {
        proportions[domain[value]] = 0;
    }
    proportions._Total = 0;
    for(var entry in set) {
        proportions[set[entry][attr]] ++;
        proportions._Total ++;
    }
    return proportions;
}

/*
*/
var entropyIf = function(attr, value, set) {
    if(typeof(set) === 'undefined') set = tr;
    debugDepth ++;
    var debugHeader = "";
    for(var i = 0; i < debugDepth; i ++) debugHeader += "\t";

    var result = 0;
    var counts = {};
    var classifierDomain = domainOf(classifier, set);
    for(var td in classifierDomain) {
        var cond = {};
        cond[classifier] = classifierDomain[td];
        cond[attr] = value;
        counts[classifierDomain[td]] = where(cond, set).length;
    }

    var debugCalculation = attr + ">>" + value + "\t[";
    var props = proportionsOf(attr, set);
    for(var c in classifierDomain) {
        debugCalculation += counts[classifierDomain[c]] + "/" + props[value] + " * " + "log(1/(" + counts[classifierDomain[c]] + "/" + props[value] + "))/log(2)";
        if(c < classifierDomain.length - 1) {
            debugCalculation += " + ";
        }
        var log = Math.log(1/(counts[classifierDomain[c]]/props[value]))/Math.log(2);
        if(log == NaN || log == Infinity) {
            log = 0;
        }
        result += (counts[classifierDomain[c]]/props[value] * log);
    }
    debugCalculation += "] * " + props[value] + "/" + props._Total;;
    result *= (props[value]/props._Total);
    debugCalculation += " = " + printNum(result);
    // console.log(debugHeader + "%c(entropyIf)" + debugCalculation, "color: rgb(120,0,0);");
    debugDepth --;
    return result;
}

//
var entropyFor = function(attr, set) {
    debugDepth ++;
    var debugHeader = "";
    for(var i = 0; i < debugDepth; i ++) debugHeader += "\t";
    // console.log(debugHeader + "%c(entropyFor)Calculating entropy of " + attr + " in the set.", "color: rgb(60,0,0);");

    if(typeof(set) === 'undefined') set = tr;
    var totalEntropy = 0;
    var domain = domainOf(attr, set);
    for(var d in domain) {
        totalEntropy += entropyIf(attr, domain[d], set);
    }
    // console.log(debugHeader + "%c(entropyFor)Entropy of " + attr + " in the set is " + printNum(totalEntropy), "color: rgb(60,0,0);");
    debugDepth --;
    return totalEntropy;
}

//
var entropyOf = function(set) {
    debugDepth ++;
    var debugHeader = "";
    for(var i = 0; i < debugDepth; i ++) debugHeader += "\t";
    // console.log(debugHeader + "(entropyOf)Calculating total entropy in the set.");

    var props = proportionsOf(classifier, set);
    var domain = domainOf(classifier, set);
    var result = 0;

    for(var d in domain) {
        var log = Math.log(1/(props[domain[d]]/props._Total))/Math.log(2);
        if(log == NaN || log == Infinity) {
            log = 0;
        }
        result += (props[domain[d]]/props._Total * log);        
    }

    // console.log(debugHeader + "(entropyOf)Total entropy in the set is " + printNum(result));
    debugDepth --;
    return result;
}

// Let the games begin.
var id3 = function(currentSet) {
    debugDepth ++;
    var debugHeader = "";
    for(var i = 0; i < debugDepth; i ++) debugHeader += "\t";

    console.log("----------");

    var setEntropy = entropyOf(currentSet);
    var entropies = [];
    
    console.log(debugHeader + "%c(id3)Set entropy is " + printNum(setEntropy) + ".", "color: rgb(0,120,0);");

    var sampleEntry = currentSet[0];
    for(var attr in sampleEntry) {
        if(attr == classifier) continue;
        if(domainOf(attr, currentSet).length < 2) {
            console.log(debugHeader + attr + "%c is known to be \"" + sampleEntry[attr] + "\".", "color: rgb(0,0,120);");
            continue;
        }
        //console.log("%c(id3)Domain of " + attr + " is " + domainOf(attr, currentSet), "color: rgb(0,120,0);");
        var gain = setEntropy-entropyFor(attr, currentSet);
        entropies.push({"attr": attr, "infoGain": gain});
        // console.log(debugHeader + "%c(id3)" + attr + " has an info gain of " + printNum(gain), "color: rgb(0,120,0);");
    };

    if(entropies.length <= 0 || setEntropy <= 0) {
        console.log(debugHeader + "%c(id3)We have reached a result!", "color: rgb(0,120,0);");

        classifierDomain = domainOf(classifier, currentSet);
        classifierProps = proportionsOf(classifier, currentSet);

        for(var d in classifierDomain) {
            var probability = classifierProps[classifierDomain[d]]/classifierProps._Total;
            console.log(debugHeader + "%c(id3)Probability of \"" + classifierDomain[d] + "\": " + printNum(probability), "background: #000000; color:#BADA55");
        }

        debugDepth --;
        return;
    }

    classifierDomain = domainOf(classifier, currentSet);
    classifierProps = proportionsOf(classifier, currentSet);

    for(var d in classifierDomain) {
        var probability = classifierProps[classifierDomain[d]]/classifierProps._Total;
        console.log(debugHeader + "(id3)Probability of \"" + classifierDomain[d] + "\": " + printNum(probability));
    }

    var hig = null; // Highest Info Gain

    for(var e in entropies) {
        if(!hig) {
            hig = entropies[e];
            continue;
        }
        if(entropies[e].infoGain > hig.infoGain) {
            hig = entropies[e];
        }
    }
    console.log(debugHeader + "%c(id3)Highest information gain: " + hig.attr, "color: rgb(0,120,0);");

    var constraints = {};
    console.log(debugHeader + "%c(id3)Best question: Value of " + hig.attr + "?", "color: rgb(0,120,0);");
    var higDomain = domainOf(hig.attr, currentSet);
    for(var d in higDomain) {
        constraints[hig.attr] = higDomain[d];
        //queue.push(where(constraints, currentSet));
        id3(where(constraints, currentSet));
    }

    debugDepth --;
}

var id3query = function(query, currentSet) {
    debugDepth ++;
    var debugHeader = "";
    for(var i = 0; i < debugDepth; i ++) debugHeader += "\t";

    console.log("----------");
    console.log(debugHeader + "(id3)Query:");
    console.log(query);

    var setEntropy = entropyOf(currentSet);
    var entropies = [];
    console.log(debugHeader + "%c(id3)Set entropy is " + printNum(setEntropy) + ".", "color: rgb(0,120,0);");

    var classifierDomain = domainOf(classifier, currentSet);
    var classifierProps = proportionsOf(classifier, currentSet);

    for(var d in classifierDomain) {
        var probability = classifierProps[classifierDomain[d]]/classifierProps._Total;
        console.log(debugHeader + "(id3)Probability of \"" + classifierDomain[d] + "\": " + printNum(probability));
    }

    var constraints = {};
    for(var v in query) {
        constraints[v] = query[v];
    }
    var sampleEntry = where(constraints, currentSet)[0];
    if(!sampleEntry) return;
    for(var attr in sampleEntry) {
        if(attr == classifier) continue;
        if(domainOf(attr, currentSet).length < 2) {
            console.log(debugHeader + "(id3)" + attr + "%c is known to be \"" + sampleEntry[attr] + "\".", "color: rgb(0,0,120);");
            continue;
        }
        if(query[attr] == undefined || sampleEntry[attr] != query[attr]) {
            continue;
        }

        var gain = setEntropy-entropyFor(attr, currentSet)
        entropies.push({"attr": attr, "infoGain": gain});
        console.log(debugHeader + "%c(id3)" + attr + " has an info gain of " + printNum(gain), "color: rgb(0,120,0);");
    };

    if(entropies.length <= 0 || setEntropy <= 0) {
        console.log(debugHeader + "%c(id3)We have reached a result!", "color: rgb(0,120,0);");

        classifierDomain = domainOf(classifier, currentSet);
        classifierProps = proportionsOf(classifier, currentSet);

        for(var d in classifierDomain) {
            var probability = classifierProps[classifierDomain[d]]/classifierProps._Total;
            console.log(debugHeader + "%c(id3)Probability of \"" + classifierDomain[d] + "\": " + printNum(probability), "background: #000000; color:#BADA55");
        }

        debugDepth --;
        return;
    }

    var hig = null; // Highest Info Gain

    for(var e in entropies) {
        if(!hig) {
            hig = entropies[e];
            continue;
        }
        if(entropies[e].infoGain < 0) {
            continue;
        }
        if(entropies[e].infoGain > hig.infoGain) {
            hig = entropies[e];
        }
    }

    if(!query.hasOwnProperty(hig.attr)) {
        debugDepth --;
        return;
    }

    console.log(debugHeader + "%c(id3)Best question (Highest IG): Value of " + hig.attr + "?", "color: rgb(0,120,0);");
    constraints = {};
    constraints[hig.attr] = query[hig.attr];
    id3query(query, where(constraints, currentSet));

    debugDepth --;
}

id3(tr);
// id3query({Outlook: "Sunny", Temperature: "Cool"}, tr);