var index=0;
var imglist=[];
var list;
chrome.commands.onCommand.addListener(function(command) { 
  if(command === "toggle") {
        alert(index);
          for (i=0;i<index; i++)
      {   
          window.open(imglist[i]); 

      }
  }
});
  
// Listen for a click on the camera icon. On that click, take a screenshot.
chrome.browserAction.onClicked.addListener(function() {
     chrome.windows.create({type: "popup",state:"minimized"})
     interval=0;
    while(interval<30000000)//print x times, where x is the number of milliseconds/milleseconds for screenshot
    {
    setTimeout(function(){Loop()},interval);    
    interval=interval+60000;
}
});

function Loop (){
      chrome.tabs.captureVisibleTab(function(screenshotUrl) {
          imglist[index]=screenshotUrl;
          chrome.tabs.getSelected(null, function(tab) {list=list+tab.url+"----"+new Date().toJSON()+"\n";});
          index++;
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  }); 
  chrome.storage.local.set({"lista": list});
 
}

chrome.browserAction.onClicked.addListener(function() {
      chrome.tabs.captureVisibleTab(function(screenshotUrl) {
window.open(screenshotUrl);
}
)}
);
// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
      if (text!=="list")
      {
                for (i=text;i>0; i--)
      {   
          if(imglist[index-i])
          window.open(imglist[index-i]); 
      }
  }
  else
   chrome.storage.local.get("lista",function(log){alert(log.lista);});
  });