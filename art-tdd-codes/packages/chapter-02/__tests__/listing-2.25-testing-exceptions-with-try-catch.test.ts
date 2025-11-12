// Listing 2.25: İstisnaları try/catch ile test etme
import { PasswordVerifierWithValidation } from "../listing-2.24-throwing-error";

const makeVerifier = () => new PasswordVerifierWithValidation();

test('verify, with no rules, throws exception (with try/catch)', () => {
  const verifier = makeVerifier();

  try {
    verifier.verify('any input');
    fail('error was expected but not thrown');
  } catch (e) {
    expect(e.message).toContain('no rules configured');
  }
});