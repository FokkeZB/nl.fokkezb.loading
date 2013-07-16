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
	
	$.loadingMask.open();

	hasImages ? $.loadingImages.start() : $.loadingIndicator.show();

	isShowing = true;
    
    return;
}

function hide() {
	
	if (!isShowing) {
		return;
	}
	
	hasImages ? $.loadingImages.stop() : $.loadingIndicator.hide();
	
    $.loadingMask.close();
    
    isShowing = false;
    
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
        $.loadingMessage.text = (_message === true) ? L('loadingMessage', 'Loading..') : _message;
        
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

function setImages(_images) {
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

if (OS_ANDROID) {
    $.loadingMask.navBarHidden = $.loadingMask.navBarHidden || false;
    $.loadingMask.addEventListener('androidback', function () {
        
        if (!args.blocking) {
            cancel();
        }
        
        return;
    });
}

setImages(args.images);

show(args.message, args.blocking);

exports.show = show;
exports.hide = hide;

exports.setMessage = setMessage;
exports.setBlocking = setBlocking;
exports.setImages = setImages;