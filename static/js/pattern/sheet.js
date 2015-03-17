Sheet.prototype = new Subject();
Sheet.prototype.constructor = Sheet;
function Sheet(trueModel) {
    this.lines = new Array();
    this.helperLine = null;
    this.trueModel = trueModel;
}
Sheet.prototype.Draw = function(context) {
    for (i in this.lines) {
        if (typeof(this.lines[i]) == 'object')
            this.DrawLine(context, this.lines[i]);
    }
    if (this.helperLine != null) {
        this.DrawLine(context, this.helperLine);
    }
}
Sheet.prototype.DrawLine = function(context, line) {
    context.beginPath();
    context.moveTo(line.origin.x, line.origin.y);
    context.lineTo(line.destination.x, line.destination.y);
    context.strokeStyle = line.hexColor;
    context.stroke();
}