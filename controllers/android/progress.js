var cancelable = null;

(function constructor(args) {

    update(args.message, args.cancelable);

})(arguments[0] || {});

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

function open() {
    $.progressIndicator.show();

    exports.hasFocus = true;
}

function close() {
    $.progressIndicator.hide();

    exports.hasFocus = false;

    cancelable = null;
}

exports.hasFocus = false;
exports.open = open;
exports.update = update;
exports.close = close;