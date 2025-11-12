// Listing 2.20: Bir kuralı varyasyonlarla test etmek

import { oneUpperCaseRule } from "../listing-2.19-password-rules";

/**
 * büyük harfin nerede olduğunun önemli olmadığını, orada olduğu sürece test etmek istiyoruz. 
 * Ancak bu tekrar, büyük harf mantığını değiştirmek istediğimizde veya bu kullanım durumu için 
 * iddiaları bir şekilde düzeltmemiz gerektiğinde ileride bize zarar verecektir.
 */
describe("one uppercase rule", function () {
  test("given no uppercase, it fails", () => {
    const result = oneUpperCaseRule("abc");
    expect(result.passed).toEqual(false);
  });

  test("given one uppercase, it passes", () => {
    const result = oneUpperCaseRule("Abc");
    expect(result.passed).toEqual(true);
  });

  test("given a different uppercase, it passes", () => {
    const result = oneUpperCaseRule("aBc");
    expect(result.passed).toEqual(true);
  });
});
