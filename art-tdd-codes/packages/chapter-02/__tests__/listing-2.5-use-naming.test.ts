// Bölüm 2, Parça 1 (Sayfa 22)
// Listing 2.5: USE ile test isimlendirme
// Konu: Unit-Scenario-Expectation naming pattern
import { verifyPassword } from "../listing-2.4-password-verifier-v1";

/**
 * Test adlarına üç bilgi parçası koymayı seviyorum, böylece testin okuyucusu sadece test adına bakarak zihinsel sorularının çoğunu cevaplayabilir. Bu üç parça şunları içerir:
 * 1. Test altındaki iş birimi (verifyPassword fonksiyonu, bu durumda)
 * 2. İş birimine senaryo veya girdiler (başarısız kural)
 * 3. Beklenen davranış veya çıkış noktası (bir nedenle bir hata döndürür)
 * 
 * USE: test altındaki birim (unit), senaryo (scenario), beklenti (expectation).
 */
test("verifyPassword, given a failing rule, returns errors", () => {
  const fakeRule = (input: string) => ({ passed: false, reason: "fake reason" });

  const errors = verifyPassword("any value", [fakeRule]);

  expect(errors[0]).toContain("fake reason");
});
