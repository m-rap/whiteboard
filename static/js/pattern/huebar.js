function HueBar(id) {
    this.element = document.getElementById(id);
    this.isMouseDown = false;
    this.mediator = null;
    this.hueBarSegmentHeight = 0;
    var that = this;
    this.element.addEventListener('mousedown', function(e) {
        that.OnMouseDown(e);
    });
    this.element.addEventListener('mousemove', function(e) {
        that.OnMouseMove(e);
    });
    document.addEventListener('mouseup', function(e) {
        that.OnMouseUp(e);
    });
}
HueBar.prototype.OnMouseDown = function(e) {
    this.isMouseDown = true;
    var pos = getMousePos(e);
    var target = getTarget(e);
    if (target.id == 'hueBar') {
        $('.hueBarHandle').css({top: pos.y});
        this.ChangePaletteColor(pos.y);
    }
}
HueBar.prototype.OnMouseMove = function(e) {
    var pos = getMousePos(e);
    var target = getTarget(e);
    if (this.isMouseDown && target.id == 'hueBar') {
        $('.hueBarHandle').css({top: pos.y});
        this.ChangePaletteColor(pos.y);
    }
}
HueBar.prototype.OnMouseUp = function() {
    this.isMouseDown = false;
}
HueBar.prototype.ChangePaletteColor = function(pos) {
    var segment = Math.ceil(pos / this.segmentHeight);
    var ratio = (pos - (segment - 1) * this.segmentHeight) / this.segmentHeight;
    var color = 'rgb(255, 0, 0)';
    switch (segment) {
        case 1:
            this.mediator.palette.r = 255;
            this.mediator.palette.g = 0;
            this.mediator.palette.b = Math.floor(ratio * 255);
            break;
        case 2:
            this.mediator.palette.r = Math.floor(255 - ratio * 255);
            this.mediator.palette.g = 0;
            this.mediator.palette.b = 255;
            break;
        case 3:
            this.mediator.palette.r = 0;
            this.mediator.palette.g = Math.floor(ratio * 255);
            this.mediator.palette.b = 255;
            break;
        case 4:
            this.mediator.palette.r = 0;
            this.mediator.palette.g = 255;
            this.mediator.palette.b = Math.floor(255 - ratio * 255);
            break;
        case 5:
            this.mediator.palette.r = Math.floor(ratio * 255);
            this.mediator.palette.g = 255;
            this.mediator.palette.b = 0;
            break;
        case 6:
            this.mediator.palette.r = 255;
            this.mediator.palette.g = Math.floor(255 - ratio * 255);
            this.mediator.palette.b = 0;
            break;
    }
    this.mediator.palette.element.style.backgroundColor = 'rgb(' + this.mediator.palette.r + ', ' + this.mediator.palette.g + ', ' + this.mediator.palette.b + ')';
    this.mediator.palette.ChangeActiveColor();
}