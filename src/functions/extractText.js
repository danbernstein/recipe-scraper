function extractText(html) {
    /* extract HTML elements that correspond to the recipe content.
     * @ param {Object} html : the webpage content represented as a document Object.
     */
    recipe_classes = ['recipeDetail', 'recipe-body', 'content-group', 'recipe-content', 'recipe-show']
    recipe_class_xpath_array = recipe_classes.map( value => "@class='" + value + "'")
    recipe_class_xpath = recipe_class_xpath_array.join(' or ')

    xpath = "//div[contains(@class, 'post-content') or " + recipe_class_xpath + "]/child::node()"
    text_element = html.evaluate(xpath, html.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null )
    //console.log(text_element)
    if ( text_element == null ) {
        throw 'exception: null text'
    }

    subset_nodes = []

    const excluded_tags = ( 'none' )

    while (node = text_element.iterateNext()) {
        if ( !String(node.innerHTML).includes( excluded_tags ) ) {
            /// include any node that doesn't include the text `img` which would indicate an image element.
            subset_nodes.push(node.innerHTML)
        }
    }
    output_text = subset_nodes.join('<br>')
    return output_text 
}
exports.extractText = extractText;