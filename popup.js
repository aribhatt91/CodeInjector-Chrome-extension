function injectHTMLToHead (html) {
    console.log('injecting HTML');
    try {
        chrome.storage.sync.get("html", ({html}) => {
            let inject = () => {
                let template = document.createElement('template');
                template.innerHTML = html;
                //console.log(template.content);
                jQuery('head').append(template.content);
            };
            if (typeof jQuery === 'undefined') {
                var script_jQuery = document.createElement('script');
                script_jQuery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
                // call doStuff() after jQuery.js loads
                script_jQuery.onload = inject;
                document.body.appendChild(script_jQuery);            
            }else {
                inject();
            }            
        });
    }catch(err){
        console.error(err);
        return false;
    }
    
}

let xhr = new XMLHttpRequest();

xhr.onload = async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(this.responseXML);
    chrome.storage.sync.set({ html: this.responseXML.head.innerHTML });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: injectHTMLToHead
    });
        
};
xhr.open("GET", "./index.html", true);
xhr.responseType = "document";
xhr.send();
    

