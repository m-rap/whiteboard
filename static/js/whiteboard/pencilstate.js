function PencilState(mediator) {
    this.name = 'pencilState';
    this.origin = null;
    this.isMouseDown = false;
    this.mediator = mediator;
    this.helperLines = new Array();
}
PencilState.prototype.mediator = null;
PencilState.prototype.MouseDown = function(x, y) {
    this.origin = {x: x, y: y};
    this.isMouseDown = true;
    var that = this;
    setTimeout(function() {
		that.RunAdding();
	}, 500);
}
PencilState.prototype.MouseMove = function(x, y) {
    if (!this.isMouseDown)
        return;
    var line = new LineModel(this.origin.x, this.origin.y, x, y);
    line.hexColor = this.mediator.activeColor;
    this.helperLines.push(line);
    this.origin = {x: x, y: y};
    
    this.mediator.trueModel.sheets[0].Notify();
}
PencilState.prototype.MouseUp = function(x, y) {
    if (this.helperLines.length > 0) {
        this.isMouseDown = false;
        this.origin = null;
        var that = this;
		var length = this.helperLines.length;
		this.mediator.trueModel.AddLines(this.mediator.model, this.helperLines, function() {
			that.helperLines.splice(0, length);
		});
    }
}
PencilState.prototype.Draw = function(context) {
    for (i in this.helperLines) {
        drawLine(context, this.helperLines[i]);
    }
}
PencilState.prototype.RunAdding = function() {
	if (!this.isMouseDown)
		return;
	var that = this;
	var length = this.helperLines.length;
	this.mediator.trueModel.AddLines(this.mediator.model, this.helperLines, function() {
		that.helperLines.splice(0, length);
	});
	setTimeout(function() {
		that.RunAdding();
	}, 500);
}

implements(PencilState, IDrawingState);
