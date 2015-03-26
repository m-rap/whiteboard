function Subject() {
    this.observers = new Array();
}
Subject.prototype.Attach = function(observer) {
    this.observers.push(observer);
}
Subject.prototype.Detach = function(observer) {
    for (i in this.observers)
        if (this.observers[i] == observer)
            this.observers.splice(i, 1);
}
Subject.prototype.Notify = function() {
    for (i in this.observers)
        this.observers[i].UpdateModel();
}