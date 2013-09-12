var args = arguments[0] || {},
    ctrl;

function show(_message, _cancelable) {

    if (ctrl && ctrl.hasFocus) {
        ctrl.update(_message, _cancelable);
        return;
    }

    var newCtrl = Widget.createController('window', {
        message: _message,
        cancelable: _cancelable
    });

    newCtrl.open();

    if (ctrl) {
        hide();
    }

    ctrl = newCtrl;
}

function hide() {
    
    if (ctrl) {
        ctrl.close();
        ctrl = null;
    }

    return;
}

Object.defineProperty($, "visible", {
    get: function () {
        return (ctrl && ctrl.hasFocus);
    },
    set: function (visible) {
        return visible ? show() : hide();
    }
});

exports.show = show;
exports.hide = hide;