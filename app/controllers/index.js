$.index.open();

function onOpen() {

  // so we can see if the actionBar of the widget is properly hidden
  OS_ANDROID && $.index.activity.actionBar.hide();
}

function example() {

  function cancel() {
    alert('Why?!');
  }

  function load() {
    Alloy.Globals.loading.show('Loading something', cancel);

    setTimeout(function() {
      Alloy.Globals.loading.hide();
    }, 6000);
  }

  load();
}