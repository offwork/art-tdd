// Listing 2.16-2.18: Factory method yaklaşımı
// Konu: beforeEach() yerine factory metodlar

import { PasswordVerifier1 } from "../listing-2.10-refactoring-function-stateful-class";

/**
 * makeFailingRule() ve makePassingRule() factory metodları beforeEach() fonksiyonlarımızı 
 * biraz daha okunmaasi kolay hale getirdi.
 */
describe("PasswordVerifier", () => {
  let verifier;
  beforeEach(() => (verifier = new PasswordVerifier1()));

  describe("with a failing rule", () => {
    let errors;
    beforeEach(() => {
      verifier.addRule(makeFailingRule("fake reason"));
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
    let errors;
    beforeEach(() => {
      verifier.addRule(makePassingRule());
      errors = verifier.verify("any value");
    });

    it("has no errors", () => {
      expect(errors.length).toBe(0);
    });
  });

  describe("with failing and a passing rule", () => {
    let errors;
    beforeEach(() => {
      verifier.addRule(makePassingRule());
      verifier.addRule(makeFailingRule("fake reason"));
      errors = verifier.verify("any value");
    });

    it("has one error", () => {
      expect(errors.length).toBe(1);
    });

    it("error text belongs to failed rule", () => {
      expect(errors[0]).toContain("fake reason");
    });
  });

  const makeFailingRule = (reason: string) => {
    return (input: string) => {
      return { passed: false, reason: reason };
    };
  };

  const makePassingRule = () => (input?: string) => {
    return { passed: true, reason: '' };
  };
});
