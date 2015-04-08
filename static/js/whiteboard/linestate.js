function LineState(mediator) {
    this.name = 'lineState';
    this.origin = null;
    this.mediator = mediator;
    this.helperLine = null;
}
LineState.prototype.mediator = null;
LineState.prototype.MouseDown = function(x, y) {
    this.origin = {x: x, y: y};
}
LineState.prototype.MouseMove = function(x, y) {
    if (this.origin == null)
        return;
    if (this.helperLine == null) {
        var line = new LineModel(this.origin.x, this.origin.y, x, y);
        line.hexColor = this.mediator.activeColor;
        this.helperLine = line;
    }
    else {
        this.helperLine.origin = this.origin;
        this.helperLine.destination = {x: x, y: y};
    }
    
    this.mediator.trueModel.sheets[0].Notify();
}
LineState.prototype.MouseUp = function(x, y) {
    this.origin = null;
    if (this.helperLine != null) {
        var that = this;
        this.mediator.trueModel.AddLines(this.mediator.model, [this.helperLine], function() {
			that.helperLine = null;
			that.mediator.trueModel.sheets[0].Notify();
		});
    }
}

LineState.prototype.Draw = function(context) {
    if (this.helperLine != null) {
        drawLine(context, this.helperLine);
    }
}

implements(LineState, IDrawingState);
