var filter = new Array();
filter[0] = 'sheets';
function TrueModel() {
    this.version = 0;
    this.sheets = [new Sheet(this, 0)];
    this.saveUrl = null;
    this.loadUrl = null;
    this.roomName = null;
    this.autoUpdateStarted = false;
    this.socketIO = null;
    this.ready = false;
    
    this.clients = new Array();
    this.currentClient = null;
    this.msgContainer = document.getElementById('messages-container');
    
    this.focused = true;
    this.connecting = false;
    
    var that = this;
	window.onblur = function() {
		that.focused = false;
	}
    window.onfocus = function() {
		that.focused = true;
		document.title = 'Whiteboard';
	}
    $('#chatform').submit(function(event){
		event.preventDefault();
		var msg = $('#m').val();
		that.socketIO.emit('chat message', {id: that.currentClient.id, msg: msg});
		var li = that.currentClient.CreateMsg(msg);
		$('#messages').append(li);
		that.msgContainer.scrollTop = that.msgContainer.scrollHeight;
		$('#m').val('');
		return false;
	});
}
TrueModel.prototype.Sync = function(data) {
	if (data != null && typeof(data.sheets) != 'undefined' && data.sheets != null && data.sheets instanceof Array && data.version > this.version) {
		for (i in data.sheets) {
			for (j in data.sheets[i].lines) {
				this.sheets[i].newLines.push(data.sheets[i].lines[j]);
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
    var that = this;
    if (this.socketIO != null) {
		this.socketIO.emit('submit', {room: this.roomName, data: data});
		
		this.socketIO.removeListener('submitSuccess');
		this.socketIO.on('submitSuccess', function() {
			if (typeof(onComplete) == 'function')
				onComplete();
		});
	} else {
		var jsonString = JSON.stringify(data);
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
TrueModel.prototype.StartSocketIO = function() {
	this.connecting = true;
	var url = 'http://whiteboard-backend-nodejs-m-rap.c9.io/';
	this.socketIO = io.connect(url);
	
	var that = this;
	
	var intervalID = null;
	var tryReconnect = function(){
		if (!that.socketIO.connected && !that.connecting) {
			// use a connect() or reconnect() here if you want
			//clearInterval(intervalID);
			that.currentClient = null;
			that.clients = new Array();
			that.socketIO.connect();
			return;
	   }
	}
	
	intervalID = setInterval(tryReconnect, 2000);
	
	this.socketIO.on('connect', function() {
		//clearInterval(intervalID);
		that.connecting = false;
		that.socketIO.emit('start', {room: that.roomName});
	});
	this.socketIO.on('start', function(data) {
		var id = data.clientInfo.id;
		var color = data.clientInfo.color;
		for (var i in that.clients) {
			if (that.clients[i].id == id) {
				that.clients[i].Dispose();
				that.clients.splice(i, 1);
			}
		}
		that.currentClient = new Client(id, color);
		if (data.clients instanceof Array) {
			for (var i in data.clients) {
				that.clients.push(new Client(data.clients[i].id, data.clients[i].color));
			}
		}
		
		that.socketIO.emit('load', {room: that.roomName, version: that.version});
	});
	this.socketIO.on('load', function(data) {
		if (!that.focused)
			document.title = '(1) Whiteboard';
		if (data.version < data.lastVersion)
			that.socketIO.emit('load', {room: that.roomName, version: data.version});
		else
			that.ready = true;
		that.Sync(data);
	});
	
	this.socketIO.on('new client', function(data) {
		if (data.id != that.currentClient.id) {
			var id = data.id;
			var color = data.color;
			that.clients.push(new Client(id, color));
		}
	});
	this.socketIO.on('client disconnected', function(id) {
		for (var i in that.clients) {
			if (that.clients[i].id == id) {
				that.clients[i].Dispose();
				that.clients.splice(i, 1);
				break;
			}
		}
	});
	this.socketIO.on('chat message', function(data){
		var id = data.id;
		var msg = data.msg;
		var client = null;
		for (var i in that.clients) {
			if (that.clients[i].id == id) {
				client = that.clients[i];
				var li = client.CreateMsg(msg);
				$('#messages').append(li);
				that.msgContainer.scrollTop = that.msgContainer.scrollHeight;
				if (!that.focused)
					document.title = '(1) Whiteboard';
				break;
			}
		}
	});
}
