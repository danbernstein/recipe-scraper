/* recipe-scraper : background script.
  this script includes the extension's functionality.
  the entry point is the on-click listener function ('chrome.browserAction.onClicked.addListener()') at bottom.
*/

function extract_text(html, head) {
    /* extract HTML elements that correspond to the recipe content.
     * @ param {Object} html : the webpage content represented as a document Object.
     * @ param {String} head : the webpage head.
     */
    recipe_classes = ['recipeDetail', 'recipe-body']
    recipe_class_xpath_array = recipe_classes.map( value => "@class='" + value + "'")
    recipe_class_xpath = recipe_class_xpath_array.join(' or ')

    xpath = "//div[contains(@class, 'post-content') or " + recipe_class_xpath + "]/child::node()"
    text_element = html.evaluate(xpath, html.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null )

    if ( text_element == null ) {
        throw 'exception: null text'
    }

    subset_nodes = []

    while (node = text_element.iterateNext()) {
        if ( !String(node.innerHTML).includes('img') ) {
            /// include any node that doesn't include the text `img` which would indicate an image element.
            subset_nodes.push(node.innerHTML)
        }
    }
    output_text = subset_nodes.join('<br>')
    win = window.open()
    win.document.write(head + output_text)
}

function get_print_url(html, tab_url) {
    /* extract the URL for the printer-friendly version of the recipe. 
         * @ param {Object} html : the webpage content represented as a document Object.
         * @ param {String} tab_url : the URL of the webpage.
         * returns : {String} print_url : the URl of the printer-friendly webpage.
     */

    /// wrpm is a common css template 
    print_element = html.evaluate("//div[contains(@id, 'wprm-recipe-container-')]", html.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null )

    if ( print_element.singleNodeValue == null ) {
    /// look for any button that might indicate the printer-friendly version
        print_element = html.evaluate("//*[not(name()='style')][contains(text(), 'Print')][@href|@data-mv-print]", html.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null )
    }

    if ( print_element.singleNodeValue == null ) {
    /// look at parent of the 'print' element, if that might contain the printing functionality
        print_element = html.evaluate("//*[not(name()='style')][contains(text(), 'Print') ]/..", html.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null )
    }

    console.log(print_element.singleNodeValue)
    if ( print_element.singleNodeValue != null ) {
        node_value = print_element.singleNodeValue

        if (node_value.hasAttribute('href')) {
            print_url = node_value.getAttribute('href')
        }
        else if ( node_value.hasAttribute('data-mv-print') ) {
            print_url = node_value.getAttribute('data-mv-print')
        } else if (node_value.hasAttribute('data-recipe-id') ) {
            recipe_id = node_value.getAttribute('data-recipe-id')
            print_url = tab_url.split('.com/')[0] + '.com/wprm_print/' + recipe_id
        }

        console.log(print_url)
        if (typeof print_url !== 'undefined') {
            url_match = print_url.match("^(\\?|\\/).*") // conditions when to append to original url because the URL is only the extension

            if ( url_match ) { print_url = tab_url + print_url }
            if ( print_url != '#' )  {
                return print_url
            }
        }
    }
}

function process_page(results) {
    /** 
     * attempt to identify the URL for the printer-friendly webpage. If not found, extract the recipe from the webpage.
     * @ param {Array} results : the array of elements extracts from the browser tab. 
     */
     try {
        var [tab_url, html, head] = results[0]
        console.log(typeof(head))
        var doc = new DOMParser().parseFromString(html, "text/html");
        var print_url = get_print_url(doc, tab_url)
        if (typeof(print_url) !== 'undefined') {
            chrome.tabs.update({url: print_url});
        } else {
            extract_text(doc, head)
        }
    }
    catch(err) {
        console.log(err)
        alert(`Sorry, we are unable to extract the recipe from this webpage.\nError information: ${err}`);
    };
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    /* listener function that is triggered when the user clicks the toolbar icon. */
    chrome.tabs.executeScript({
        /// get the href, body, and head of the current tab, then trigger processing
        code: '[window.location.href, document.body.innerHTML, document.head.innerHTML]'
      }, process_page );
});
