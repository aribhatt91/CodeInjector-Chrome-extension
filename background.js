const foldername = "test";

chrome.runtime.onInstalled.addListener(() => {

});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('chrome tab updated', changeInfo);
  /* Code injection on load */
  let url = tab.url || "";
  if(url.indexOf('loadScripts=true') > -1) {
    if(changeInfo.status === 'loading') {
      chrome.tabs.insertCSS(tabId, {
        file: `./${foldername}/style.css`
      },
      () => {
        console.log('CSS Inserted from Service worker');
      });
      chrome.tabs.executeScript(tabId, 
        {
          file: `./${foldername}/script.js`
        },
        () => {
          console.log('JS Inserted from Service worker');
        }
      );
    }
  }
});