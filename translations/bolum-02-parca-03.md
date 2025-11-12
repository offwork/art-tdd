# Bölüm 2, Parça 3 (Sayfa 35-51)

## 2.9 Parametreli testlere yeniden yapılandırma

Verifier sınıfından uzaklaşarak, verifier için yeni bir özel kural oluşturma ve test etme üzerinde çalışalım. Listing 2.19, büyük harf için basit bir kural gösteriyor (Bu gereksinimlere sahip şifrelerin artık iyi bir fikir olmadığının farkındayım, ancak gösterim amaçları için sorun yok).

**Listing 2.19 Şifre kuralları**
```javascript
const oneUpperCaseRule = (input) => {
  return {
    passed: (input.toLowerCase() !== input),
    reason: 'at least one upper case needed'
  };
};
```

Aşağıdaki listede olduğu gibi birkaç test yazabiliriz.

**Listing 2.20 Bir kuralı varyasyonlarla test etmek**
```javascript
describe('one uppercase rule', function () {
  test('given no uppercase, it fails', () => {
    const result = oneUpperCaseRule('abc');
    expect(result.passed).toEqual(false);
  });
  
  test('given one uppercase, it passes', () => {
    const result = oneUpperCaseRule('Abc');
    expect(result.passed).toEqual(true);
  });
  
  test('given a different uppercase, it passes', () => {
    const result = oneUpperCaseRule('aBc');
    expect(result.passed).toEqual(true);
  });
});
```

Listing 2.20'de, iş biriminin girdisinde küçük varyasyonlarla aynı senaryoyu deniyorsak sahip olabileceğimiz bazı tekrarları vurguladım. Bu durumda, büyük harfin nerede olduğunun önemli olmadığını, orada olduğu sürece test etmek istiyoruz. Ancak bu tekrar, büyük harf mantığını değiştirmek istediğimizde veya bu kullanım durumu için iddiaları bir şekilde düzeltmemiz gerektiğinde ileride bize zarar verecektir.

JavaScript'te parametreli testler oluşturmanın birkaç yolu vardır ve Jest zaten dahili olarak bir tane içerir: `test.each` (ayrıca `it.each` olarak da adlandırılır). Bir sonraki liste, testlerimizdeki tekrarı kaldırmak için bu özelliği nasıl kullanabileceğimizi gösterir.

**Listing 2.21 test.each kullanımı**
```javascript
describe('one uppercase rule', () => {
  test('given no uppercase, it fails', () => {
    const result = oneUpperCaseRule('abc');
    expect(result.passed).toEqual(false);
  });
  
  test.each(['Abc',      // ❶
             'aBc'])     // ❶
    ('given one uppercase, it passes', (input) => {  // ❷
      const result = oneUpperCaseRule(input);
      expect(result.passed).toEqual(true);
    });
});
```

❶ Girdi parametresine eşlenen bir değerler dizisi geçiriyoruz  
❷ Dizide geçirilen her girdi parametresini kullanıyoruz

Bu örnekte, test dizideki her değer için bir kez tekrarlanacaktır. İlk başta biraz fazla ama bu yaklaşımı denediğinizde kullanımı kolay hale gelir. Ayrıca oldukça okunabilir.

Birden fazla parametre geçirmek istiyorsak, bunları bir dizide kapatıp gösterebiliriz, aşağıdaki listede olduğu gibi.

**Listing 2.22 test.each'i yeniden yapılandırma**
```javascript
describe('one uppercase rule', () => {
  test.each([
    ['Abc', true],   // ❶
    ['aBc', true],
    ['abc', false]   // ❷
  ])
  ('given %s, %s ', (input, expected) => {  // ❸
    const result = oneUpperCaseRule(input);
    expect(result.passed).toEqual(expected);
  });
});
```

❶ Her biri iki parametreli üç dizi sağlıyoruz  
❷ Eksik büyük harf karakteri için yeni bir false beklentisi  
❸ Jest dizi değerlerini argümanlara otomatik olarak eşler

Yine de Jest kullanmak zorunda değiliz. JavaScript, istediğimiz takdirde kendi parametreli testimizi oldukça kolayca oluşturmamıza izin verecek kadar çok yönlüdür.

**Listing 2.23 Vanilla JavaScript for kullanımı**
```javascript
describe('one uppercase rule, with vanilla JS for', () => {
  const tests = {
    'Abc': true,
    'aBc': true,
    'abc': false,
  };
  
  for (const [input, expected] of Object.entries(tests)) {
    test(`given ${input}, ${expected}`, () => {
      const result = oneUpperCaseRule(input);
      expect(result.passed).toEqual(expected);
    });
  }
});
```

Hangisini kullanmak istediğiniz size kalmış (ben basit tutmayı ve `test.each` kullanmayı tercih ediyorum). Mesele şu ki, Jest sadece bir araçtır. Parametreli testler deseni birden fazla şekilde uygulanabilir. Bu desen bize çok fazla güç verir, ama aynı zamanda çok fazla sorumluluk da getirir. Bu tekniği kötüye kullanmak ve anlaşılması daha zor testler oluşturmak gerçekten kolaydır.

Genellikle tüm tablo için aynı senaryonun (girdi türünün) geçerli olduğundan emin olmaya çalışırım. Bu testi bir kod incelemesinde inceliyor olsaydım, yazan kişiye bu testin aslında iki farklı senaryoyu test ettiğini söylerdim: biri büyük harf olmayan ve birkaçı bir büyük harf içeren. Bunları iki farklı teste ayırırdım.

Bu örnekte, birçok testen kurtulup hepsini büyük bir `test.each`'e koymak çok kolay olduğunu göstermek istedim—okunabilirliğe zarar verse bile—bu yüzden bu özel makasla koşarken dikkatli olun.

## 2.10 Beklenen fırlatılan hataları kontrol etme

Bazen doğru zamanda doğru veriyle bir hata fırlatan bir kod parçası tasarlamamız gerekir. Aşağıdaki listede olduğu gibi, yapılandırılmış kural yoksa bir hata fırlatan verify fonksiyonuna kod eklersek ne olur?

**Listing 2.24 Hata fırlatma**
```javascript
verify (input) {
  if (this.rules.length === 0) {
    throw new Error('There are no rules configured');
  }
  // ...
}
```

Onu eski yöntemle `try/catch` kullanarak test edebilir ve hata almazsak testi başarısız yapabiliriz.

**Listing 2.25 İstisnaları try/catch ile test etme**
```javascript
test('verify, with no rules, throws exception', () => {
  const verifier = makeVerifier();
  
  try {
    verifier.verify('any input');
    fail('error was expected but not thrown');
  } catch (e) {
    expect(e.message).toContain('no rules configured');
  }
});
```

> **fail() kullanımı**
>
> Teknik olarak, `fail()` Jest'in dayandığı orijinal Jasmine çatalından kalan bir API'dir. Test başarısızlığını tetiklemenin bir yoludur, ancak resmi Jest API dokümanlarında yoktur ve bunun yerine `expect.assertions(1)` kullanmanızı önerirler. Bu, hiçbir zaman `catch()` beklentisine ulaşmazsanız testi başarısız yapar. `fail()` hala çalıştığı sürece, amaçlarım için işi oldukça güzel yapıyor, bu da neden birim testinde elinizden geldiğince `try/catch` yapısını kullanmamanız gerektiğini göstermektir.

Bu `try/catch` deseni etkili bir yöntem ancak çok ayrıntılı ve yazmak için can sıkıcıdır. Jest, diğer çoğu framework gibi, `expect().toThrowError()` kullanarak tam olarak bu tür senaryoyu başarmak için bir kısayol içerir.

**Listing 2.26 expect().toThrowError() kullanımı**
```javascript
test('verify, with no rules, throws exception', () => {
  const verifier = makeVerifier();
  expect(() => verifier.verify('any input'))
    .toThrowError(/no rules configured/);  // ❶
});
```

❶ Tam dizeyi aramak yerine düzenli ifade eşleşmesi kullanımı

Hata dizesinin belirli bir dize içerdiğini kontrol etmek için, ona eşit olmak yerine düzenli ifade eşleşmesi kullandığımı fark edin, böylece test dize kenarlarında değişirse biraz daha gelecek güvenli olsun. `toThrowError`'ın birkaç varyasyonu vardır ve https://jestjs.io/ adresinde hepsi hakkında bilgi bulabilirsiniz.

> **Jest snapshot'ları**
>
> Jest'in Snapshot'lar adlı benzersiz bir özelliği vardır. Bir bileşeni render etmenizi (React gibi bir framework'te çalışırken) ve ardından mevcut render'ı tüm özellikleri ve HTML'si dahil olmak üzere o bileşenin kaydedilmiş bir snapshot'ıyla eşleştirmenizi sağlar.
>
> Bundan çok fazla bahsetmeyeceğim, ancak gördüğüm kadarıyla bu özellik oldukça fazla kötüye kullanılma eğilimindedir. Şu şekilde görünen, okunması zor testler oluşturmak için kullanabilirsiniz:
>
> ```javascript
> it('renders',()=>{
>   expect(<MyComponent/>).toMatchSnapshot(); 
> });
> ```
>
> Bu kapalıdır (neyin test edildiğini anlamak zordur) ve birbiriyle ilgili olmayabilecek birçok şeyi test eder. Ayrıca umursamayabileceğiniz birçok nedenden dolayı bozulacaktır, bu nedenle o testin bakım maliyeti zamanla daha yüksek olacaktır. Ayrıca okunabilir ve sürdürülebilir testler yazmamak için harika bir mazeret, çünkü son teslim tarihindesiniz ama yine de test yazdığınızı göstermeniz gerekiyor. Evet, bir amaca hizmet ediyor, ancak diğer test türlerinin daha alakalı olduğu yerlerde kullanmak kolay.
>
> Bunun bir varyasyonuna ihtiyacınız varsa, bunun yerine `toMatchInlineSnapshot()` kullanmayı deneyin. Daha fazla bilgiyi https://jestjs.io/docs/en/snapshot-testing adresinde bulabilirsiniz.

## 2.11 Test kategorilerini ayarlama

Yalnızca belirli bir test kategorisi çalıştırmak isterseniz, örneğin yalnızca birim testleri veya yalnızca entegrasyon testleri veya yalnızca uygulamanın belirli bir bölümüne dokunan testler, Jest şu anda test durumu kategorileri tanımlama yeteneğine sahip değil.

Yine de her şey kayıp değil. Jest'in, Jest'in testlerimizi nasıl bulacağını tanımlamamıza izin veren özel bir `--testPathPattern` komut satırı bayrağı vardır. Bu komutu, çalıştırmak istediğimiz belirli bir test türü için farklı bir yol ile tetikleyebiliriz (örneğin "'integration' klasörü altındaki tüm testler"). Tüm ayrıntıları https://jestjs.io/docs/en/cli adresinde bulabilirsiniz.

Bir başka alternatif, her biri kendi `testRegex` yapılandırması ve diğer özellikleriyle olmak üzere her test kategorisi için ayrı bir jest.config.js dosyası oluşturmaktır.

**Listing 2.27 Ayrı jest.config.js dosyaları oluşturma**
```javascript
// jest.config.integration.js
var config = require('./jest.config')
config.testRegex = "integration\\.js$" 
module.exports = config

// jest.config.unit.js
var config = require('./jest.config')
config.testRegex = "unit\\.js$" 
module.exports = config
```

Ardından, her kategori için Jest komut satırını özel bir yapılandırma dosyasıyla çağıran ayrı bir npm script'i oluşturabilirsiniz: `jest -c my.custom.jest.config.js`.

**Listing 2.28 Ayrı npm script'leri kullanımı**
```javascript
//Package.json
// ...
"scripts": {
  "unit": "jest -c jest.config.unit.js",
  "integ": "jest -c jest.config.integration.js"
  // ...
}
```

Bir sonraki bölümde, bağımlılıkları olan ve test edilebilirlik sorunları içeren koda bakacağız ve fake'ler, spy'lar, mock'lar ve stub'lar fikirlerini ve bunları bu tür kodlara karşı test yazmak için nasıl kullanabileceğinizi tartışmaya başlayacağız.

---

## Özet

- **Jest**, JavaScript uygulamaları için popüler, açık kaynaklı bir test çerçevesidir. Aynı anda testler yazarken kullanılacak bir test kütüphanesi, testlerin içinde iddia etmek için bir assertion kütüphanesi, bir test çalıştırıcı ve bir test raporlayıcı görevi görür.

- **Arrange-Act-Assert (AAA)**, testleri yapılandırmak için popüler bir desendir. Tüm testler için basit, tekdüze bir düzen sağlar. Buna alıştığınızda, herhangi bir testi kolayca okuyabilir ve anlayabilirsiniz.

- AAA deseninde, **arrange** bölümü test altındaki sistemi ve bağımlılıklarını istenen bir duruma getirdiğiniz yerdir. **Act** bölümünde, metotları çağırır, hazırlanmış bağımlılıkları geçirir ve çıktı değerini (varsa) yakalarsınız. **Assert** bölümünde, sonucu doğrularsınız.

- Testleri adlandırmak için iyi bir desen, testin adına **test altındaki iş birimini**, **birime gelen senaryo veya girdileri** ve **beklenen davranış veya çıkış noktasını** dahil etmektir. Bu desen için kullanışlı bir anımsatıcı **USE** (unit, scenario, expectation - birim, senaryo, beklenti) dir.

- Jest, birden fazla ilgili test etrafında daha fazla yapı oluşturmaya yardımcı olan birkaç fonksiyon sağlar. **`describe()`**, birden fazla testi (veya test gruplarını) bir araya gruplamaya izin veren bir kapsam belirleme fonksiyonudur. `describe()` için iyi bir metafor, test veya diğer klasörleri içeren bir klasördür. **`test()`**, bireysel bir testi belirten bir fonksiyondur. **`it()`**, `test()` için bir takma addır, ancak `describe()` ile birlikte kullanıldığında daha iyi okunabilirlik sağlar.

- **`beforeEach()`**, iç içe geçmiş describe ve it fonksiyonları için ortak olan kodu çıkararak tekrardan kaçınmaya yardımcı olur.

- `beforeEach()` kullanımı genellikle, bir testin ne yaptığını anlamak için çeşitli yerlere bakmanız gereken **scroll fatigue** (kaydırma yorgunluğuna) yol açar.

- Düz testlerle (herhangi bir `beforeEach()` olmadan) **factory method'lar**, okunabilirliği geliştirir ve scroll fatigue'den kaçınmaya yardımcı olur.

- **Parametreli testler**, benzer testler için gereken kod miktarını azaltmaya yardımcı olur. Dezavantajı, testleri daha genel hale getirdiğinizde daha az okunabilir hale gelmeleridir.

- Test okunabilirliği ve kod yeniden kullanımı arasında bir denge sağlamak için, yalnızca **girdi değerlerini parametreleştirin**. Farklı çıktı değerleri için ayrı testler oluşturun.

- Jest test kategorilerini desteklemez, ancak `--testPathPattern` bayrağını kullanarak test gruplarını çalıştırabilirsiniz. Ayrıca yapılandırma dosyasında `testRegex` ayarlayabilirsiniz.
