function LineState(mediator) {
    this.name = 'lineState';
    this.origin = null;
    this.mediator = mediator;
    this.notified = true;
}
LineState.prototype.mediator = null;
LineState.prototype.MouseDown = function(x, y) {
    this.origin = {x: x, y: y};
}
LineState.prototype.MouseMove = function(x, y) {
    if (this.origin == null)
        return;
    if (this.mediator.model.helperLine == null) {
        var line = new LineModel(this.origin.x, this.origin.y, x, y);
        line.hexColor = this.mediator.activeColor;
        this.mediator.model.helperLine = line;
    }
    else {
        this.mediator.model.helperLine.origin = this.origin;
        this.mediator.model.helperLine.destination = {x: x, y: y};
    }
    this.mediator.model.Notify();
}
LineState.prototype.MouseUp = function(x, y) {
    this.origin = null;
    if (this.mediator.model.helperLine != null) {
        this.mediator.trueModel.AddLine(this.mediator.model, this.mediator.model.helperLine);
        this.mediator.model.helperLine = null;
        this.mediator.model.trueModel.Save();
        this.notified = true;
    }
}
LineState.prototype.Notify = function() {
    var that = this;
    that.mediator.model.Notify();
    if (this.notified) {
        this.notified = false;
        setTimeout(function() {
            that.mediator.model.trueModel.Save();
            that.notified = true;
        }, 500);
    }
}

implements(LineState, IDrawingState);