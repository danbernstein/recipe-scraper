/* recipe-scraper : background script.
  this script includes the extension's i/o with the chrome API
  the entry point is the on-click listener function ('chrome.browserAction.onClicked.addListener()') at bottom.
*/


function openPrintPreview() {
  chrome.tabs.executeScript({
      /// get the href, body, and head of the current tab, then trigger processing
      code: 'window.print()'
    });
}

function render(output){
  console.log(output)
  if (output['type'] == 'html') {
    win = window.open()
    win.document.write(output['content'])
  } else if ( output['type'] == 'url' ) {
    chrome.tabs.update({url: output['content']});
  } else if ( output['type'] == 'printPreview' ) {
    openPrintPreview()
  } else {
    alert(output['content'])
  }
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    try {
      /* listener function that is triggered when the user clicks the toolbar icon. */
        chrome.tabs.executeScript({
          /// get the href, body, and head of the current tab, then trigger processing
          code: '[window.location.origin, document.body.innerHTML, document.head.innerHTML]'
        }, function(result) {
          const inputs = result[0]
          const output = processPage(inputs)
          console.log(output)
          render(output)
        } 
         );
      }
      
      catch(err){
        console.log(err)
        openPrintPreview()
      }
});

