function getMousePos(evt, elem) {
    if (evt.offsetX == undefined) {
        var relOff = getRelativeOffset(elem);
        return {
            x: evt.layerX - relOff.x,
            y: evt.layerY - relOff.y
        };
    }
    return {
        x: evt.offsetX,
        y: evt.offsetY
    };
}

function getRelativeOffset(Elem) {
    //if (!(Elem instanceof HTMLCanvasElement))
	//	return {x: 0, y: 0};
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
