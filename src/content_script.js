// Called when the user clicks on the browser action.
window.addEventListener ("load", myMain, false);

function myMain(evt) {
    console.log(window.location)
    try {
            const result = [window.location.origin, document.body.innerHTML, document.head.innerHTML]
            console.log(result)
            const output = processPage(result)
            console.log(output)
            render(output)
          } 

        
        catch(err){
          console.log(err)
          openPrintPreview()
        }
}