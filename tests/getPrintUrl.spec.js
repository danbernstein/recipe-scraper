const { getPrintUrl }  = require('../src/functions/getPrintUrl')
const { readFile } = require('./utils/readFile')

describe("return the url for the print webpage using the `Print` text element", () => {
  test("it should return the appropriate full URL", () => {

    html = readFile('/html/test_sally.html')
    const input_doc = new DOMParser().parseFromString(html, "text/html")
    const input_tab_url = 'https://sallysbakingaddiction.com/salted-caramel-apple-pie-bars/'
    const output = "https://sallysbakingaddiction.com/salted-caramel-apple-pie-bars/print-recipe/75002/"
  
    expect(getPrintUrl(input_doc, input_tab_url)).toEqual(output)
    });
  });


describe("return the url for the print webpage by identifying `printview` in an href element", () => {
    test("it should return the appropriate full URL", () => {

    html = readFile('/html/test_all_recipes.html')
    const input_doc = new DOMParser().parseFromString(html, "text/html")
    const input_tab_url = 'https://www.allrecipes.com/recipe/85452/homemade-black-bean-veggie-burgers/'
    const output = "https://www.allrecipes.com/recipe/85452/homemade-black-bean-veggie-burgers/?printview"

    expect(getPrintUrl(input_doc, input_tab_url)).toEqual(output)
  });
});
