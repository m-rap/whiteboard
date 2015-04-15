function Client(id, color) {
	this.style = null;
	this.id = id;
	this.color = color;
	this.CreateClass();
}
Client.prototype.CreateClass = function() {
	this.style = document.createElement("style");
	this.style.type = "text/css";
	this.style.innerHTML = ".client" + this.id + " { color: " + this.color + "; }";
	document.body.appendChild(this.style);
}
Client.prototype.CreateMsg = function(msg) {
	return $('<li class="client' + this.id + '">').text(msg);
}
Client.prototype.CreateLabel = function(current) {
	if (current)
		return $('<li class="client' + this.id + '">').text('client ' + this.id + ' (you)');
	else
		return $('<li class="client' + this.id + '">').text('client ' + this.id);
}
Client.prototype.Dispose = function() {
	document.body.removeChild(this.style);
}
