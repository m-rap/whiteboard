var filter = new Array();
filter[0] = 'sheets';
function TrueModel() {
    this.version = 0;
    this.sheets = [new Sheet(this)];
    this.saveUrl = null;
    this.loadUrl = null;
    this.roomName = null;
    this.autoUpdateStarted = false;
}
TrueModel.prototype.AddLine = function(sheet, line) {
    sheet.lines.push(line);
    sheet.Notify();
}
TrueModel.prototype.Save = function() {
    var that = this;
    var data = {sheets: new Array()};
    for (i in this.sheets) {
        data.sheets[i] = {lines: that.sheets[i].lines};
    }
    this.Load(function() {
        for (i in that.sheets) {
            for (j in data.sheets[i].lines) {
                var exists = false;
                if (typeof(that.sheets[i]) == "undefined")
                    return;
                for (k in that.sheets[i].lines) {
                    if (equals(data.sheets[i].lines[j], that.sheets[i].lines[k]))
                        exists = true;
                }
                if (!exists) {
                    that.sheets[i].lines.push(data.sheets[i].lines[j]);
                    that.sheets[i].Notify();
                }
            }
        }
        var jsonString = JSON.stringify(data);
        $.post(that.saveUrl, JSON.parse(jsonString), function(version) {
            that.version = version;
            for (i in that.sheets) {
                that.sheets[i].Notify();
            }
        });
    });
}
TrueModel.prototype.Load = function(onComplete) {
    var that = this;
    $.get(this.loadUrl + '/' + this.version, function(data) {
        if (data != null && typeof(data.sheets) != 'undefined' && data.sheets != null && data.sheets instanceof Array) {
            for (i in data.sheets) {
                for (j in data.sheets[i].lines) {
                    that.sheets[i].lines = data.sheets[i].lines;
                }
                that.sheets[i].Notify();
            }
            that.version = data.version;
        }
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