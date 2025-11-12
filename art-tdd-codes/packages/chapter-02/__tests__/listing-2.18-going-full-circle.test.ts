// Listing 2.18: İç içe describe'ları kaldırma (düz test() kullanımı)

import { PasswordVerifier1 } from "../listing-2.10-refactoring-function-stateful-class";

/**
 * Factory metodlar bize ihtiyaç duyduğumuz tüm işlevselliği sağlıyor, her bir spesifik test için netliği kaybetmeden.
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

test("pass verifier, with failed rule, has an error message based on the rule.reason", () => {
  const verifier = makeVerifierWithFailedRule("fake reason");
  const errors = verifier.verify("any input");
  expect(errors[0]).toContain("fake reason");
});

test("pass verifier, with failed rule, has exactly one error", () => {
  const verifier = makeVerifierWithFailedRule("fake reason");
  const errors = verifier.verify("any input");
  expect(errors.length).toBe(1);
});

test("pass verifier, with passing rule, has no errors", () => {
  const verifier = makeVerifierWithPassingRule();
  const errors = verifier.verify("any input");
  expect(errors.length).toBe(0);
});

test("pass verifier, with passing and failing rule," + " has one error", () => {
  const verifier = makeVerifierWithFailedRule("fake reason");
  verifier.addRule(passingRule);
  const errors = verifier.verify("any input");
  expect(errors.length).toBe(1);
});

test("pass verifier, with passing and failing rule," + " error text belongs to failed rule", () => {
  const verifier = makeVerifierWithFailedRule("fake reason");
  verifier.addRule(passingRule);
  const errors = verifier.verify("any input");
  expect(errors[0]).toContain("fake reason");
});
