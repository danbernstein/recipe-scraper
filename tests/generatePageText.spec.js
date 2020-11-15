const { generatePageText }  = require('../src/functions/generatePageText')

describe("combine head, style, and text", () => {
    test("it should combine the input head, style, and text", () => {

      const input_head = "<head> sample head </head>"
      const input_style = "<style> sample style </style>"
      const input_text = "<p> sample text </p>"

      const output = "<head> sample head </head><style> sample style </style><p> sample text </p>";
  
      expect(generatePageText(head=input_head, style=input_style, text=input_text)).toEqual(output);
  
    });
  });
