if ( process.env.JEST_WORKER_ID !== undefined ) {
    var { getPrintElement } = require('./getPrintElement')
    var { generateFullUrl } = require('./generateFullUrl')
} 

function getPrintUrl(html, tab_url) {
    const print_element = getPrintElement(html)

    if ( print_element.singleNodeValue != null ) {
        node_value = print_element.singleNodeValue
        console.log(node_value)
        if (node_value.hasAttribute('href')) {
            var print_url = node_value.getAttribute('href')
        }
        else if ( node_value.hasAttribute('data-mv-print') ) {
            print_url = node_value.getAttribute('data-mv-print')
        } else if (node_value.hasAttribute('data-recipe-id') ) {
            recipe_id = node_value.getAttribute('data-recipe-id')
            print_url = tab_url + '/wprm_print/' + recipe_id
        }
        console.log(typeof print_url)
        if (typeof print_url !== 'undefined') {
            return generateFullUrl(print_url, tab_url)
        } 
    } 
}

exports.getPrintUrl = getPrintUrl;
