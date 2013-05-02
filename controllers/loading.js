var args = arguments[0] || {},
    hasMessage = true;

function show(_message, _blocking) {
    
    if (typeof _message !== 'undefined') {
        setMessage(_message);
    }
    
    if (typeof _blocking !== 'undefined') {
        setBlocking(_blocking);
    }

    $.loadingMask.open();
    
    return;
}

function hide() {
    $.loadingMask.close();
    
    return;
}

function cancel() {
    
    if (args.blocking === false) {
        hide();
        
        $.trigger('cancel');
    }
    
    return;
}

function setMessage(_message) {
    
    if (_message === false) {
        
        if (hasMessage) {
            $.loadingInner.remove($.loadingMessage);
            hasMessage = false;
        }
               
    } else {
        
        if (_message !== true) {
            $.loadingMessage.text = _message;
        }
        
        if (!hasMessage) {
            $.loadingInner.add($.loadingMessage);
            hasMessage = true;
        }
    }
    
    return;
}

function setBlocking(_blocking) {
    args.blocking = (_blocking !== false);
}

$.loadingMask.addEventListener('open', function () {
    $.loadingSpinner.show();
    
    return;
});

$.loadingMask.addEventListener('close', function () {
    $.loadingSpinner.hide();
    
    return;
});

if (OS_ANDROID) {
    $.loadingMask.navBarHidden = $.loadingMask.navBarHidden || false;
    $.loadingMask.addEventListener('androidback', function () {
        
        if (!args.blocking) {
            cancel();
        }
        
        return;
    });
}

show(args.message, args.blocking);

exports.show = show;
exports.hide = hide;

exports.setMessage = setMessage;
exports.setBlocking = setBlocking;