function PencilState(mediator) {
    this.name = 'pencilState';
    this.origin = null;
    this.isMouseDown = false;
    this.mediator = mediator;
    this.notified = true;
}
PencilState.prototype.mediator = null;
PencilState.prototype.MouseDown = function(x, y) {
    this.origin = {x: x, y: y};
    this.isMouseDown = true;
    this.mediator.trueModel.StopAutoUpdate();
}
PencilState.prototype.MouseMove = function(x, y) {
    if (!this.isMouseDown)
        return;
    var line = new LineModel(this.origin.x, this.origin.y, x, y);
    line.hexColor = this.mediator.activeColor;
    this.mediator.trueModel.AddLine(this.mediator.model, line);
    this.origin = {x: x, y: y};
    if (this.notified) {
        this.notified = false;
        var that = this;
        setTimeout(function() {
            if (that.isMouseDown) {
                that.mediator.model.trueModel.Save();
            }
            that.notified = true;
        }, 500);
    }
}
PencilState.prototype.MouseUp = function(x, y) {
    this.origin = null;
    this.isMouseDown = false;
    this.mediator.model.Notify();
    this.mediator.model.trueModel.Save();
    this.mediator.trueModel.StartAutoUpdate();
    this.notified = true;
}

implements(PencilState, IDrawingState);