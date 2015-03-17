function Palette(id) {
    this.element = document.getElementById(id);
    this.innerElement = this.element.getElementsByTagName('div')[0];
    this.activeColorElement = document.getElementById('activeColor');
    this.isMouseDown = false;
    this.mediator = null;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.handlePos = {x: 0, y: 255};
    var that = this;
    this.innerElement.addEventListener('mousedown', function(e) {
        that.OnMouseDown(e);
    });
    this.innerElement.addEventListener('mousemove', function(e) {
        that.OnMouseMove(e);
    });
    document.addEventListener('mouseup', function(e) {
        that.OnMouseUp(e);
    });
}

Palette.prototype.OnMouseDown = function(e) {
    this.isMouseDown = true;
    this.handlePos = getMousePos(e);
    var target = getTarget(e);
    if (target.className == 'innerPalette') {
        $('.paletteHandle').css({left: this.handlePos.x, top: this.handlePos.y});
        this.ChangeActiveColor();
    }
}
Palette.prototype.OnMouseMove = function(e) {
    this.handlePos = getMousePos(e);
    var target = getTarget(e);
    if (this.isMouseDown && target.className == 'innerPalette') {
        $('.paletteHandle').css({left: this.handlePos.x, top: this.handlePos.y});
        this.ChangeActiveColor();
    }
}
Palette.prototype.OnMouseUp = function(e) {
    this.isMouseDown = false;
}
Palette.prototype.ChangeActiveColor = function() {
    var k = ((this.element.offsetHeight - this.handlePos.y)/this.element.offsetHeight);
    var r = this.r*k;
    r = Math.ceil(r + ((this.element.offsetWidth - this.handlePos.x)*(255-r)/this.element.offsetWidth));
    var g = this.g*k;
    g = Math.ceil(g + ((this.element.offsetWidth - this.handlePos.x)*(255-g)/this.element.offsetWidth));
    var b = this.b*k;
    b = Math.ceil(b + ((this.element.offsetWidth - this.handlePos.x)*(255-b)/this.element.offsetWidth));
    this.activeColorElement.style.backgroundColor = this.mediator.mediator.activeColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
}