// Listing 2.21: test.each kullanımı

import { oneUpperCaseRule } from "../listing-2.19-password-rules";

describe("one uppercase rule", function () {
  test("given no uppercase, it fails", () => {
    const result = oneUpperCaseRule("abc");
    expect(result.passed).toEqual(false);
  });

  // ❶ Girdi parametresine eşlenen bir değerler dizisi geçiriyoruz
  // ❷ Dizide geçirilen her girdi parametresini kullanıyoruz
  test.each(/* ❶ */ ["Abc", "aBc"])("given one uppercase, it passes", (/* ❷ */ input) => {
    const result = oneUpperCaseRule(input);
    expect(result.passed).toEqual(true);
  });
});
