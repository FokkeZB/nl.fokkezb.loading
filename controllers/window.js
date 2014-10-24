var args = arguments[0] || {},
    useImages = false,
    cancelable = null,

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

    if (OS_ANDROID) {

        $.loadingMask.addEventListener('open', function(e) {

            // http://www.appcelerator.com/blog/2014/08/hiding-the-android-actionbar/
            // $.loadingMask.activity.actionBar.hide();

            // Bug: https://jira.appcelerator.org/browse/TC-2857
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

    if (!_.isFunction(cancelable)) {

        if (OS_ANDROID && e.type === 'androidback') {
            var intent = Ti.Android.createIntent({
                action: Ti.Android.ACTION_MAIN
            });
            intent.addCategory(Ti.Android.CATEGORY_HOME);
            Ti.Android.currentActivity.startActivity(intent);
        }

        return;
        
    } else {
        cancelable();
    }

    close();

    return;
}

function open() {

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
