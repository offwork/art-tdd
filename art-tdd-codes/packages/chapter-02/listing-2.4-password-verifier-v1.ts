// Bölüm 2, Parça 1 (Sayfa 18-19)
// Listing 2.4: Password Verifier versiyon 1
// Konu: Testi test etmek

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
      // ① Bu satırı yanlışlıkla yorum haline getirdik.
      errors.push(`error ${result.reason}`);
    }
  }

  return errors;
};
