// Bölüm 2, Parça 2
// Listing 2.5.6: Nested describes for extra context
// Konu: Structure implying context
import { verifyPassword } from "../listing-2.4-password-verifier-v1";

describe("verifyPassword", () => {
  describe("with a failing rule", () => {
    test("returns errors", () => {
      const fakeRule = (input: string) => ({ passed: false, reason: "fake reason" });
    
      const errors = verifyPassword("any value", [fakeRule]);
    
      expect(errors[0]).toContain("fake reason");
    });
  });
});
