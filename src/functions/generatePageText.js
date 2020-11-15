function generatePageText(head, style, body) {
    return head + style + body
    //+ '<input type="button" value="Print This Page" onClick="window.print()">'
}
exports.generatePageText = generatePageText;
