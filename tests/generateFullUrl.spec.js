const { generateFullUrl }  = require('../src/functions/generateFullUrl')

describe("return the same url", () => {
    test("it should return a full url if the input_href is not a full url", () => {

      const input_href = "https://www.budgetbytes.com/wprm_print/43568"
      const input_base_url = "https://www.budgetbytes.com"
  
      const output = "https://www.budgetbytes.com/wprm_print/43568";
  
      expect(generateFullUrl(input_href, input_base_url)).toEqual(output);
  
    });
  });


describe("generate a full url", () => {
    test("it should return a full url if the input_href is not a full url", () => {

      const input_href = "/wprm_print/43568"
      const input_base_url = "https://www.budgetbytes.com"
  
      const output = "https://www.budgetbytes.com/wprm_print/43568";
  
      expect(generateFullUrl(input_href, input_base_url)).toEqual(output);
  
    });
  });
  


describe("generate a full url", () => {
  test("it should return a full url replacing the leading '//' with 'https://'", () => {

    const input_href = "//www.foodnetwork.com/recipes/food-network-kitchen/thanksgiving-chicken-over-roasted-vegetables-8849700"
    const input_base_url = "https://www.foodnetwork.com/"

    const output = "https://www.foodnetwork.com/recipes/food-network-kitchen/thanksgiving-chicken-over-roasted-vegetables-8849700";

    expect(generateFullUrl(input_href, input_base_url)).toEqual(output);

  });
});
