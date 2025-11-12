import { PasswordVerifier1 } from "./listing-2.10-refactoring-function-stateful-class";

// Listing 2.24: Hata fırlatma
export class PasswordVerifierWithValidation extends PasswordVerifier1 {
  verify(input: string) {
    if (this.rules.length === 0) {
      throw new Error("There are no rules configured");
    }
    return super.verify(input);
  }
}
