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
        e.stopPropagation();
        e.preventDefault();
        //that.ToggleDiv();
        that.Show();
    });
    $('html').click(function() {
		that.Hide();
	});
    $(this.element).click(function(e) {
		e.stopPropagation();
	});
}
ColorPicker.prototype.ToggleDiv = function() {
    if (!this.visible) {
        this.Show();
    } else {
        this.Hide();
    }
}
ColorPicker.prototype.Show = function() {
	this.element.style.display = 'block';
	//this.button.style.backgroundColor = 'orange';
	this.hueBar.segmentHeight = this.hueBar.element.offsetHeight / 6;
	var rel = getRelativeOffset(this.button);
	this.element.style.left = rel.x + "px";
	this.element.style.top = (rel.y + 41) + "px";
	this.visible = true;
}
ColorPicker.prototype.Hide = function() {
	this.element.style.display = 'none';
	//this.button.style.backgroundColor = 'blue';
	this.visible = false;
}
