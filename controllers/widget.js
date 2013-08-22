var args = arguments[0] || {},
    win;

if (args.show) {
    show();
}

function show(_message, _blocking) {
    
    if (typeof _message !== 'undefined') {
        setMessage(_message);
    }
    
    if (typeof _blocking !== 'undefined') {
        setBlocking(_blocking);
    }
    
    if (!win) {
        win = Widget.createController('window', args);
            
        win.on('cancel', onCancel);
    }
    
    return;
}

function hide() {
    
    if (win) {
        win.off('cancel', onCancel);

        win.hide();

        win = null;
    }
    
    return;
}

function onCancel() {
    $.trigger('cancel');
}

function setMessage(_message) {
    args.message = _message;
    
    if (win) {
        win.setMessage(args.message);
    }
    
    return;
}

function setBlocking(_blocking) {
    args.blocking = _blocking;
    
    if (win) {
        win.setBlocking(args.blocking);
    }
    
    return;
}

function setImages(_images) {
	args.images = _images;

	if (win) {
		win.setImages(args.images);
	}
	
	return;
}

Object.defineProperty($, "visible", {
    get: function () {
        return !!win;
    },
    set: function (visible) {
        return visible ? show() : hide();
    }
});

exports.show = show;
exports.hide = hide;
exports.setMessage = setMessage;
exports.setBlocking = setBlocking;
exports.setImages = setImages;