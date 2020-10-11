//var get_text = function(text) {
//    if ( Array.isArray(text) ) {
//        output_text = []
//        text.forEach( item  => {output_text.push(item.innerHTML)})
//        output_text = output_text.join('<br>')
//    } else {
//        output_text = text
//    }
//    return output_text
//}



var get_print_url = function(html, tab_url) {
    print_links = html.querySelectorAll("a[href*='print']")
    console.log(print_links)

    if ( print_links.length > 0 ) {
        print_url = print_links[0].getAttribute('href') // take first link, alternative: be more selective in the querySelector
        url_match = print_url.match("^(\\?|\\/).*")

        if ( url_match ) {
            print_url = tab_url + print_url
        }
        console.log(print_url)
        chrome.tabs.update({
         url: print_url
        });
    } else {
        text = html.querySelector("div[class*='post-content']")
        console.log(text)
        win = window.open()
        win.document.write(text.innerHTML)
    }
}

var process_page = function(results) {
    try {
        console.log(results)
        var [tab_url, html] = results[0]
        var doc = new DOMParser().parseFromString(html, "text/html");

        get_print_url(doc, tab_url)

    }
    catch(err) {
        console.log(err)
        alert(`Something went wrong.\n ${err}`);
    };
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    ///var tab_url = tab.url;
    chrome.tabs.executeScript({
        code: '[window.location.href, document.body.innerHTML]'
      }, process_page );
});
