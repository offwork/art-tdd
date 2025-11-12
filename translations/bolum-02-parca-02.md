# Bölüm 2: İlk Birim Testi (Parça 2)

**Kaynak:** JSUnitTest02.pdf, Sayfa 18-34

---

## 2.5.5 describe() Kullanımı

Jest'in `describe()` fonksiyonunu testlerimizin etrafında biraz daha yapı oluşturmak ve USE bilgi parçalarının üçünü birbirinden ayırmaya başlamak için kullanabiliriz. Bu adım ve sonraki adımlar tamamen size kalmış—testinizi ve okunabilirlik yapısını nasıl stillendirmek istediğinize karar verebilirsiniz. Bu adımları gösteriyorum çünkü birçok insan ya `describe()`'ı etkili bir şekilde kullanmıyor ya da tamamen göz ardı ediyor. Oldukça kullanışlı olabilir.

`describe()` fonksiyonları testlerimizi bağlamla sarıyor: hem okuyucu için mantıksal bağlam, hem de testin kendisi için işlevsel bağlam. Bir sonraki liste bunları kullanmaya nasıl başlayabileceğimizi gösteriyor.

**Liste 2.6** Bir describe() bloğu ekleme

```javascript
describe('verifyPassword', () => {
  test('given a failing rule, returns errors', () => {
    const fakeRule = input =>
      ({ passed: false, reason: 'fake reason' });
    const errors = verifyPassword('any value', [fakeRule]);
    expect(errors[0]).toContain('fake reason');
  });
});
```

Burada dört değişiklik yaptım:

- Test altındaki iş birimini açıklayan bir `describe()` bloğu ekledim. Bana bu daha açık görünüyor. Ayrıca artık o bloğun altına daha fazla yuvalanmış test ekleyebileceğim gibi hissediyorum. Bu `describe()` bloğu aynı zamanda komut satırı raporlayıcısının daha güzel raporlar oluşturmasına yardımcı oluyor.
- Testi yeni bloğun altına yuvaladım ve testten iş biriminin adını kaldırdım.
- Sahte kuralın reason string'ine girdiyi ekledim.
- Özellikle ekibe yeni birisi için testi daha okunabilir yapmak amacıyla arrange, act ve assert kısımları arasına boş satır ekledim.

## 2.5.6 Yapı ile Bağlam Oluşturma

`describe()`'ın güzel yanı, kendi altında yuvalanabilmesidir. Yani senaryoyu açıklayan başka bir seviye oluşturmak için kullanabiliriz ve onun altına testimizi yuvalayabiliriz.

**Liste 2.7** Ekstra bağlam için yuvalanmış describe'lar

```javascript
describe('verifyPassword', () => {
  describe('with a failing rule', () => {
    test('returns errors', () => {
      const fakeRule = input => ({ passed: false,
                                  reason: 'fake reason' });
      const errors = verifyPassword('any value', [fakeRule]);
      expect(errors[0]).toContain('fake reason');
    });
  });
});
```

Bazı insanlar bundan nefret edecek, ama bence belli bir zarafeti var. Bu yuvalama, üç kritik bilgi parçasını kendi seviyelerine ayırmamıza olanak tanıyor. Aslında, eğer istersen sahte kuralı da testin dışına, ilgili `describe()` bloğunun hemen altına çıkartabiliriz.

**Liste 2.8** Çıkartılmış girdili yuvalanmış describe'lar

```javascript
describe('verifyPassword', () => {
  describe('with a failing rule', () => {
    const fakeRule = input => ({ passed: false,
                                reason: 'fake reason' });
    
    test('returns errors', () => {
      const errors = verifyPassword('any value', [fakeRule]);
      expect(errors[0]).toContain('fake reason');
    });
  });
});
```

Bir sonraki örnek için, bu kuralı tekrar testin içine taşıyacağım (şeylerin birbirine yakın olmasını seviyorum—bununla ilgili daha sonra daha fazla bilgi).

Bu yuvalama yapısı aynı zamanda belirli bir senaryonun altında birden fazla beklenen davranışa sahip olabileceğinizi çok güzel bir şekilde ima ediyor. Bir senaryo altında birden fazla çıkış noktasını kontrol edebilirsiniz, her biri ayrı bir test olarak, ve bu yine de okuyucu açısından mantıklı olacaktır.

## 2.5.7 it() Fonksiyonu

Şimdiye kadar oluşturduğum bulmacaya eksik bir parça var. Jest ayrıca bir `it()` fonksiyonu da sunar. Bu fonksiyon, tüm amaçlar için `test()` fonksiyonunun bir takma adıdır, ancak şimdiye kadar özetlenen describe-güdümlü yaklaşım açısından sözdizimsel olarak daha uyumlu.

Bir sonraki liste, `test()`'i `it()` ile değiştirdiğimde testin nasıl göründüğünü gösteriyor.

**Liste 2.9** test()'i it() ile değiştirme

```javascript
describe('verifyPassword', () => {
  describe('with a failing rule', () => {
    it('returns errors', () => {
      const fakeRule = input => ({ passed: false,
                                  reason: 'fake reason' });
      const errors = verifyPassword('any value', [fakeRule]);
      expect(errors[0]).toContain('fake reason');
    });
  });
});
```

Bu testte, `it`'in neye atıfta bulunduğunu anlamak çok kolay. Bu, önceki `describe()` bloklarının doğal bir uzantısıdır. Yine, bu stili kullanmak isteyip istemediğiniz size kalmış. Bunu nasıl düşünmeyi sevdiğimin bir varyasyonunu gösteriyorum.

## 2.5.8 İki Jest Stili

Gördüğünüz gibi, Jest testleri yazmanın iki ana yolunu destekler: kısa bir test sözdizimi ve daha describe-güdümlü (yani hiyerarşik) bir sözdizimi.

Describe-güdümlü Jest sözdizimi büyük ölçüde Jasmine'e atfedilebilir; JavaScript'in en eski test çerçevelerinden biridir. Stilin kendisi Ruby dünyasına ve tanınmış RSpec Ruby test çerçevesine kadar uzanabilir. Bu yuvalanmış stil genellikle BDD stili olarak adlandırılır; behavior-driven development'a (davranış güdümlü geliştirme) atıfta bulunur.

Bu stilleri istediğiniz gibi karıştırıp eşleştirebilirsiniz (ben yapıyorum). Test hedefinizi ve tüm bağlamını anlamak kolay olduğunda, fazla zahmete girmeden test sözdizimini kullanabilirsiniz. describe sözdizimi, aynı senaryo altında aynı giriş noktasından birden fazla sonuç beklediğinizde yardımcı olabilir. Her ikisini de burada gösteriyorum çünkü bazen kısa test stilini, bazen de describe-güdümlü stili kullanıyorum; bu karmaşıklık ve ifade gereksinimleri etmenine bağlı.

### BDD'nin Karanlık Bugünü

BDD'nin bahsetmeye değer oldukça ilginç bir geçmişi var. BDD, TDD ile ilgili değildir. Terimi icat etmekle en çok ilişkilendirilen kişi olan Dan North, BDD'yi bir uygulamanın nasıl davranması gerektiğini tanımlamak için hikayeler ve örnekler kullanmak olarak tanımlar. Esas olarak bu, teknik olmayan paydaşlarla çalışmaya yöneliktir—ürün sahipleri, müşteriler vb. RSpec (RBehave'den ilham alarak) hikaye güdümlü yaklaşımı kitlelere getirdi ve bu süreçte, ünlü Cucumber da dahil olmak üzere birçok başka çerçeve ortaya çıktı.

Bu hikayenin karanlık bir tarafı da var: birçok çerçeve geliştirilmiş ve yalnızca geliştiriciler tarafından, teknik olmayan paydaşlarla çalışmadan kullanılmış; BDD'nin ana fikirlerine tamamen ters düşerek.

Bugün, bana göre, BDD çerçeveleri terimi esas olarak "biraz sözdizimsel şekeri olan test çerçeveleri" anlamına geliyor, çünkü paydaşlar arasında gerçek konuşmalar oluşturmak için neredeyse hiç kullanılmıyorlar ve neredeyse her zaman sadece geliştirici tabanlı otomatik testler gerçekleştirmek için başka bir parlak veya reçetelenen araç olarak kullanılıyorlar. Güçlü Cucumber'ın bile bu kalıba düştüğünü gördüm.

## 2.5.9 Üretim Kodunu Yeniden Yapılandırma

JavaScript'te aynı şeyi oluşturmanın birçok yolu olduğu için, tasarımımızda birkaç varyasyon göstermek ve değiştirirsek ne olacağını düşündüm. Parola doğrulayıcıyı duruma sahip bir nesne yapmak istediğimizi varsayalım.

Tasarımı durum bilgili bir tasarıma değiştirmenin bir nedeni, uygulamanın farklı bölümlerinin bu nesneyi kullanmasını amaçlıyor olmam olabilir. Bir bölüm onu yapılandırıp kurallar ekleyecek, farklı bir bölüm ise doğrulama yapmak için kullanacak. Bir başka neden, durum bilgili bir tasarımı nasıl ele alacağımızı bilmemiz ve testlerimizi hangi yönlere çektiğini ve bununla ilgili neler yapabileceğimizi görmemiz gerektiğidir.

Önce üretim koduna bakalım.

**Liste 2.10** Bir fonksiyonu durum bilgili bir sınıfa yeniden yapılandırma

```javascript
class PasswordVerifier1 {
  constructor () {
    this.rules = [];
  }
  
  addRule (rule) {
    this.rules.push(rule);
  }
  
  verify (input) {
    const errors = [];
    this.rules.forEach(rule => {
      const result = rule(input);
      if (result.passed === false) {
        errors.push(result.reason);
      }
    });
    return errors;
  }
}
```

Liste 2.9'dan ana değişiklikleri vurguladım. Burada gerçekten özel bir şey olmuyor, nesne yönelimli bir geçmişten geliyorsanız bu daha rahat hissettirebilir. Bu işlevselliği tasarlamanın sadece bir yolu olduğunu belirtmek önemlidir. Sınıf tabanlı yaklaşımı kullanıyorum böylece bu tasarımın testi nasıl etkilediğini gösterebilirim.

Bu yeni tasarımda, mevcut senaryo için giriş ve çıkış noktaları nerede? Bir saniye düşünün. İş biriminin kapsamı arttı. Başarısız bir kuralla bir senaryoyu test etmek için, test altındaki birimin durumunu etkileyen iki fonksiyonu çağırmak zorunda kalacağız: `addRule` ve `verify`.

Şimdi testin nasıl görünebileceğine bakalım (değişiklikler her zamanki gibi vurgulanmış).

**Liste 2.11** Durum bilgili iş birimini test etme

```javascript
describe('PasswordVerifier', () => {
  describe('with a failing rule', () => {
    it('has an error message based on the rule.reason', () => {
      const verifier = new PasswordVerifier1();
      const fakeRule = input => ({ passed: false,
                                  reason: 'fake reason'});
      verifier.addRule(fakeRule);
      const errors = verifier.verify('any value');
      expect(errors[0]).toContain('fake reason');
    });
  });
});
```

Şimdiye kadar, çok iyi; burada süslü bir şey olmuyor. İş biriminin yüzeyinin arttığını unutmayın. Artık birlikte çalışması gereken iki ilişkili fonksiyonu kapsıyor (`addRule` ve `verify`). Tasarımın durum bilgili doğası nedeniyle bir bağlantı oluşuyor. Nesneden herhangi bir iç durumu açığa çıkarmadan verimli bir şekilde test etmek için iki fonksiyonu kullanmamız gerekiyor.

Testin kendisi yeterince masum görünüyor. Ama aynı senaryo için birkaç test yazmak istediğimizde ne olur? Birden fazla çıkış noktamız varsa veya aynı çıkış noktasından birden fazla sonuç test etmek istiyorsak bu olur. Örneğin, sadece tek bir hatamız olduğunu doğrulamak istediğimizi varsayalım. Teste şöyle bir satır ekleyebiliriz:

```javascript
verifier.addRule(fakeRule);
const errors = verifier.verify('any value');
expect(errors.length).toBe(1); // ❶ Yeni bir doğrulama
expect(errors[0]).toContain('fake reason');
```

❶ Yeni bir doğrulama

Yeni doğrulama başarısız olursa ne olur? İkinci doğrulama asla yürütülmeyecektir, çünkü test çalıştırıcısı bir hata alacak ve bir sonraki test durumuna geçecektir.

İkinci doğrulamanın da geçip geçmeyeceğini hala bilmek isteriz, değil mi? Bu yüzden belki birincisini yorum satırına almaya ve testi yeniden çalıştırmaya başlarız. Testlerinizi çalıştırmanın sağlıklı bir yolu bu değil. Gerard Meszaros'un xUnit Test Patterns kitabında, testleri test etmek için şeyleri yorum satırına alma insan davranışına assertion roulette (doğrulama rulet oyunu) denir. Test çalıştırmalarınızda birçok kafa karışıklığına ve yanlış pozitiflere yol açabilir (bir şeyin başarısız olduğunu veya geçtiğini düşünmek, ama gerçekte öyle olmadığında).

Bu ekstra kontrolü iyi bir isimle kendi test durumuna ayırmayı tercih ederim:

**Liste 2.12** Aynı çıkış noktasından ekstra bir sonucu kontrol etme

```javascript
describe('PasswordVerifier', () => {
  describe('with a failing rule', () => {
    it('has an error message based on the rule.reason', () => {
      const verifier = new PasswordVerifier1();
      const fakeRule = input => ({ passed: false,
                                  reason: 'fake reason'});
      verifier.addRule(fakeRule);
      const errors = verifier.verify('any value');
      expect(errors[0]).toContain('fake reason');
    });
    
    it('has exactly one error', () => {
      const verifier = new PasswordVerifier1();
      const fakeRule = input => ({ passed: false,
                                  reason: 'fake reason'});
      verifier.addRule(fakeRule);
      const errors = verifier.verify('any value');
      expect(errors.length).toBe(1);
    });
  });
});
```

Bu kötü görünmeye başladı. Evet, assertion roulette sorununu çözdük. Her `it()` ayrı ayrı başarısız olabilir ve diğer test durumunun sonuçlarına müdahale etmez. Ama bedeli ne oldu? Her şey.

Şimdi sahip olduğumuz tüm tekrarlara bakın. Bu noktada, biraz birim test geçmişi olanlarınız kitaba bağırmaya başlayacak: "Bir setup/beforeEach metodu kullan!"

Tamam!

## 2.6 beforeEach() Yolunu Denemek

`beforeEach()`'i henüz tanıtmadım. Bu fonksiyon ve kardeşi `afterEach()`, test durumları için gerekli olan belirli bir durumu kurmak ve temizlemek için kullanılır. Ayrıca `beforeAll()` ve `afterAll()` var; bunları birim test senaryoları için her ne pahasına olursa olsun kullanmaktan kaçınmaya çalışıyorum. Kardeşler hakkında kitabın ilerleyen kısımlarında daha fazla konuşacağız.

`beforeEach()`, testlerimizdeki tekrarları kaldırmamıza yardımcı olabilir çünkü onu yuvaladığımız describe bloğundaki her testten önce bir kez çalışır. Ayrıca onu birden fazla kez yuvalayabiliriz; aşağıdaki liste bunu gösteriyor.

**Liste 2.13** İki seviyede beforeEach() kullanma

```javascript
describe('PasswordVerifier', () => {
  let verifier;
  beforeEach(() => verifier = new PasswordVerifier1()); // ❶
  
  describe('with a failing rule', () => {
    let fakeRule, errors;
    beforeEach(() => { // ❷
      fakeRule = input => ({passed: false, reason: 'fake reason'});
      verifier.addRule(fakeRule);
    });
    
    it('has an error message based on the rule.reason', () => {
      const errors = verifier.verify('any value');
      expect(errors[0]).toContain('fake reason');
    });
    
    it('has exactly one error', () => {
      const errors = verifier.verify('any value');
      expect(errors.length).toBe(1);
    });
  });
});
```

❶ Her testte kullanılacak yeni bir verifier kurulumu
❷ Bu describe() metodu içinde kullanılacak sahte bir kural kurulumu

Tüm o çıkartılmış koda bakın.

İlk `beforeEach()`'te, her test durumu için oluşturulacak yeni bir `PasswordVerifier1` kuruyoruz. Sonraki `beforeEach()`'te, bir sahte kural kuruyor ve o belirli senaryo altındaki her test durumu için yeni verifier'a ekliyoruz. Başka senaryolarımız olsaydı, 6. satırdaki ikinci `beforeEach()` onlar için çalışmazdı, ama ilki çalışırdı.

Testler artık daha kısa görünüyor; ideal olarak bir testte istediğiniz şey bu, onu daha okunabilir ve sürdürülebilir yapmak için. Her testten oluşturma satırını kaldırdık ve aynı üst seviye `verifier` değişkenini yeniden kullandık.

Birkaç uyarı var:

- 6. satırdaki `beforeEach()`'te errors dizisini sıfırlamayı unuttuk. Bu bizi daha sonra ısırabilir.
- Jest varsayılan olarak birim testlerini paralel çalıştırır. Bu, verifier'ı 2. satıra taşımanın paralel testlerle bir soruna neden olabileceği anlamına gelir; verifier paralel çalıştırmada farklı bir test tarafından üzerine yazılabilir ve bu da çalışan testimizin durumunu bozar. Jest, bildiğim diğer dillerdeki çoğu birim test çerçevesinden oldukça farklıdır; çoğu testleri tek bir thread'de, paralel olmayan (en azından varsayılan olarak) bir şekilde çalıştırmaya özen gösterir. Jest ile paralel testlerin bir gerçek olduğunu hatırlamamız gerekir, bu nedenle 2. satırda olduğu gibi paylaşılan üst duruma sahip durum bilgili testler potansiyel olarak sorunlu olabilir ve bilinmeyen nedenlerle başarısız olan kararsız testlere neden olabilir.

Bu sorunların ikisini de yakında düzelteceğiz.

### 2.6.1 beforeEach() ve Kaydırma Yorgunluğu

`beforeEach()`'e yeniden yapılandırma sürecinde birkaç şey kaybettik:

- Sadece `it()` kısımlarını okumaya çalışıyorsam, verifier'ın nerede oluşturulup bildirildiğini söyleyemem. Anlamak için yukarı kaydırmam gerekir.
- Hangi kuralın eklendiğini anlamak için de aynı şey geçerli. Hangi kuralın eklendiğini görmek için `it()`'in bir seviye üstüne bakmam veya `describe()` bloğu açıklamasına bakmam gerekir.

Şu anda, bu o kadar da kötü görünmüyor. Ama bu yapının senaryo listesi boyut olarak arttıkça biraz tüylü hale gelmeye başladığını göreceğiz. Daha büyük dosyalar, test okuyucusunun testlerin bağlamını ve durumunu anlamak için test dosyasında yukarı aşağı kaydırmasını gerektiren kaydırma yorgunluğu dediğim şeyi getirebilir. Bu, testleri sürdürmeyi ve okumayı basit bir okuma eylemi yerine bir angaryaya dönüştürür.

Bu yuvalama raporlama için harikadır, ama testleri sürdürmek ve okumak zorunda olan insanlar için berbattır. Bir şeyin nereden geldiğini bulmaya devam etmek zorunda kalırsanız. Tarayıcının inceleme penceresinde CSS stillerini debug etmeye çalıştıysanız, bu duyguyu bilirsiniz. Belirli bir hücrenin neden bir nedenden dolayı kalın olduğunu görürsünüz. Sonra hangi stilin özel bir tablodaki yuvalanmış hücrelerin içindeki `<div>`'i üçüncü düğüm altında kalın yaptığını görmek için yukarı kaydırırsınız.

Bir adım daha ileri götürürsek ne olacağına bakalım (liste 2.14). Tekrarları kaldırma sürecindeyken, `beforeEach()`'te verify'ı da çağırabilir ve her `it()`'ten fazladan bir satır kaldırabiliriz. Bu temelde AAA deseninden arrange ve act kısımlarını `beforeEach()` fonksiyonuna koymaktır.

**Liste 2.14** Arrange ve act kısımlarını beforeEach()'e itme

```javascript
describe('PasswordVerifier', () => {
  let verifier;
  beforeEach(() => verifier = new PasswordVerifier1());
  
  describe('with a failing rule', () => {
    let fakeRule, errors;
    beforeEach(() => {
      fakeRule = input => ({passed: false, reason: 'fake reason'});
      verifier.addRule(fakeRule);
      errors = verifier.verify('any value');
    });
    
    it('has an error message based on the rule.reason', () => {
      expect(errors[0]).toContain('fake reason');
    });
    
    it('has exactly one error', () => {
      expect(errors.length).toBe(1);
    });
  });
});
```

Kod tekrarı minimuma indirildi, ama şimdi her `it()`'i anlamak istiyorsak errors dizisini nerede ve nasıl aldığımıza da bakmamız gerekiyor.

Hadi iki katına çıkaralım ve birkaç temel senaryo daha ekleyelim ve bu yaklaşımın problem alanı arttıkça ölçeklenip ölçeklenmediğine bakalım.

**Liste 2.15** Ekstra senaryolar ekleme

```javascript
describe('v6 PasswordVerifier', () => {
  let verifier;
  beforeEach(() => verifier = new PasswordVerifier1());
  
  describe('with a failing rule', () => {
    let fakeRule, errors;
    beforeEach(() => {
      fakeRule = input => ({passed: false, reason: 'fake reason'});
      verifier.addRule(fakeRule);
      errors = verifier.verify('any value');
    });
    
    it('has an error message based on the rule.reason', () => {
      expect(errors[0]).toContain('fake reason');
    });
    
    it('has exactly one error', () => {
      expect(errors.length).toBe(1);
    });
  });
  
  describe('with a passing rule', () => {
    let fakeRule, errors;
    beforeEach(() => {
      fakeRule = input => ({passed: true, reason: ''});
      verifier.addRule(fakeRule);
      errors = verifier.verify('any value');
    });
    
    it('has no errors', () => {
      expect(errors.length).toBe(0);
    });
  });
  
  describe('with a failing and a passing rule', () => {
    let fakeRulePass, fakeRuleFail, errors;
    beforeEach(() => {
      fakeRulePass = input => ({passed: true, reason: 'fake success'});
      fakeRuleFail = input => ({passed: false, reason: 'fake reason'});
      verifier.addRule(fakeRulePass);
      verifier.addRule(fakeRuleFail);
      errors = verifier.verify('any value');
    });
    
    it('has one error', () => {
      expect(errors.length).toBe(1);
    });
    
    it('error text belongs to failed rule', () => {
      expect(errors[0]).toContain('fake reason');
    });
  });
});
```

Bunu beğeniyor muyuz? Ben beğenmiyorum. Şimdi birkaç ekstra sorun görüyoruz:

- `beforeEach()` kısımlarında çok fazla tekrar görmeye başlayabilirim.
- Hangi `beforeEach()`'in hangi `it()` durumunu etkilediğine dair daha fazla seçenekle kaydırma yorgunluğu potansiyeli önemli ölçüde arttı.

Gerçek projelerde, `beforeEach()` fonksiyonları test dosyasının çöp kutusu olma eğilimindedir. İnsanlar oraya her türlü test-başlatmalı şeyi atarlar: sadece bazı testlerin ihtiyaç duyduğu şeyler, diğer tüm testleri etkileyen şeyler ve artık kimsenin kullanmadığı şeyler. Herkes önceki başka kişiler de yapmışsa, özellikle mümkün olan en kolay yere şeyleri koymak insan doğasıdır.

`beforeEach()` yaklaşımına çok hevesli değilim. Bu sorunlardan bazılarını azaltıp azaltamayacağımızı görelim ve aynı zamanda tekrarı minimumda tutabilir miyiz.

## 2.7 Factory Method Yolunu Denemek

Factory metodlar, nesneleri veya özel durumları oluşturmamıza yardımcı olan ve aynı mantığı birden fazla yerde yeniden kullanmamızı sağlayan basit yardımcı fonksiyonlardır. Belki liste 2.16'da başarısız ve geçen kurallar için birkaç factory metodu kullanarak bazı tekrarları ve hantal hissettiren kodu azaltabiliriz.

**Liste 2.16** Karışıma birkaç factory metodu ekleme

```javascript
describe('PasswordVerifier', () => {
  let verifier;
  beforeEach(() => verifier = new PasswordVerifier1());
  
  describe('with a failing rule', () => {
    let errors;
    beforeEach(() => {
      verifier.addRule(makeFailingRule('fake reason'));
      errors = verifier.verify('any value');
    });
    
    it('has an error message based on the rule.reason', () => {
      expect(errors[0]).toContain('fake reason');
    });
    
    it('has exactly one error', () => {
      expect(errors.length).toBe(1);
    });
  });
  
  describe('with a passing rule', () => {
    let errors;
    beforeEach(() => {
      verifier.addRule(makePassingRule());
      errors = verifier.verify('any value');
    });
    
    it('has no errors', () => {
      expect(errors.length).toBe(0);
    });
  });
  
  describe('with a failing and a passing rule', () => {
    let errors;
    beforeEach(() => {
      verifier.addRule(makePassingRule());
      verifier.addRule(makeFailingRule('fake reason'));
      errors = verifier.verify('any value');
    });
    
    it('has one error', () => {
      expect(errors.length).toBe(1);
    });
    
    it('error text belongs to failed rule', () => {
      expect(errors[0]).toContain('fake reason');
    });
  });
  
  // ...
  
  const makeFailingRule = (reason) => {
    return (input) => {
      return { passed: false, reason: reason };
    };
  };
  
  const makePassingRule = () => (input) => {
    return { passed: true, reason: '' };
  };
});
```

`makeFailingRule()` ve `makePassingRule()` factory metodları `beforeEach()` fonksiyonlarımızı biraz daha açık hale getirdi.

### 2.7.1 beforeEach()'i Factory Metodlarla Tamamen Değiştirme

Ya çeşitli şeyleri başlatmak için `beforeEach()`'i hiç kullanmasaydık? Bunun yerine küçük factory metodlara geçseydik? Bunun nasıl göründüğüne bakalım.

**Liste 2.17** beforeEach()'i factory metodlarla değiştirme

```javascript
const makeVerifier = () => new PasswordVerifier1();

const passingRule = (input) => ({passed: true, reason: ''});

const makeVerifierWithPassingRule = () => {
  const verifier = makeVerifier();
  verifier.addRule(passingRule);
  return verifier;
};

const makeVerifierWithFailedRule = (reason) => {
  const verifier = makeVerifier();
  const fakeRule = input => ({passed: false, reason: reason});
  verifier.addRule(fakeRule);
  return verifier;
};

describe('PasswordVerifier', () => {
  describe('with a failing rule', () => {
    it('has an error message based on the rule.reason', () => {
      const verifier = makeVerifierWithFailedRule('fake reason');
      const errors = verifier.verify('any input');
      expect(errors[0]).toContain('fake reason');
    });
    
    it('has exactly one error', () => {
      const verifier = makeVerifierWithFailedRule('fake reason');
      const errors = verifier.verify('any input');
      expect(errors.length).toBe(1);
    });
  });
  
  describe('with a passing rule', () => {
    it('has no errors', () => {
      const verifier = makeVerifierWithPassingRule();
      const errors = verifier.verify('any input');
      expect(errors.length).toBe(0);
    });
  });
  
  describe('with a failing and a passing rule', () => {
    it('has one error', () => {
      const verifier = makeVerifierWithFailedRule('fake reason');
      verifier.addRule(passingRule);
      const errors = verifier.verify('any input');
      expect(errors.length).toBe(1);
    });
    
    it('error text belongs to failed rule', () => {
      const verifier = makeVerifierWithFailedRule('fake reason');
      verifier.addRule(passingRule);
      const errors = verifier.verify('any input');
      expect(errors[0]).toContain('fake reason');
    });
  });
});
```

Buradaki uzunluk liste 2.16'dakiyle hemen hemen aynı, ama kodu daha okunabilir ve dolayısıyla daha kolay bakıma alınabilir buluyorum. `beforeEach()` fonksiyonlarını ortadan kaldırdık, ama bakım yapılabilirliği kaybetmedik. Ortadan kaldırdığımız tekrar miktarı ihmal edilebilir düzeyde, ancak yuvalanmış `beforeEach()` bloklarının kaldırılması sayesinde okunabilirlik büyük ölçüde iyileşti.

Dahası, kaydırma yorgunluğu riskini azalttık. Testin bir okuyucusu olarak, bir nesnenin ne zaman oluşturulduğunu veya bildirildiğini bulmak için dosyada yukarı aşağı kaydırmak zorunda değilim. Tüm bilgiyi `it()`'ten çıkarabiliyorum. Bir şeyin nasıl oluşturulduğunu bilmemize gerek yok, ama ne zaman oluşturulduğunu ve hangi önemli parametrelerle başlatıldığını biliyoruz. Her şey açıkça açıklanmış.

Eğer ihtiyaç ortaya çıkarsa, belirli factory metodlarına dalabilirim ve her `it()`'in kendi durumunu kapsülleyerek yapmasını seviyorum. Yuvalanmış `describe()` yapısı nerede olduğumuzu bilmek için iyi bir yol, ama durum `it()` bloklarının içinden tetiklenir, dışından değil.

## 2.8 test() ile Tam Döngü

Liste 2.17'deki testler, `describe()` bloklarının sadece anlama için ek şeker görevi görecek kadar kendi içinde kapsüllenmiş. İstersek onları kullanmamız gerekmez. İstersek, testleri aşağıdaki listede olduğu gibi yazabiliriz.

**Liste 2.18** Yuvalanmış describe'ları kaldırma

```javascript
test('pass verifier, with failed rule, ' +
     'has an error message based on the rule.reason', () => {
  const verifier = makeVerifierWithFailedRule('fake reason');
  const errors = verifier.verify('any input');
  expect(errors[0]).toContain('fake reason');
});

test('pass verifier, with failed rule, has exactly one error', () => {
  const verifier = makeVerifierWithFailedRule('fake reason');
  const errors = verifier.verify('any input');
  expect(errors.length).toBe(1);
});

test('pass verifier, with passing rule, has no errors', () => {
  const verifier = makeVerifierWithPassingRule();
  const errors = verifier.verify('any input');
  expect(errors.length).toBe(0);
});

test('pass verifier, with passing and failing rule,' +
     ' has one error', () => {
  const verifier = makeVerifierWithFailedRule('fake reason');
  verifier.addRule(passingRule);
  const errors = verifier.verify('any input');
  expect(errors.length).toBe(1);
});

test('pass verifier, with passing and failing rule,' +
     ' error text belongs to failed rule', () => {
  const verifier = makeVerifierWithFailedRule('fake reason');
  verifier.addRule(passingRule);
  const errors = verifier.verify('any input');
  expect(errors[0]).toContain('fake reason');
});
```

Factory metodlar bize ihtiyaç duyduğumuz tüm işlevselliği sağlıyor, her bir spesifik test için netliği kaybetmeden.

Liste 2.18'in özlüğünü biraz seviyorum. Anlaşılması kolay. Describe-sız yaklaşıma gittiğim yerler var ve yuvalanmış describe'ların işleri daha okunabilir hale getirdiği yerler var. Projeniz için okunabilirlik ve bakım yapılabilirliğin tatlı noktası muhtemelen bu iki nokta arasında bir yerdedir.

---

**Çeviri Notu:**
- Sayfa 18-34 aralığı tamamlandı
- describe() ve beforeEach() kullanımları detaylı incelendi
- Factory method pattern'i ile test organizasyonu gösterildi
- Kod örnekleri orijinal haliyle korundu
- Terminoloji TERMINOLOGY.md'ye uygun
