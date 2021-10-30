const foldername = "experience";

function injectHTML () {
    console.log('injecting HTML');
    try {
        chrome.storage.sync.get("html", ({html}) => {
            let template = document.createElement('template');
            template.innerHTML = html;

            if (typeof jQuery === 'undefined') {
                jQuery('body').append(template.content);      
            }else {
                document.body.appendChild(template.content); 
            }            
        });
    }catch(err){
        console.error(err);
        return false;
    }
    
}

document.getElementById("injectHTML").addEventListener('click', () => {
    let xhr = new XMLHttpRequest();

    xhr.onload = async function() {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log(this.responseXML);
        chrome.storage.sync.set({ html: this.responseXML.head.innerHTML });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: injectHTML
        });
            
    };
    xhr.open("GET", `./${foldername}/index.html`, true);
    xhr.responseType = "document";
    xhr.send();
});

document.getElementById("injectScript").addEventListener('click', async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [`./${foldername}/script.js`]
    });
            
});

document.getElementById("injectCSS").addEventListener('click', async () => {
    console.log('injectCSS');
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: [`./${foldername}/style.css`]
    });
});

document.getElementById("seeMore").addEventListener('click', (e) => {
    let moreText = document.querySelector('p.more-text');
    if(moreText.hasAttribute('show')){
        e.target.textContent = 'See more.';
        moreText.removeAttribute('show');
    }else {
        e.target.textContent = 'See less.';
        moreText.setAttribute('show', true);
    }
})