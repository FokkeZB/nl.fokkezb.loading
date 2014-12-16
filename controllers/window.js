$.update = update;
$.show = show;
$.hide = hide;

Object.defineProperty($, 'visible', {
    get: function() {
        return (isOpen && hasFocus);
    },
    set: function(visible) {
        return visible ? show() : hide();
    }
});

var cancelable;

// Bug: https://jira.appcelerator.org/browse/TC-2857
var isOpen = false;

var hasFocus = false;

(function constructor(args) {

    if (OS_ANDROID) {
        $.win.addEventListener('androidback', function onAndroidback() {

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
                $.view.cancel();
            }
        });
    }

    if (OS_ANDROID) {

        $.win.addEventListener('open', function onOpen(e) {

            // Bug: https://jira.appcelerator.org/browse/TC-2857
            isOpen = true;
        });
    }

    args = null;

})(arguments[0] || {});

function update(_message, _cancelable) {
    $.view.update(_message, _cancelable);

    cancelable = _cancelable;
}

function show(_message, _cancelable) {
    $.view.show(_message, _cancelable);
    
    $.win.open();
}

function hide() {

    var close = function close() {
        $.view.hide();
        $.win.close();

        cancelable = null;
    };

    if (!OS_ANDROID || isOpen) {
        close();

        // Bug: https://jira.appcelerator.org/browse/TC-2857
    } else {
        var interval = setInterval(function atInterval() {
            if (isOpen) {
                close();
                clearInterval(interval);
            }
        }, 100);
    }
}

function onFocus(e) {
    hasFocus = true;
}

function onBlur(e) {
    hasFocus = false;
}