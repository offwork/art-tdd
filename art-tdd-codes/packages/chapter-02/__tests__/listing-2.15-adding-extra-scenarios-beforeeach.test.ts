// Listing 2.15: Ekstra senaryolar ekleme

import { PasswordVerifier1 } from "../listing-2.10-refactoring-function-stateful-class";

/**
 * Şimdi birkaç ekstra sorun görüyoruz:
 * 
 * `beforeEach()` kısımlarında çok fazla tekrar görmeye başlayabilirim.
 * Hangi `beforeEach()`'in hangi `it()` durumunu etkilediğine dair daha fazla seçenekle kaydırma yorgunluğu 
 * potansiyeli önemli ölçüde arttı.
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

  describe("with a passing rule", () => {
    let fakeRule, errors;
    beforeEach(() => {
      fakeRule = (input: string) => ({ passed: true, reason: "" });
      verifier.addRule(fakeRule);
      errors = verifier.verify("any value");
    });

    it("has no errors", () => {
      expect(errors.length).toBe(0);
    });
  });

  describe("with failing and a passing rule", () => {
    let fakeRulePass, fakeRuleFail, errors;
    beforeEach(() => {
      fakeRulePass = (input: string) => ({ passed: true, reason: "fake success" });
      fakeRuleFail = (input: string) => ({ passed: false, reason: "fake reason" });
      verifier.addRule(fakeRulePass);
      verifier.addRule(fakeRuleFail);
      errors = verifier.verify("any value");
    });

    it("has one error", () => {
      expect(errors.length).toBe(1);
    });

    it("error text belongs to failed rule", () => {
      expect(errors[0]).toContain("fake reason");
    });
  });
});
