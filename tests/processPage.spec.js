const { processPage } = require('../src/functions/processPage')
const { readFile } = require('./utils/readFile.js')
const { chrome } = require('jest-chrome')


describe("produce the output dictionary", () => {
    test("it should produce the output dictionary", () => {

      [window.location.href, document.body.innerHTML, document.head.innerHTML]
      href = 'https://cravingsbychrissyteigen.com/read/how-to-make-aioli-recipe/'
      html = readFile('/html/test_chrissy_teigen.html')
      head = readFile('/html/test_chrissy_teigen_head.html')
      const input_array = [href, html, head]
      const output = 'html2'
  
      expect(processPage(input_array)['type']).toEqual(output);
  
    });
  });
