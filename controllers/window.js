var args = arguments[0] || {},
    useImages = false,
    cancelable = false,

    // Bug: https://jira.appcelerator.org/browse/TC-2857
    isOpen = false;

init();

function init() {

    if ($.loadingMask.images) {
        useImages = true;

        $.loadingInner.remove($.loadingIndicator);
        $.loadingIndicator = null;

    } else {
        $.loadingInner.remove($.loadingImages);
        $.loadingImages = null;
    }

    if (OS_ANDROID) {
        $.loadingMask.addEventListener('androidback', cancel);
    }

    update(args.message, args.cancelable);

    // Bug: https://jira.appcelerator.org/browse/TC-2857
    if (OS_ANDROID) {
        $.loadingMask.addEventListener('open', function(e) {
            isOpen = true;
        });
    }

    args = null;
}

function update(_message, _cancelable) {
    $.loadingMessage.text = _message || L('loadingMessage', 'Loading...');
    cancelable = _cancelable;
}

function cancel(e) {

    if (!cancelable) {

        if (OS_ANDROID && e.type === 'androidback') {
            var intent = Ti.Android.createIntent({
                action: Ti.Android.ACTION_MAIN
            });
            intent.addCategory(Ti.Android.CATEGORY_HOME);
            Ti.Android.currentActivity.startActivity(intent);
        }

        return;
    }

    close();

    if (_.isFunction(cancelable)) {
        cancelable();
    }

    return;
}

function open() {
    Ti.API.debug('window open ' + $.loadingMask.n);

    $.loadingMask.open();

    if (useImages) {
        $.loadingImages.start();
    } else {
        $.loadingIndicator.show();
    }
}

function close() {

    if (!OS_ANDROID || isOpen) {
        _close();

    // Bug: https://jira.appcelerator.org/browse/TC-2857
    } else {
        var interval = setInterval(function () {
            if (isOpen) {
                _close();
                clearInterval(interval);
            }
        }, 100);
    }
}

function _close() {

    $.loadingMask.close();

    if (useImages) {
        $.loadingImages.stop();
    } else {
        $.loadingIndicator.hide();
    }

    cancelable = null;
}

function onFocus(e) {
    $.hasFocus = true;
}

function onBlur(e) {
    $.hasFocus = false;
}

exports.hasFocus = true;
exports.open = open;
exports.update = update;
exports.close = close;