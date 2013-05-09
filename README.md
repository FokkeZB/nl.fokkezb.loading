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
	"nl.fokkezb.loading":"1.2.1"
}
```

* Require the widget in the view, since 1.2 best as the last root view:

```xml
<Alloy>
	<Window>
		<Button onClick="load">load</Button>
	</Window>
	<Widget src="nl.fokkezb.loading" id="loading" />
</Alloy>
```

* Show and hide the loading mask when you need it:

```javascript
function cancel() {
	alert('Why?!');
}

$.loading.on('cancel', cancel);

function load() {
	$.loading.show('Your message', false);
	
	setTimeout(function(){
		$.loading.hide();
	}, 6000);
}
```

## Parameters
The following parameters can be set either through `XML` or `TSS`:

| Parameter | Type | Default | Purpose |
| --------- | ---- | ------- | ------- |
| message | `string` | Loading | Sets the message to show |
| blocking | `boolean` | TRUE | Prevents users from cancelling by clicking on the mask |
| show | `boolean` | FALSE | Calls show() directly after init |

## Public methods

### show([message],[blocking]])
Shows the loading mask. A new message and blocking parameter value is optional.

### hide
Hides the loading mask.

### setMessage(string|false)
Changes or hides the message.

### setBlocking(boolean)
Changes the blocking parameter.

## Events

### cancel
Fires when the loading mask was hidden by the user by either tapping the mask or using the Android hardware back-button.

## Styling
You can style all views from your `app.tss`. Just use the following ID's:

* `loadingMask`: The full-screen mask.
* `loadingOuter`: The dark box containing the activityIndicator and message.
* `loadingInner`: Wraps arround the activityIndicator and message to provider padding.
* `loadingSpinner`: The activityIndicator.
* `loadingMessage`: The message. 

## Changelog
* 1.2.1: Replaced event listeners for showing indicator by direct calls, works better.
* 1.2: View replaced by Window, otherwise won't work in non-absolute layout modes.
* 1.1: New parameter `show` to automatically show loading mask upon creation.
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
