let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  //chrome.storage.sync.set({ color });
  //console.log('Default background color set to %cgreen', `color: ${color}`);
  
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('chrome tab updated', changeInfo);
  /* Code injection on load */
  if(changeInfo.status === 'loading' && true) {
    //chrome.tabs.insertCSS
  }
});