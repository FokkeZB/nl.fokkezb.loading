$.show = show;
$.update = update;
$.hide = hide;

Object.defineProperty($, 'visible', {
    get: function() {
        return hasFocus;
    },
    set: function(visible) {
        return visible ? show() : hide();
    }
});

var cancelable = null;
var hasFocus = false;

function update(_message, _cancelable) {
    cancelable = _cancelable;

    $.progressIndicator.applyProperties({
        message: _message || L('loadingMessage', 'Loading...'),
        cancelable: _.isFunction(cancelable)
    });
}

function onCancel(e) {
    cancelable();

    cancelable = null;
}

function show(_message, _cancelable) {

    update(_message, _cancelable);

    $.progressIndicator.show();

    hasFocus = true;
}

function hide() {
    $.progressIndicator.hide();

    hasFocus = false;

    cancelable = null;
}