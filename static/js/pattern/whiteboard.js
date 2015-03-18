function WhiteBoard(id) {
    this.id = id;
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
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
    this.canvas.addEventListener('mousemove', function(e) {
        that.OnMouseMove(e, that.canvas);
    });
    document.addEventListener('mouseup', function(e) {
        that.OnMouseUp(e, that.canvas);
    });
}
WhiteBoard.prototype.OnMouseDown = function(e, elem) {
    var mousePos = getMousePos(e, elem);
    this.currentState.MouseDown(mousePos.x, mousePos.y);
}
WhiteBoard.prototype.OnMouseMove = function(e, elem) {
    var mousePos = getMousePos(e, elem);
    this.currentState.MouseMove(mousePos.x, mousePos.y);
}
WhiteBoard.prototype.OnMouseUp = function(e, elem) {
    var mousePos = getMousePos(e, elem);
    this.currentState.MouseUp(mousePos.x, mousePos.y);
}
WhiteBoard.prototype.OnPaint = function() {
    this.model.Draw(this.context);
    this.currentState.Draw(this.context);
}
WhiteBoard.prototype.Refresh = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.OnPaint();
}
WhiteBoard.prototype.UpdateModel = function() {
    this.Refresh();
}

implements(WhiteBoard, IObserver);