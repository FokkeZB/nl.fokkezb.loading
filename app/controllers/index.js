$.index.open();

function example() {
  
  function cancel() {
    alert('Why?!');
  }

  function load() {
    Alloy.Globals.loading.show('Your message', false);

    setTimeout(function() {
      Alloy.Globals.loading.hide();
    }, 6000);
  }

  load();
}