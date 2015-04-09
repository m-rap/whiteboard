function WhiteBoard(mainId, helperId) {
    this.mainId = mainId;
    this.helperId = helperId;
    this.canvas = document.getElementById(mainId);
    this.helperCanvas = document.getElementById(helperId);
    this.context = this.canvas.getContext('2d');
    this.helperContext = this.helperCanvas.getContext('2d');
    this.stateManager = {
        lineState: new LineState(this),
        pencilState: new PencilState(this)
    };
    this.currentState = this.stateManager.lineState;
    this.activeColor = '#000';
    
    this.model = null;
    this.trueModel = null;
    
    var that = this;
    
    this.canvas.addEventListener('mousedown', function(e) {
        that.OnMouseDown(e, that.canvas);
    });
    this.helperCanvas.addEventListener('mousedown', function(e) {
        that.OnMouseDown(e, that.helperCanvas);
    });
    
    this.canvas.addEventListener('mousemove', function(e) {
        that.OnMouseMove(e, that.canvas);
    });
    this.helperCanvas.addEventListener('mousemove', function(e) {
        that.OnMouseMove(e, that.helperCanvas);
    });
    
    document.addEventListener('mouseup', function(e) {
        that.OnMouseUp(e, that.helperCanvas);
    });
}
WhiteBoard.prototype.OnMouseDown = function(e, elem) {
	if (!this.trueModel.ready)
		return;
    var mousePos = getMousePos(e, elem);
    this.currentState.MouseDown(mousePos.x, mousePos.y);
}
WhiteBoard.prototype.OnMouseMove = function(e, elem) {
    if (!this.trueModel.ready)
		return;
    var mousePos = getMousePos(e, elem);
    this.currentState.MouseMove(mousePos.x, mousePos.y);
}
WhiteBoard.prototype.OnMouseUp = function(e, elem) {
    if (!this.trueModel.ready)
		return;
    var mousePos = getMousePos(e, elem);
    this.currentState.MouseUp(mousePos.x, mousePos.y);
}
WhiteBoard.prototype.Refresh = function() {
	this.model.DrawNewLines(this.context);
	
    this.helperContext.clearRect(0, 0, this.helperCanvas.width, this.helperCanvas.height);
    this.currentState.Draw(this.helperContext);
}
WhiteBoard.prototype.UpdateModel = function() {
    this.Refresh();
}

implements(WhiteBoard, IObserver);
