// Listing 2.13: İki seviyede beforeEach() kullanımı

import { PasswordVerifier1 } from "../listing-2.10-refactoring-function-stateful-class";

/**
 * Birkaç uyarı var:
 *
 * 14. satırdaki `beforeEach()`'te errors dizisini sıfırlamayı unuttuk. Bu bizi daha sonra ısırabilir.
 *
 * Jest varsayılan olarak birim testlerini paralel çalıştırır. Bu, verifier'ı 13. satıra taşımanın 
 * paralel testlerle bir soruna neden olabileceği anlamına gelir; verifier paralel çalıştırmada farklı 
 * bir test tarafından üzerine yazılabilir ve bu da çalışan testimizin durumunu bozar. Jest, bildiğim 
 * diğer dillerdeki çoğu birim test çerçevesinden oldukça farklıdır; çoğu testleri tek bir thread'de, 
 * paralel olmayan (en azından varsayılan olarak) bir şekilde çalıştırmaya özen gösterir. Jest ile 
 * paralel testlerin bir gerçek olduğunu hatırlamamız gerekir, bu nedenle 2. satırda olduğu gibi 
 * paylaşılan üst duruma sahip durum bilgili testler potansiyel olarak sorunlu olabilir ve bilinmeyen 
 * nedenlerle başarısız olan kararsız testlere neden olabilir.
 */
describe("PasswordVerifier", () => {
  let verifier;
  // ❶ Her testte kullanılacak yeni bir verifier kurulumu
  beforeEach(() => (verifier = new PasswordVerifier1()));

  describe("with a failing rule", () => {
    let fakeRule, errors;
    // ❷ Bu describe() metodu içinde kullanılacak sahte bir kural kurulumu
    beforeEach(() => {
      fakeRule = (input: string) => ({ passed: false, reason: "fake reason" });
      verifier.addRule(fakeRule);
    });

    it("has an error message based on the rule.reason", () => {
      const errors = verifier.verify("any value");
      expect(errors[0]).toContain("fake reason");
    });

    it("has exactly one error", () => {
      const errors = verifier.verify("any value");
      expect(errors.length).toBe(1);
    });
  });
});
