var args = arguments[0] || {},
    controller;

function show(_message, _blocking) {
    
    if (typeof _message !== 'undefined') {
        setMessage(_message);
    }
    
    if (typeof _blocking !== 'undefined') {
        setBlocking(_blocking);
    }
    
    if (!controller) {
        controller = Widget.createController('loading', args);
        
        controller.on('cancel', function () {
            $.trigger('cancel');
        });
        
    } else {
        controller.show();
    }
    
    return;
}

function hide() {
    
    if (controller) {
        controller.hide();
    }
    
    return;
}

function setMessage(_message) {
    args.message = _message;
    
    if (controller) {
        controller.setMessage(args.message);        
    }
    
    return;
}

function setBlocking(_blocking) {
    args.blocking = _blocking;
    
    if (controller) {
        controller.setBlocking(args.blocking);
    }
    
    return;
}

if (args.show) {
    show();
}

exports.show = show;
exports.hide = hide;

exports.setMessage = setMessage;
exports.setBlocking = setBlocking;