Sheet.prototype = new Subject();
Sheet.prototype.constructor = Sheet;
function Sheet(trueModel, id) {
    this.id = id;
    this.lines = new Array();
    this.newLines = new Array();
    this.trueModel = trueModel;
}
Sheet.prototype.Draw = function(context) {
    for (i in this.lines) {
        if (typeof(this.lines[i]) == 'object')
            drawLine(context, this.lines[i]);
    }
}
Sheet.prototype.DrawNewLines = function(context) {
	if (this.newLines.length == 0)
		return;
	
	var tempLines = this.newLines.slice(0);
	this.newLines = new Array();
	
	for (var i in tempLines) {
		if (typeof(tempLines[i]) == 'object') {
            drawLine(context, tempLines[i]);
            this.lines.push(tempLines[i]);
		}
	}
}
function drawLine(context, line) {
    context.beginPath();
    context.moveTo(line.origin.x, line.origin.y);
    context.lineTo(line.destination.x, line.destination.y);
    context.strokeStyle = line.hexColor;
    context.stroke();
}
