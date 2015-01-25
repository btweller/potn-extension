
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.url != undefined) {
          var fullUrl = 'http://photography-on-the.net/forum/' + request.url;
          try {
              chrome.tabs.create({ 'url': fullUrl }, function(tab) {
//                  sendResponse({ test: "value"});
//                  chrome.tabs.sendMessage(sender.tab.id, tab);
              });
          }
          catch (e) {
              chrome.tabs.sendMessage(sender.tab.id, {error: e});
          }
      }
  });
