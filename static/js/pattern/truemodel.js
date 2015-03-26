var filter = new Array();
filter[0] = 'sheets';
function TrueModel() {
    this.version = 0;
    this.sheets = [new Sheet(this, 0)];
    this.saveUrl = null;
    this.loadUrl = null;
    this.roomName = null;
    this.autoUpdateStarted = false;
}
TrueModel.prototype.Sync = function(data) {
	if (data != null && typeof(data.sheets) != 'undefined' && data.sheets != null && data.sheets instanceof Array) {
		for (i in data.sheets) {
			for (j in data.sheets[i].lines) {
				this.sheets[i].lines.push(data.sheets[i].lines[j]);
			}
			this.sheets[i].Notify();
		}
		this.version = data.version;
	}
}
TrueModel.prototype.AddLines = function(sheet, lines, onComplete) {
    var data = {sheets:[new Sheet(null, sheet.id)]};
    for (i in lines)
        data.sheets[0].lines.push(lines[i]);
    var jsonString = JSON.stringify(data);
    var that = this;
    $.post(that.saveUrl, JSON.parse(jsonString), function(version) {
        that.StopAutoUpdate();
        data.version = version;
        that.Sync(data);
        that.Load((typeof(onComplete) == 'function') ? onComplete() : function() {});
        setTimeout(function() {
            that.StartAutoUpdate();
        }, 500);
    });
}
TrueModel.prototype.Load = function(onComplete) {
    var that = this;
    $.get(this.loadUrl + '/' + this.version, function(data) {
        that.Sync(data);
        if (typeof(onComplete) == 'function') onComplete();
    }, 'json');
}
TrueModel.prototype.StartAutoUpdate = function() {
    this.autoUpdateStarted = true;
    this.autoUpdate();
}
TrueModel.prototype.StopAutoUpdate = function() {
    this.autoUpdateStarted = false;
}
TrueModel.prototype.autoUpdate = function() {
    if (!this.autoUpdateStarted) return;
    var that = this;
    this.Load(function() {
        setTimeout(function() {
            that.autoUpdate();
        }, 500);
    });
}
