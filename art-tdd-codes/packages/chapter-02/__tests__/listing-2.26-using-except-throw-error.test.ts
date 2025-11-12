// Listing 2.26: expect().toThrow() kullanımı
import { PasswordVerifierWithValidation } from "../listing-2.24-throwing-error";

const makeVerifier = () => new PasswordVerifierWithValidation();

test("verify, with no rules, throws exception", () => {
  const verifier = makeVerifier();
  // Tam dizeyi aramak yerine düzenli ifade eşleşmesi kullanımı
  expect(() => verifier.verify("any input")).toThrow(/no rules configured/);
});
