# AppWorks Example - AWOfflineManager

## Contents
1. [About appworks.js](#about-appworksjs)
2. [About this example app](#about-this-example)
3. [Usage](#usage)
4. [Installation](#installation)

## About appworks.js

appworks.js is a javascript (TypeScript) library for building feature rich, hybrid enterprise apps. The OpenText AppWorks platform provides mobile and desktop clients that support apps that utilize appworks.js.

In a mobile environment the library provides access to on-device technology, and in the desktop environment some features of the underlying host OS (operating system) are exposed.

For more information, see the appworks.js repository: https://github.com/opentext/appworks-js

## About this example

The purpose of the AWOfflineManager plugin is to determine the devices network status, place content in a deferred queue if offline, add event listeners to be called with the content when the device gains network connectivity.

## Usage

#### networkStatus

```javascript
networkStatus()
```

Returns the current device network status object

+ __online__: (boolean) true if device is online
+ __offline__: (boolean) true if device is offline

Examples
```javascript
var offlineManager = new Appworks.AWOfflineManager({preserveEvents: false});
if(offlineManager.networkStatus().online) {
  // business as usual
} else {
  // take offline route
}
```

#### defer

```javascript
defer(eventName: string, args: any)
```

Create an event that will be triggered once the device gains a network connection. The args will be sent through this event.
You can have multiple events of the same name, which will be processed in the order of first in, first out.

+ __online__: (boolean) true if device is online
+ __offline__: (boolean) true if device is offline

Examples
```javascript
var self = this;

// The global offline manager instance
self.offlineManager = null

// Create an event listener to be called when the device gains a network connection
document.addEventListener('deferredOutput', doDeferredOutput);

/**
 * Retrieve or create the global instance of offline manager
 */
function getOfflineManager() {
  if(self.offlineManager == null) {
    // Create offline manager instance with preserve events: false, which allows queue to be cleared automatically after processing
    self.offlineManager = new Appworks.AWOfflineManager({preserveEvents: false});
  }
  return self.offlineManager;
}

/**
 * Output the content if device is online
 * Write content to deferred queue if device is offline
 */
function processContent(content) {
  if(getOfflineManager().networkStatus().online) {
    // business as usual
    output(content);
  } else {
    // take offline route
    getOfflineManager().defer("deferredOutput", content);
  }
}

/**
 * Function called when "deferredOut" event is triggered
 * Will receive an event object
 */
function doDeferredOutput(deferredData) {
    // Extract the "detail" property from the event object.
    // Will be JSON.stringify'd, so JSON.parse it
    var content = JSON.parse(deferredData.detail);

    // Perform the intended action as it would've if the device was online at the time
    output(content);
}

/**
 * Work with the content
 */
function output(content) {
  alert(content);
}
```

## Installation

This example app contains 3 important objects:
1. app.properties
2. icon.png
3. mobile.zip

#### app.properties
This files defines the app, with the following properties:
+ __displayName__: The display name of the app
+ __description__: A description of the app
+ __version__: The version of the app, e.g. 0.0.1 or 3.4.5 etc
+ __type__: This can be either app or desktop, or both (app,desktop)
+ __awgPlatformVersion__: The target appworks platform, this should be 16
+ __isAvailableOffline__: Allow this app to be used offline, can be true or false

#### icon.png
An icon that represents the app. This will appear in the gateway and on the device. 48x48px is ideal.

#### mobile.zip

This is your web content, such as html, js, css, images and any other assets.
The only essential file in your mobile.zip is index.html, which will be loaded by the appworks webview. Any other files or structure is up to the developer.

##### index.html

When your app is downloaded and installed in an appworks client, the client will place appworks.js, cordova.js and the cordova plugins in the root of your app.

In your html file, please include the following tags before any other javascript tags:

```html
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="appworks.js"></script>
```

#### Zipping and Deploying
1. Zip up the web content into a file named mobile.zip
2. Zip up the following files:
  + app.properties
  + icon.png
  + mobile.zip
3. Name this file in the format:
  + AppName_Version.zip
  + e.g. MyGreatApp_0.0.1.zip
  + __The version number in the filename must match the version number in app.properties__
4. Install the app on the gateway
  + Go to your gateway in a browser
  + sign in
  + go to app installation tab
  + drag and drop MyGreatApp_0.0.1.zip into the box.
  + Once fully deployed, enable the app.
