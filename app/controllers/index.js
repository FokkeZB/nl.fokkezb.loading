$.index.open();

function onOpen() {

  // so we can see if the actionBar of the widget is properly hidden
  OS_ANDROID && $.index.activity.actionBar.hide();
}

function global() {
  Alloy.Globals.loading.show('Loading README example', function onCancel() {
    alert('Canceled README example');
  });

  setTimeout(function() {
    Alloy.Globals.loading.hide();
  }, 6000);
}

function view() {

  $.view.show('Loading VIEW example', function onCancel() {
    alert('Canceled VIEW example');
  });

  setTimeout(function() {
    $.view.hide();
  }, 6000);
}

function progress() {

  var progress = Alloy.createWidget('nl.fokkezb.loading', 'progress');

  progress.show('Loading VIEW example', function onCancel() {
    alert('Canceled VIEW example');
  });

  setTimeout(function() {
    progress.hide();
  }, 6000);
}