function getPrintElement(html) {
    /* extract the URL for the printer-friendly version of the recipe. 
         * @ param {Object} html : the webpage content represented as a document Object.
         * returns : {String} print_url : the URl of the printer-friendly webpage.
     */
    /// wrpm is a common css template   
    var print_element = html.evaluate(
        ".//div[contains(@id, 'wprm-recipe-container-')]", 
        html.body, 
        null, 
        XPathResult.FIRST_ORDERED_NODE_TYPE, 
        null 
    )

    /// look for any button that might indicate the printer-friendly version
    if ( print_element.singleNodeValue == null ) {
        print_element = html.evaluate(
            ".//text()[translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')='print'][@href|@data-mv-print]", 
            html.body, 
            null, 
            XPathResult.FIRST_ORDERED_NODE_TYPE, 
            null 
        )
    }
    console.log(print_element)


    /// look for any button that might indicate the printer-friendly version
    if ( print_element.singleNodeValue == null ) {
        print_element = html.evaluate(
            ".//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'print')][@href|@data-mv-print]", 
            html.body, 
            null, 
            XPathResult.FIRST_ORDERED_NODE_TYPE, 
            null 
        )
    }
    console.log(print_element)

    if ( print_element.singleNodeValue == null ) {
        print_element = html.evaluate(
            ".//*[contains(translate(@href, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'print') ]", 
            html.body, 
            null, 
            XPathResult.FIRST_ORDERED_NODE_TYPE, 
            null 
        )
    }
    console.log(print_element)
    return print_element
}

exports.getPrintElement = getPrintElement;