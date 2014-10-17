var ctrl;
var showTimeout;

function show(_message, _cancelable, _delay) {

    if (ctrl && ctrl.hasFocus) {
        ctrl.update(_message, _cancelable);
        return;
    }
    
    if (_delay) {
        if (!showTimeout) {
            showTimeout = setTimeout(function () {
                show(_message, _cancelable);
            }, _delay);
        }
        return;
    }
    
    if (showTimeout) {
        clearTimeout(showTimeout);
        showTimeout = null;
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
    if (showTimeout) {
        clearTimeout(showTimeout);
        showTimeout = null;
    }
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
