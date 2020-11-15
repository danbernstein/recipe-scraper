if ( process.env.JEST_WORKER_ID !== undefined ) {
    var { getPrintUrl } = require('./getPrintUrl')
    var { extractText } = require('./extractText')
    var { generatePageText } = require('./generatePageText')
}

function processPage(inputs) {
    /** 
     * identify the URL for the printer-friendly webpage. If not found, extract the recipe from the webpage.
     * @ param {Array} inputs : the array of elements retrieved from the browser tab. 
     */
     try {
        const [tab_url, html, head] = inputs
        const doc = new DOMParser().parseFromString(html, "text/html");
        var print_url = getPrintUrl(doc, tab_url)
        if (typeof(print_url) !== 'undefined') {
            return {'type': 'url', 'content': print_url}
        } else {
            const body = extractText(doc)
            if ( body.length > 0 ) {
                style = "<style>body {padding:50 20%}</style>"
                new_page = generatePageText(head, style, body)
                return {'type': 'html', 'content': new_page}
            } 
        }

    }
    catch(err) {
        console.log(err)
        return { 
            'type': 'error',
            'content': `Sorry, we are unable to process this webpage.\nError information: ${err}`
        }
    }
}
exports.processPage = processPage;
