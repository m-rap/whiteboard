Sheet.prototype = new Subject();
Sheet.prototype.constructor = Sheet;
function Sheet(trueModel, id) {
    this.id = id;
    this.lines = new Array();
    this.trueModel = trueModel;
}
Sheet.prototype.Draw = function(context) {
    for (i in this.lines) {
        if (typeof(this.lines[i]) == 'object')
            drawLine(context, this.lines[i]);
    }
}
function drawLine(context, line) {
    context.beginPath();
    context.moveTo(line.origin.x, line.origin.y);
    context.lineTo(line.destination.x, line.destination.y);
    context.strokeStyle = line.hexColor;
    context.stroke();
}