function implements() {
    if (arguments.length < 2)
        throw new Error("No inheritance classes given");
    
    var targetClass = arguments[0];
    Array.prototype.splice.call(arguments, 0, 1);
    var interfaces = arguments;
    
    for (i in interfaces) {
        for (j in interfaces[i].prototype) {
            var contains = false;
            for (k in targetClass) {
                if (k == j) {
                    contains = true;
                    break;
                }
            }
            if (!contains && typeof(targetClass.prototype) != 'undefined')
                for (k in targetClass.prototype) {
                    if (k == j) {
                        contains = true;
                        break;
                    }
                }
            if (!contains)
                throw new Error(j + " not implemented in " + targetClass.name);
        }
    }
}