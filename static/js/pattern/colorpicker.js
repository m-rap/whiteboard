function ColorPicker(id, palette, hueBar, whiteBoard, buttonId) {
    this.element = document.getElementById(id);
    this.palette = palette;
    this.palette.mediator = this;
    this.hueBar = hueBar;
    this.hueBar.mediator = this;
    this.mediator = whiteBoard;
    this.button = document.getElementById(buttonId);
    this.element.style.display = 'none';
    this.visible = false;
    var that = this;
    this.button.addEventListener('click', function(e) {
        e.preventDefault();
        that.ToggleDiv();
    });
}
ColorPicker.prototype.ToggleDiv = function() {
    if (!this.visible) {
        this.element.style.display = 'block';
        this.button.style.backgroundColor = 'orange';
        this.hueBar.segmentHeight = this.hueBar.element.offsetHeight / 6;
        this.visible = true;
    } else {
        this.element.style.display = 'none';
        this.button.style.backgroundColor = 'blue';
        this.visible = false;
    }
}