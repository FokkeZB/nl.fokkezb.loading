# Loading Mask Widget

## Overview
This is a widget for the [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) MVC framework of [Appcelerator](http://www.appcelerator.com)'s [Titanium](http://www.appcelerator.com/platform) platform.

The widget provides a simple loading mask that can be easily styled and configured.

By default it uses the native [ProgressIndicator](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.Android.ProgressIndicator) for Android but you can easily switch to use the same cross-platform version on both iOS and Android.

## Screenshot
![Loading Mask](https://raw.github.com/FokkeZB/nl.fokkezb.loading/master/docs/screenshot.png) ![Loading Mask](https://raw.github.com/FokkeZB/nl.fokkezb.loading/master/docs/android.png)

## Features
* Fully stylable via your `app.tss`.
* Can be set to be cancelable by user, setting a function to be called in that case.
* Message and ability to be cancelled can be set every time it's used.
* Can be via single global instance or local instances.
* Available as native [ProgressIndicator](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.Android.ProgressIndicator) (Android), Window and View.

## Quick Start [![gitTio](http://img.shields.io/badge/on-gittio-00B4CC.svg)](http://gitt.io/component/nl.fokkezb.loading) [![npm](http://img.shields.io/npm/v/alloy-widget-nl.fokkezb.loading.svg)](https://www.npmjs.org/package/alloy-widget-nl.fokkezb.loading)

* Use `gittio install nl.fokkezb.loading` to install via [gitTio](http://gitt.io/cli) or `npm i alloy-widget-nl.fokkezb.loading` to install via NPM or:

  * Download the latest [release](https://github.com/FokkeZB/nl.fokkezb.loading/releases) of the widget.
  * Unzip the folder to your project under `app/widgets/nl.fokkezb.loading`.
  * Add the widget as a dependency to your `app/config.json` file:
    ```json
    "dependencies": {
        "nl.fokkezb.loading":"*"
    }
    ```
* Create a global instance of the widget in `alloy.js`:
  ```javascript
  Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");
  ```
* Show and hide the loading mask when you need it:
  ```javascript
  function cancel() {
      alert('Why?!');
  }
      
  function load() {
      Alloy.Globals.loading.show('Your message', false);
          
      setTimeout(function(){
          Alloy.Globals.loading.hide();
      }, 6000);
  }
  ```
    
* In Titanium 3.3.0 you need to hide the Android Actionbar as [described in this blog](http://www.appcelerator.com/blog/2014/08/hiding-the-android-actionbar/). If you use Titanium 3.3.1 or later the widget automatically requests for a theme with no actionbar.

## Global vs Local
The Quick Start shows how to use the global-mode. You only have to create one global widget instance that will (try to) make sure that there's always one loading mask showing. You can also use one of the 3 available types of loading masks directly as a local instance, as we'll see when we look at the types.

### Types
The widget exposes different types of loading masks. All types share the same API so you can easily switch between them.

### Native Progress (Android-only)

The global default for Android is to use [ProgressIndicator](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.Android.ProgressIndicator). You can disable this by setting the `progress` property of the global widget to `false` or using one of the 2 other types directly in a local instance. The Native Progress type itself can also be used as a local instance:

```javascript
var myInstance = Alloy.createWidget('nl.fokkezb.loading', 'progress');
myInstance.show('My message', myCancelCallback);	
```

### Window
The only available global mode for iOS is to show a Window. You can also create a local instance:

```javascript
var myInstance = Alloy.createWidget('nl.fokkezb.loading', 'window');
myInstance.show('My message', myCancelCallback);
```

### View

You can also create the widget as a local view which you can require in any (composite) layout. The typical use case for this is to display the widget over a modal window since the window-type would open behind such a window and be invisible.

**index.xml**

```xml
<Alloy>
    <Window>
	<Widget src="nl.fokkezb.loading" name="view" id="myInstance" />
    </Window>
</Alloy>
```

**index.js**

```javascript
$.myInstance.show('My message', myCancelCallback);
```

## Public API
All types share the same public API:

### Attributes
|Name|Type|Access|Description|
|---|---|---|---|
|`visible`|`boolean`|`read`, `write`|You'll get `true` if the loading mask is currently shown. If set to `true` or `false` it will call `show()` or `hide()`.|

### Widget instantiation params

|Name|Values|Description|
|---|---|---|
|`progress` *(global-only)*|`'progress'`, `true`, `false`|Set to `false` to use the cross-platform loading mask for Android instead of the default native [ProgressIndicator](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.Android.ProgressIndicator).|

### Methods

|Name|Params|Description|
|---|---|---|
|`show`|`([message][, cancelable])`|Shows the loading mask or updates the existing, if it's still the top window. If the second argument is a function, the mask is user-cancelable at which event this method would be called.|
|`update`|`([message][, cancelable])`|Updates the existing message and cancelable function. Not available in global-mode, where you'd simply call `show()` again.|
|`hide`|`null`|Hides the loading mask.|

## Styling
You can style all views from your `app.tss`. The default styles can be found in [window.tss](styles/window.tss). Be aware that the default styles are applied to classses, but to override from your `app.tss` you need to following (identical) IDs:

* `#progressIndicator`: The native Android ProgressIndicator.
* `#loadingWindow`: The window if using the (default) window mode.
* `#loadingMask`: The full-screen mask.
    * Set `images` to `true` to use the `#loadingImages` indicator.
* `#loadingOuter`: The dark box containing the activityIndicator and message.
* `#loadingInner`: Wraps arround the activityIndicator and message to provider padding.
* `#loadingIndicator`: The activityIndicator.
* `#loadingImages`: The indicator variant using images.
* `#loadingMessage`: The message.

## Internationalization
You can override the default message (`Loading..`) by setting the `loadingMessage` in your `strings.xml` files.

## Changelog
* 1.8:
	* New `view` mode to get the loading mask as a view instead of a window.
	* Consistent public API's for all types and modes.
* 1.7:
    * Uses native ProgressIndicator for Android
    * Uses the `theme` property to select a theme with no ActionBar.
* 1.6: Complete rewrite
    * Widget creation now only in controller
    * Styling now only in TSS
    * Setting message and blocking now only via `show()`
    * Cancel event replaced by callback as second argument for `show()`
    * Second `show()` argument now `cancelable`, *reverse* of `blocking` (!!)
    * On Android, hitting the back button on a non-cancelable loading mask will move app to the background
* 1.5.2: Fixes empty loading mask on second show on Android
* 1.5.1: Reverted 1.5 change thanks to `opacity` fix.
* 1.5: Falls back to `Ti.UI.Android.ProgressIndicator` for Android
* 1.4: Support for image indicator
* 1.3: Fully override widget style from `app.tss` and reset to default message upon show.
* 1.2: View replaced by Window, otherwise won't work in non-absolute layout modes.
* 1.1: New parameter `show` to automatically show loading mask upon creation.
* 1.0: Initial version

## License

<pre>
Copyright 2013-2014 Fokke Zandbergen

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
