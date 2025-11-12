// Bölüm 2, Parça 2
// Listing 2.5: USE ile describe() kullanimi
// Konu: Unit-Scenario-Expectation describe
import { verifyPassword } from "../listing-2.4-password-verifier-v1";

describe("verifyPassword", () => {
  test("given a failing rule, returns errors", () => {
    const fakeRule = (input: string) => ({ passed: false, reason: "fake reason" });
  
    const errors = verifyPassword("any value", [fakeRule]);
  
    expect(errors[0]).toContain("fake reason");
  });
});
