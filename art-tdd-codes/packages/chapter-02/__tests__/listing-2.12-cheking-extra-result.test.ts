import { PasswordVerifier1 } from "../listing-2.10-refactoring-function-stateful-class";

describe('PasswordVerifier', () => {
  describe('with a failing rule', () => {
    it('has an error message based on the rule.reason', () => {
      const verifier = new PasswordVerifier1();
      const fakeRule = (input: string) => ({ passed: false, reason: "fake reason" });
      verifier.addRule(fakeRule);
      const errors = verifier.verify('any value');
      expect(errors[0]).toContain('fake reason');
    });
    
    it('has exactly one error', () => {
      const verifier = new PasswordVerifier1();
      const fakeRule = (input: string) => ({ passed: false, reason: "fake reason" });
      verifier.addRule(fakeRule);
      const errors = verifier.verify('any value');
      expect(errors.length).toBe(1);
    });
  });
});