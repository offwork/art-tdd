// Bölüm 2, Parça 2
// Listing 2.5.7:  Nested describes with an extracted input
// Konu: Structure implying context
import { verifyPassword } from "../listing-2.4-password-verifier-v1";

describe("verifyPassword", () => {
  describe("with a failing rule", () => {
    const fakeRule = (input: string) => ({ passed: false, reason: "fake reason" });
    test("returns errors", () => {
    
      const errors = verifyPassword("any value", [fakeRule]);
    
      expect(errors[0]).toContain("fake reason");
    });
  });
});
