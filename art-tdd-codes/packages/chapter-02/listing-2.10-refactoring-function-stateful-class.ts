// Bölüm 2, Parça 2 (Sayfa 29)
// Listing 2.10: Fonksiyonu stateful sınıfa yeniden yapılandırma
// Konu: Object-oriented design ile password verifier

type PasswordRuleResult = {
  passed: boolean;
  reason: string;
};

export type PasswordRule = (input: string) => PasswordRuleResult;

export class PasswordVerifier1 {
  rules: PasswordRule[];

  constructor() {
    this.rules = [];
  }

  addRule(rule: PasswordRule) {
    this.rules.push(rule);
  }

  verify(input: string) {
    const errors: string[] = [];

    this.rules.forEach((rule) => {
      const result = rule(input);
      if (result.passed === false) {
        errors.push(`error ${result.reason}`);
      }
    });

    return errors;
  }
}
