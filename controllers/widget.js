var ctrl;

function show(_message, _cancelable) {

    if (ctrl && ctrl.hasFocus) {
        ctrl.update(_message, _cancelable);
        return;
    }

    var newCtrl = Widget.createController((OS_ANDROID && $.progress) ? 'progress' : 'window');

    newCtrl.show(_message, _cancelable);

    if (ctrl) {
        hide();
    }

    ctrl = newCtrl;
}

function hide() {

    if (ctrl) {
        ctrl.hide();
        ctrl = null;
    }

    return;
}

Object.defineProperty($, 'visible', {
    get: function() {
        return (ctrl && ctrl.hasFocus);
    },
    set: function(visible) {
        return visible ? show() : hide();
    }
});

$.show = show;
$.hide = hide;

$.progress = true;