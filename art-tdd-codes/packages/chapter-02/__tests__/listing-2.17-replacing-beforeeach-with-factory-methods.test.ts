// Listing 2.17: beforeEach()'i tamamen factory metodlarla değiştirme

import { PasswordVerifier1 } from "../listing-2.10-refactoring-function-stateful-class";

/**
 * beforeEach() fonksiyonlarını ortadan kaldırdık, ama bakım yapılabilirliği kaybetmedik. 
 * Ortadan kaldırdığımız tekrar miktarı ihmal edilebilir düzeyde, ancak yuvalanmış beforeEach() 
 * bloklarının kaldırılması sayesinde okunabilirlik büyük ölçüde iyileşti.
 */

const makeVerifier = () => new PasswordVerifier1();
const passingRule = (input?: string) => ({ passed: true, reason: "" });

const makeVerifierWithPassingRule = () => {
  const verifier = makeVerifier();
  verifier.addRule(passingRule);
  return verifier;
};

const makeVerifierWithFailedRule = (reason: string) => {
  const verifier = makeVerifier();
  const failingRule = (input: string) => ({ passed: false, reason: reason });
  verifier.addRule(failingRule);
  return verifier;
};

describe("PasswordVerifier", () => {
  describe("with a failing rule", () => {
    it("has an error message based on the rule.reason", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      const errors = verifier.verify("any input");
      expect(errors[0]).toContain("fake reason");
    });

    it("has exactly one error", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      const errors = verifier.verify("any input");
      expect(errors.length).toBe(1);
    });
  });

  describe("with a passing rule", () => {
    it("has no errors", () => {
      const verifier = makeVerifierWithPassingRule();
      const errors = verifier.verify("any input");
      expect(errors.length).toBe(0);
    });
  });

  describe("with failing and a passing rule", () => {
    it("has one error", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      verifier.addRule(passingRule);
      const errors = verifier.verify("any input");
      expect(errors.length).toBe(1);
    });

    it("error text belongs to failed rule", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      verifier.addRule(passingRule);
      const errors = verifier.verify("any input");
      expect(errors[0]).toContain("fake reason");
    });
  });
});
