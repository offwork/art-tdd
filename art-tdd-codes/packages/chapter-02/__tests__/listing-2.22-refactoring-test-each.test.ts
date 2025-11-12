// Listing 2.22: test.each'i yeniden yapılandırma

import { oneUpperCaseRule } from "../listing-2.19-password-rules";

describe("one uppercase rule", function () {
  // ❶ Her biri iki parametreli üç dizi sağlıyoruz
  // ❷ Eksik büyük harf karakteri için yeni bir false beklentisi
  // ❸ Jest dizi değerlerini argümanlara otomatik olarak eşler
  test.each( [
    ['Abc', true], /* ❶ */
    ['aBc', true],
    ['abc', false], /* ❷ */
  ])("given %s, %s ", (input, expected) => { /* ❸ */
    const result = oneUpperCaseRule(input);
    expect(result.passed).toEqual(expected);
  });
});
