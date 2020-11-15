const { extractText } = require('../src/functions/extractText')
const { readFile } = require('./utils/readFile.js')


describe("combine head, style, and text", () => {
    test("it should combine the input head, style, and text", () => {

      const input_html = readFile('/html/test_chrissy_teigen.html')
      const doc = new DOMParser().parseFromString(input_html, "text/html")

      const output = readFile('/html/test_chrissy_teigen_output.html')
  
      expect(extractText(doc)).toEqual(output);
  
    });
  });
