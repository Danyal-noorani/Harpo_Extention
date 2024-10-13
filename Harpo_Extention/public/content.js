// Listen for messages from the React extension (popup/background)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === 'readTC'){
        sendResponse(findTC('Terms'));

    }
    return true;  
  });

  function findTC(keyword) {
    const xpath = `//*[contains(text(), '${keyword}')]`;
    const elements = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    var count = 0;
    for (let i = 0; i < elements.snapshotLength; i++) {
        count++;
    }

    if (count > 5){
        const pageText = document.body.textContent || document.body.innerText;
        return pageText
    }
    return null;

  }

  // Example usage