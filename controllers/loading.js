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
    $.loadingSpinner.show();
    
    return;
}

function hide() {
	$.loadingSpinner.hide();
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