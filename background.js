//variables
var active = false;


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  getUrl();
  notify();
  // Send a message to the active tab to tell it that its clicked and also send the url of the current tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action", "urlOfTab": urlOfCurrentTab});
  });
});



//displaying a badge when the extension is on or off
function notify(){
  if (active == false) {
  	chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  	chrome.browserAction.setBadgeText({text: 'On'});
  	active = true;
  }else {
  	chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  	chrome.browserAction.setBadgeText({text: 'Off'});
  	active = false;
	}
}


//getting the url of the current tab
function getUrl(){
  chrome.tabs.getSelected(null, function(tab) {
    urlOfCurrentTab = tab.url;
  });
}

 
