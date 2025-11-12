// Bölüm 2, Parça 1 (Sayfa 19-20)
// Listing 2.3: verifyPassword()'a karşı ilk test
// Konu: AAA (Arrange-Act-Assert) pattern örneği

import { verifyPassword } from "../listing-2.2-password-verifier-v0";

test("badly name test", () => {
  //① Test için girdileri hazırlama 
  // Arrange - Hazırlık - 1
  const fakeRule = (input: string) => ({ passed: false, reason: "fake reason" });

  //② Girdilerle giriş noktasını çağırma
  // Act - Eylem - 2
  const errors = verifyPassword("any value", [fakeRule]);

  //③ Çıkış noktasını kontrol etme
  // Assert - Doğrulama
  expect(errors[0]).toMatch("fake reason");
});
