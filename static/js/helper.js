function getMousePos(evt) {
    return {
        x: (evt.offsetX) ? evt.offsetX : ((evt.layerX) ? evt.layerX : null),
        y: (evt.offsetY) ? evt.offsetY : ((evt.layerY) ? evt.layerY : null)
    };
}

function getRelativeOffset(Elem) {
    var offsetLeft = 0;
    var offsetTop = 0;
    do {
      if (!isNaN( Elem.offsetLeft )) {
          offsetLeft += Elem.offsetLeft;
          offsetTop += Elem.offsetTop;
      }
    } while(Elem = Elem.offsetParent);
    return {x: offsetLeft, y: offsetTop};
}

function getTarget(e) {
    var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
    return targ;
}

function equals(x, y) {
    var p;
    for(p in y) {
        if(typeof(x[p])=='undefined') {return false;}
    }

    for(p in y) {
        if (y[p]) {
            switch(typeof(y[p])) {
                case 'object':
                    if (!equals(y[p], x[p])) { return false; } break;
                case 'function':
                    if (typeof(x[p])=='undefined' ||
                    (p != 'equals' && y[p].toString() != x[p].toString()))
                    return false;
                    break;
                default:
                    if (y[p] != x[p]) { return false; }
            }
        } else {
            if (x[p])
            return false;
        }
    }

    for(p in x) {
        if(typeof(y[p])=='undefined') {return false;}
    }

    return true;
}