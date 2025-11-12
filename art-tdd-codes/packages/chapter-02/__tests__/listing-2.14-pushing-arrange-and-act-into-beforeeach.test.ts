// // Listing 2.14: arrange ve act kısımlarını beforeEach()'e taşıma

import { PasswordVerifier1 } from "../listing-2.10-refactoring-function-stateful-class";

/**
 * Tekrarları kaldırma sürecindeyken, beforeEach()'te verify'ı da çağırabilir ve her it()'ten fazladan bir satır 
 * kaldırabiliriz. Bu temelde AAA deseninden arrange ve act kısımlarını beforeEach() fonksiyonuna koymaktır.
 */
describe("PasswordVerifier", () => {
  let verifier;
  beforeEach(() => (verifier = new PasswordVerifier1()));

  describe("with a failing rule", () => {
    let fakeRule, errors;
    beforeEach(() => {
      fakeRule = (input: string) => ({ passed: false, reason: "fake reason" });
      verifier.addRule(fakeRule);
      errors = verifier.verify("any value");
    });

    it("has an error message based on the rule.reason", () => {
      expect(errors[0]).toContain("fake reason");
    });

    it("has exactly one error", () => {
      expect(errors.length).toBe(1);
    });
  });
});
