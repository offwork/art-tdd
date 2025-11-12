// Bölüm 2, Parça 1 (Sayfa 18-19)
// Listing 2.2: Password Verifier versiyon 0
// Konu: Temel password doğrulama fonksiyonu

type PasswordRuleResult = {
  passed: boolean;
  reason: string;
};

type PasswordRule = (input: string) => PasswordRuleResult;

export const verifyPassword = (input: string, rules: PasswordRule[]): string[] => {
  const errors: string[] = [];

  for (const rule of rules) {
    const result = rule(input);
    if (!result.passed) {
      errors.push(`error ${result.reason}`);
    }
  }

  return errors;
};
