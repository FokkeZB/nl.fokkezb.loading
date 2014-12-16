var useImages = false,
    cancelable = null;

$.show = show;
$.hide = hide;
$.update = update;
$.cancel = cancel;

Object.defineProperty($, 'visible', {
    get: function() {
        return $.loadingMask.visible;
    },
    set: function(visible) {
        return visible ? show() : hide();
    }
});

(function constructor(args) {

    if ($.loadingMask.images) {
        useImages = true;

        $.loadingInner.remove($.loadingIndicator);
        $.loadingIndicator = null;

    } else {
        $.loadingInner.remove($.loadingImages);
        $.loadingImages = null;
    }

    args = null;

})(arguments[0] || {});

function update(_message, _cancelable) {
    $.loadingMessage.text = _message || L('loadingMessage', 'Loading...');
    cancelable = _cancelable;
}

function cancel() {

    if (_.isFunction(cancelable)) {
        cancelable();

        $.trigger('cancel');

        hide();
    }
}

function show(_message, _cancelable) {
    update(_message, _cancelable);

    $.loadingMask.show();

    if (useImages) {
        $.loadingImages.start();
    } else {
        $.loadingIndicator.show();
    }
}

function hide() {
    $.loadingMask.hide();
}