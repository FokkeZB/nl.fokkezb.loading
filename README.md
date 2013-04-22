# Loading Mask Widget
## Overview
This is a widget for the [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) MVC framework of [Appcelerator](http://www.appcelerator.com)'s [Titanium](http://www.appcelerator.com/platform) platform.

The widget provides a simple loading mask that can be easily styled and configured.

## Screenshot
![Loading Mask](https://raw.github.com/FokkeZB/nl.fokkezb.loading/master/docs/screenshot.png)

## Features
* Fully stylable via your `app.tss`.
* If enabled, hides and sends a `cancelled` event when tapped on by the user.
* Message and ability to be cancelled can be set any time, also in one call.

## Quick Start
* [Download the latest version](https://github.com/FokkeZB/nl.fokkezb.loading/tags) of the widget as a ZIP file.
* Unzip the folder to your project under `app/widgets/nl.fokkezb.loading`.
* Add the widget as a dependency to your `app/config.json` file:

```javascript
	"dependencies": {
		"nl.fokkezb.loading":"1.0"
	}
```

* Require the widget in the view where you need it:

```xml
<Widget src="nl.fokkezb.loading" id="loading" />
```

* Show and hide the loading mask when you need it:

```javascript
function cancelled() {
	alert('Why?!');
}
$.loading.on('cancel', cancelled);
button.addEventListener('click', function (e) {
	$.loading.show('Your message', true);
  setTimeout(function(){
    $.loading.hide();
  }, 6000);
});
```

## Parameters
The following parameters can be set either through `XML` or `TSS`:

| Parameter | Type | Default |
| --------- | ---- | ----------- |
| message | `string` | Loading |
| blocking | `boolean` | TRUE |

## Public methods

### show
Shows the loading mask.

### hide
Hides the loading mask.

### setMessage(string|false)
Changes or hides the message.

### setBlocking(boolean)
Changes the blocking parameter.

## Events

### cancel
Fires when the loading mask was hidden by the user.

## Changelog
* 1.0: Initial version


## License

<pre>
Copyright 2013 Fokke Zandbergen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>