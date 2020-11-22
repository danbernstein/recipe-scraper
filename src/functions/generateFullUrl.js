function generateFullUrl(href, url) {
    const url_match = href.match("^(\\?|\\/)[^\\/].*") // conditions when to append to original url because the URL is only the extension

    if ( url_match ) { href = url + href }
    
    if ( href.match("^(\\/).*") ) { 
        console.log('starts')
        href = href.replace('//', 'https://') 
        console.log(href)
    }
    console.log(href)
    if ( href != '#' )  {
        return href
    }
}

exports.generateFullUrl = generateFullUrl;