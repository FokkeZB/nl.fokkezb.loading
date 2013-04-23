var args = arguments[0] || {},
    hasMessage = true,
    isBlocking = true,
    parent;

function show(_message, _blocking) {
    
    if (typeof _message !== 'undefined') {
        setMessage(_message);
    }
    
    if (typeof _blocking !== 'undefined') {
        setBlocking(_blocking);
    }
    
    $.loadingMask.show();
    $.loadingSpinner.show();
}

function hide() {
    $.loadingSpinner.hide();
    $.loadingMask.hide();
    
    if (parent) {
        parent.remove($.loadingMask);
    }
}

function cancel() {
    
    if (!isBlocking) {
        hide();
        $.trigger('cancel');
    }
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
}

function setBlocking(_blocking) {
    isBlocking = _blocking;
}

if (typeof args.message !== 'undefined') {
    setMessage(args.message);
}

if (typeof args.blocking !== 'undefined') {
    setBlocking(args.blocking);
}

if (args.show) {
    show();
}

exports.show = show;
exports.hide = hide;

exports.setMessage = setMessage;
exports.setBlocking = setBlocking;