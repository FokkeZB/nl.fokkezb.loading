$.index.open();

var onOpen = function() {
    // so we can see if the actionBar of the widget is properly hidden
    return OS_ANDROID && $.index.activity.actionBar.hide();
};

var global = function() {
    Alloy.Globals.loading.show('Loading README example', function onCancel() {
        alert('Canceled README example');
    });

    setTimeout(function() {
        Alloy.Globals.loading.hide();
    }, 6000);
};

var view = function() {
    $.view.show('Loading VIEW example', function onCancel() {
        alert('Canceled VIEW example');
    });

    setTimeout(function() {
        $.view.hide();
    }, 6000);
};

var progress = function() {
    var progress = Alloy.createWidget('nl.fokkezb.loading', 'progress');

    progress.show('Loading VIEW example', function onCancel() {
        alert('Canceled VIEW example');
    });

    setTimeout(function() {
        progress.hide();
    }, 6000);
};

var success = function() {
    $.view.success('Loading SUCCESS example');

    setTimeout(function() {
        $.view.hide();
    }, 6000);
};