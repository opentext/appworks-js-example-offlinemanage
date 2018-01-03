var self = this;

// The global offline manager instance
self.offlineManager = null

// Create an event listener to be called when the device gains a network connection
document.addEventListener('deferredOut', doDeferredOutput);

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
 * Write content to the results area if device is online
 * Write content to deferred queue if device is offline
 */
function addDeferredText() {

  // The content to output or add to deferred queue
  var content = document.getElementById("deferred-text").value;

  // Check network status
  if(getOfflineManager().networkStatus().online) {
    // Online - output the content
    out(content);
  } else {
    // Offline - Add content to deferred queue
    // Match this event to the event listener already declared
    offlineManager.defer('deferredOut', content);
  }

  document.getElementById("deferred-text").value = "";
}

/**
 * Function called when "deferredOut" event is triggered
 * Will receive an event object
 */
function doDeferredOutput(deferredData) {
    // Extract the "detail" property from the event object.
    // Will be JSON.stringify'd, so JSON.parse it
    var content = JSON.parse(deferredData.detail);
    console.log(content);

    // Perform the intended action as it would've if the device was online at the time
    out(content);
}

/********************
** Utility methods **
********************/
function out(message) {
  var el = document.getElementById("result");
  el.innerHTML += message + "<br />" ;

  // Scroll down to the result block
  el.scrollIntoView();
}
function clearOut() {
  var el = document.getElementById("result");
  el.innerHTML = "";
}
