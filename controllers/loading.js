var args = arguments[0] || {},
    hasMessage = true,
    hasImages = false,
    defaultImages,
    isShowing = false;

function show(_message, _blocking) {

    if (typeof _message !== 'undefined') {
        setMessage(_message);
    }

    if (typeof _blocking !== 'undefined') {
        setBlocking(_blocking);
    }

    if (isShowing) {
        return;
    }

    if (OS_ANDROID) {
        $.loadingProgressIndicator.show();

    } else {
        $.loadingMask.open();

        hasImages ? $.loadingImages.start() : $.loadingIndicator.show();
    }

    isShowing = true;

    return;
}

function hide() {

    if (!isShowing) {
        return;
    }

    if (OS_ANDROID) {
        $.loadingProgressIndicator.hide();

    } else {
        hasImages ? $.loadingImages.stop() : $.loadingIndicator.hide();

        $.loadingMask.close();
    }

    isShowing = false;

    return;
}

function getVisible() {
    return isShowing;
}

function cancel() {

    if (args.blocking === false) {

        if (!OS_ANDROID) {
            hide();
        }

        $.trigger('cancel');
    }

    return;
}

function setMessage(_message) {

    if (_message === false) {

        if (hasMessage) {
            
            if (OS_ANDROID) {
                $.loadingProgressIndicator.message = null;
            } else {
                $.loadingInner.remove($.loadingMessage);
            }

            hasMessage = false;
        }

    } else {
        var message = (_message === true) ? L('loadingMessage', 'Loading..') : _message;

        if (OS_ANDROID) {
            $.loadingProgressIndicator.message = message;
        } else {
            $.loadingMessage.text = message;
        }

        if (!hasMessage) {
            OS_ANDROID || $.loadingInner.add($.loadingMessage);
            
            hasMessage = true;
        }
    }

    return;
}

function setBlocking(_blocking) {
    args.blocking = (_blocking !== false);

    if (OS_ANDROID) {
        $.loadingProgressIndicator.cancelable = !args.blocking;
    }
}

function setImages(_images) {

    if (OS_ANDROID) {
        Ti.API.info('[LOADING] No image indicator on Android');
        return;
    }

    var _newImages = _.isArray(_images);

    if (_images === true || _newImages) {

        if (_newImages) {

            if (!defaultImages) {
                defaultImages = $.loadingImages.images;
            }

            $.loadingImages.images = _images;

        } else if (defaultImages) {
            $.loadingImages.images = defaultImages;
        }

        if (!hasImages) {
            isShowing && $.loadingIndicator.hide();
            $.loadingSpinner.remove($.loadingIndicator);

            $.loadingSpinner.add($.loadingImages);
            isShowing && $.loadingImages.start();
        }

        hasImages = true;

    } else if (_images === false && hasImages) {
        isShowing && $.loadingImages.stop();
        $.loadingSpinner.remove($.loadingImages);

        $.loadingSpinner.add($.loadingIndicator);
        isShowing && $.loadingIndicator.show();

        hasImages = false;
    }

    return;
}

if (!OS_ANDROID) {
    setImages(args.images);
}

show(args.message, args.blocking);

exports.show = show;
exports.hide = hide;

exports.getVisible = getVisible;

exports.setMessage = setMessage;
exports.setBlocking = setBlocking;
exports.setImages = setImages;