// Listing 2.23: Vanilla JavaScript for kullanımı

import { oneUpperCaseRule } from "../listing-2.19-password-rules";

describe("one uppercase rule, with vanilla JS for", function () {
  const tests = {
    Abc: true,
    aBc: true,
    abc: false,
  };
  /** 
   * Bu örnekte, birçok testen kurtulup hepsini büyük bir test.each'e koymak 
   * çok kolay olduğunu göstermek istedim—okunabilirliğe zarar verse bile—bu 
   * yüzden bu özel makasla koşarken dikkatli olun.
   */

  for (const [input, expected] of Object.entries(tests)) {
    test(`give ${input}, ${expected}`, () => {
      const result = oneUpperCaseRule(input);
      expect(result.passed).toEqual(expected);
    });
  }
});
