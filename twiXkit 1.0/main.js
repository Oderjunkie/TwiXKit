chrome.webNavigation.onCompleted.addListener(function(details){
 chrome.tabs.executeScript(
  details.tabId,
  {file: 'oe.js'}
 );
 console.log('Twixkit sent');
},{
 url: [{
  hostContains: '.twitter.'
 }],
});