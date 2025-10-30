# Bölüm 1 - Parça 2 (Sayfa 16-30)

### XUnit Test Patterns'in giriş ve çıkış noktaları tanımı

Gerard Meszaros'un *XUnit Test Patterns* (Addison-Wesley Professional, 2007) kitabı, doğrudan girdiler ve çıktılar ile dolaylı girdiler ve çıktılar kavramını tartışır. Doğrudan girdiler, benim giriş noktaları dediğim şeydir. Meszaros kitapta buna bir bileşenin "ön kapısını kullanma" der. O kitaptaki dolaylı çıktılar, bahsettiğim diğer iki çıkış noktası türüdür (durum değişikliği ve üçüncü tarafa çağrı).

Bu fikirlerin her iki versiyonu da paralel olarak gelişti, ancak "iş birimi" fikri yalnızca bu kitapta görünüyor. Giriş ve çıkış noktalarıyla birleştirilmiş bir iş birimi, bana doğrudan ve dolaylı girdiler ve çıktılardan çok daha mantıklı geliyor, ancak bunu test kapsamlarını nasıl öğreteceğiniz konusunda stilistik bir seçim olarak değerlendirebilirsiniz. XUnit Test Patterns hakkında daha fazla bilgiyi xunitpatterns.com adresinde bulabilirsiniz.

Giriş ve çıkış noktaları fikrinin birim testi tanımını nasıl etkilediğine bakalım: Bir birim testi, bir iş birimini çağıran ve o iş biriminin bir çıkış noktasını nihai sonuç olarak kontrol eden bir kod parçasıdır. Nihai sonuç hakkındaki varsayımlar yanlış çıkarsa, birim testi başarısız olmuş demektir. Bir birim testinin kapsamı, giriş noktası ile çıkış noktası arasında kaç fonksiyon ve modülün kullanıldığına bağlı olarak, bir fonksiyon kadar küçük veya birden fazla modül veya bileşen kadar geniş olabilir.

## 1.5 Farklı Çıkış Noktaları, Farklı Teknikler

Çıkış noktası türleri hakkında neden bu kadar zaman harcıyorum? Çünkü sadece her çıkış noktası için testleri ayırmak harika bir fikir olmakla kalmaz, farklı çıkış noktası türleri başarılı bir şekilde test etmek için farklı teknikler gerektirebilir:

- **Dönüş değeri tabanlı çıkış noktaları** (Meszaros'un XUnit Test Patterns'indeki doğrudan çıktılar) test edilmesi en kolay çıkış noktaları olmalıdır. Bir giriş noktasını tetiklersiniz, geri bir şey alırsınız ve geri aldığınız değeri kontrol edersiniz.
- **Durum tabanlı testler** (dolaylı çıktılar) genellikle biraz daha fazla jimnastik gerektirir. Bir şey çağırırsınız ve sonra her şeyin plana göre gittiğini görmek için başka bir şey kontrol etmek üzere başka bir çağrı yaparsınız (veya önceki şeyi tekrar çağırırsınız).

Üçüncü taraf durumunda (dolaylı çıktılar), atlamak için en çok engele sahibiz. Bunu henüz tartışmadık, ancak harici sistemi testlerimizde kontrol edebileceğimiz ve sorgulayabileceğimiz bir şeyle değiştirmek için mock nesneler gibi şeyler kullanmak zorunda kaldığımız yer burasıdır. Bu fikri kitapta daha sonra derinlemesine ele alacağım.

### Hangi çıkış noktaları en çok sorun yaratır?

Genel bir kural olarak, çoğunlukla dönüş değeri tabanlı veya durum tabanlı testler kullanmaya çalışırım. Yapabilirsem mock nesne tabanlı testlerden kaçınmaya çalışırım ve genellikle yapabilirim. Sonuç olarak, genellikle testlerimin %5'inden fazlası doğrulama için mock nesneler kullanmaz. Bu tür testler işleri karmaşıklaştırır ve sürdürülebilirliği daha zor hale getirir. Bazen kaçış yolu yoktur ve sonraki bölümlerde bunları tartışacağız.

## 1.6 Sıfırdan Bir Test

Hadi kodun ilk, en basit versiyonuna (liste 1.1) geri dönelim ve test etmeye çalışalım, olur mu? Bunu test etmeye çalışsaydık, nasıl görünürdü?

Önce görsel yaklaşımı Şekil 1.6 ile ele alalım. Giriş noktamız, `numbers` adlı bir string girdisi olan `sum`'dır. `sum` aynı zamanda çıkış noktamızdır, çünkü ondan bir dönüş değeri alacağız ve değerini kontrol edeceğiz.

```
       ____
      /    \
     / Test \
     \______/
        |
        ↓
    Dönüş değeri
        ↑
        |
        ↓ sum(numbers)
       ____
     /      \
    |   İş   |
    | Birimi |
     \______/
```

**Şekil 1.6** Testimizin görsel bir görünümü

Bir test çerçevesi kullanmadan otomatik bir birim testi yazmak mümkündür. Aslında, geliştiriciler testlerini otomatikleştirme alışkanlığına daha çok girdikleri için, test çerçevelerini keşfetmeden önce bunu yapan çok sayıda geliştirici gördüm. Bu bölümde, böyle bir testi çerçeve olmadan yazacağız, böylece bu yaklaşımı bölüm 2'de bir çerçeve kullanmakla karşılaştırabilirsiniz.

Öyleyse, test çerçevelerinin var olmadığını varsayalım (veya var olduklarını bilmiyoruz). Sıfırdan kendi küçük otomatik testimizi yazmaya karar verdik. Aşağıdaki liste, sade JavaScript ile kendi kodlarımızı test etmenin çok naif bir örneğini gösterir.

**Liste 1.4** sum()'a karşı çok naif bir test

```javascript
const parserTest = () => {
  try {
    const result = sum('1,2');
    if (result === 3) {
      console.log('parserTest example 1 PASSED');
    } else {
      throw new Error(`parserTest: expected 3 but was ${result}`);
    }
  } catch (e) {
    console.error(e.stack);
  }
};
```

Hayır, bu kod güzel değil. Ancak testlerin nasıl çalıştığını açıklamak için yeterince iyi. Bu kodu çalıştırmak için şunları yapabiliriz:

1. Komut satırını açın ve boş bir string yazın.
2. `package.json`'un "scripts" girdisi altındaki "test" altına "node mytest.js" çalıştırmak için bir girdi ekleyin ve sonra komut satırında `npm test` komutunu çalıştırın.

Aşağıdaki liste bunu gösterir.

**Liste 1.5** package.json dosyamızın başlangıcı

```json
{
  "name": "aout3-samples",
  "version": "1.0.0",
  "description": "Code Samples for Art of Unit Testing 3rd Edition",
  "main": "index.js",
  "scripts": {
    "test": "node ./ch1-basics/custom-test-phase1.js",
  }
}
```

Test metodu üretim modülünü (SUT) çağırır ve ardından döndürülen değeri kontrol eder. Beklenilen değilse, test metodu konsola bir hata ve yığın izlemesi yazar. Test metodu ayrıca oluşan tüm istisnaları yakalar ve bunları konsola yazar, böylece sonraki metodların çalışmasına müdahale etmezler. Bir test çerçevesi kullandığımızda, bu genellikle bizim için otomatik olarak ele alınır.

Açıkçası, bu böyle bir test yazmanın geçici bir yoludur. Bunun gibi birden fazla test yazsaydınız, tüm testlerin kullanabileceği ve hataları tutarlı bir şekilde biçimlendirecek genel bir test veya check metoduna sahip olmak isteyebilirsiniz. Ayrıca null nesneleri, boş stringler ve benzeri şeyleri kontrol eden özel yardımcı metodlar ekleyebilirsiniz, böylece birçok testte aynı uzun kod satırlarını yazmanıza gerek kalmaz.

Aşağıdaki liste, testin biraz daha genel bir Check ve assertEquals fonksiyonu uygulamasıyla nasıl görüneceğini gösterir.

**Liste 1.6** Check metodunun daha genel bir uygulamasını kullanma

```javascript
const assertEquals = (expected, actual) => {
  if (actual !== expected) {
    throw new Error(`Expected ${expected} but was ${actual}`);
  }
};

const check = (name, implementation) => {
  try {
    implementation();
    console.log(`${name} passed`);
  } catch (e) {
    console.error(`${name} FAILED`, e.stack);
  }
};

check('sum with 2 numbers should sum them up', () => {
  const result = sum('1,2');
  assertEquals(3, result);
});

check('sum with multiple digit numbers should sum them up', () => {
  const result = sum('10,20');
  assertEquals(30, result);
});
```

Şimdi iki yardımcı metot oluşturduk: konsola yazma veya hata fırlatma için ortak kodu kaldıran `assertEquals` ve test adı için bir string ve uygulama için bir geri çağrı alan `check`. Daha sonra test hatalarını yakalamaktan, bunları konsola yazmaktan ve testin durumunu raporlamaktan sorumlu olur.

### Yerleşik assert'ler

Kendi assert'lerimizi yazmamıza gerek olmadığını belirtmek önemlidir. Node.js'in yerleşik assert fonksiyonlarını kolayca kullanabilirdik, bunlar başlangıçta Node.js'in kendisini test etmek için dahili kullanım için oluşturulmuştur. Bunu şu şekilde fonksiyonları import ederek yapabilirdik:

```javascript
const assert = require('assert');
```

Ancak, kavramın altında yatan basitliğini göstermeye çalışıyorum, bu yüzden bundan kaçınacağız. Node.js'in assert modülü hakkında daha fazla bilgiyi https://nodejs.org/api/assert.xhtml adresinde bulabilirsiniz.

Testlerin sadece birkaç yardımcı metodla nasıl daha okunabilir ve daha hızlı yazılabilir olduğuna dikkat edin. Jest gibi birim testi çerçeveleri bunun gibi daha da fazla genel yardımcı metod sağlayabilir, böylece testler daha da kolay yazılır. Bölüm 2'de bundan bahsedeceğim. Önce, bu kitabın ana konusu hakkında biraz konuşalım: iyi birim testleri.

## 1.7 İyi Bir Birim Testinin Özellikleri

Kullandığınız programlama dili ne olursa olsun, bir birim testini tanımlamanın en zor yönlerinden biri, iyi olanın ne anlama geldiğini tanımlamaktır. Tabii ki, iyi görecelidir ve kod yazmayı öğrendiğimiz her yeni şeyde değişebilir. Bu açık görünebilir, ancak gerçekten değildir. Neden daha iyi testler yazmamız gerektiğini açıklamam gerekiyor - bir iş biriminin ne olduğunu anlamak yeterli değildir.

Kendi deneyimime dayanarak, yıllar boyunca birçok şirketi ve ekibi içeren, kodlarını birim test etmeye çalışan çoğu insan ya bir noktada vazgeçiyor ya da aslında birim testi yapmıyor. Sorunlu testler yazarak çok zaman kaybediyorlar ve bunları korumak için çok zaman harcamak zorunda kaldıklarında vazgeçiyorlar, ya da daha kötüsü, sonuçlarına güvenmiyorlar.

Öğrenmeyi öğrenme sürecinde olmadığınız sürece, kötü bir birim testi yazmanın bir anlamı yoktur. Kötü testler yazmanın, hatalı testleri hata ayıklamak için zaman kaybetmek, hiçbir fayda sağlamayan testler yazmak için zaman kaybetmek, okunamayan testleri anlamaya çalışmak için zaman kaybetmek ve sadece birkaç ay sonra silmek için testler yazmak için zaman kaybetmek gibi, avantajlardan çok dezavantajları vardır. Kötü testleri korumakla ilgili de büyük bir sorun var ve bunların üretim kodunun sürdürülebilirliğini nasıl etkilediği. Kötü testler aslında geliştirme hızınızı yavaşlatabilir, sadece test kodu yazarken değil, aynı zamanda üretim kodu yazarken de. Kitapta daha sonra tüm bu konulara değineceğim.

İyi bir birim testinin ne olduğunu öğrenerek, daha sonra düzeltilmesi zor olacak bir yola başlamadığınızdan emin olabilirsiniz, kod bir kabus haline geldiğinde. Ayrıca kitapta daha sonra diğer test biçimlerini (bileşen, uçtan uca ve daha fazlası) tanımlayacağız.

### 1.7.1 İyi bir birim testi nedir?

Her iyi otomatik test (sadece birim testleri değil) aşağıdaki özelliklere sahip olmalıdır:

- Test yazarının amacını anlamak kolay olmalıdır.
- Okunması ve yazılması kolay olmalıdır.
- Otomatik olmalıdır.
- Sonuçlarında tutarlı olmalıdır (çalıştırmalar arasında hiçbir şeyi değiştirmezseniz her zaman aynı sonucu döndürmelidir).
- Yararlı olmalı ve eyleme geçirilebilir sonuçlar sağlamalıdır.
- Herkes bir düğmeye basarak çalıştırabilmelidir.
- Başarısız olduğunda, neyin beklendiğini tespit etmek ve sorunu belirlemek kolay olmalıdır.

İyi bir birim testi ayrıca aşağıdaki özellikleri de sergilemelidir:

- Hızlı çalışmalıdır.
- Test edilen kod üzerinde tam kontrole sahip olmalıdır (bölüm 3'te daha fazlası).
- Tamamen izole edilmiş olmalıdır (diğer testlerden bağımsız çalışmalıdır).
- Sistem dosyaları, ağlar veya veritabanları gerektirmeden bellekte çalışmalıdır.
- Mantıklı olduğunda mümkün olduğunca senkron ve doğrusal olmalıdır (yardım edebiliyorsak paralel thread yok).

Tüm testlerin iyi bir birim testinin özelliklerini takip etmesi imkansızdır ve bu iyidir. Bu tür testler basitçe entegrasyon testleri alanına geçecektir (1.8. bölümünün konusu). Yine de, testlerinizden bazılarını bu özelliklere uyacak şekilde yeniden düzenlemenin yolları vardır.

**VERITABANINI (VEYA BAŞKA BİR BAĞIMLILIĞI) BİR STUB İLE DEĞİŞTİRME**

Daha sonraki bölümlerde stub'lardan bahsedeceğiz, ancak kısaca, gerçekleri taklit eden sahte bağımlılıklardır. Amaçları, kurulumu ve bakımı daha kolay oldukları için test etme sürecini basitleştirmektir.

Ancak, bellekteki veritabanlarına dikkat edin. Testleri birbirinden izole etmenize yardımcı olabilirler (testler arasında veritabanı örneklerini paylaşmadığınız sürece) ve böylece iyi birim testlerinin özelliklerine uyabilirler, ancak bu tür veritabanları tuhaf, orta bir noktaya yol açar. Bellekteki veritabanları stub'lar kadar kurulumu kolay değildir. Aynı zamanda, gerçek veritabanlar kadar güçlü garantiler sağlamazlar. İşlevsellik açısından, bellekteki bir veritabanı üretim veritabanından büyük ölçüde farklılık gösterebilir, bu nedenle bellekteki veritabanını geçen testler gerçek veritabanında başarısız olabilir ve bunun tersi de geçerlidir. Kodunuzun çalıştığından emin olmak için aynı testleri gerçek veritabanına karşı manuel olarak yeniden çalıştırmanız gerekecektir. Küçük ve standartlaştırılmış bir SQL özelliği seti kullanmadığınız sürece, stub'lara (birim testleri için) veya gerçek veritabanlarına (entegrasyon testi için) bağlı kalmanızı öneririm.

Aynı şey jsdom gibi çözümler için de geçerlidir. Gerçek DOM'u değiştirmek için kullanabilirsiniz, ancak özel kullanım durumlarınızı desteklediğinden emin olun. Manuel olarak yeniden kontrol etmenizi gerektiren testler yazmayın.

**ASENKRONİZE İŞLEMİ DOĞRUSAL, SENKRONİZE TESTLERLE TAKLİT ETME**

Promise'ler ve async/await'in ortaya çıkmasıyla, asenkron kodlama JavaScript'te standart hale geldi. Yine de testlerimiz asenkron kodu senkron olarak doğrulayabilir. Bu genellikle geri çağrıları doğrudan testten tetiklemek veya bir asenkron işlemin yürütmeyi bitirmesini açıkça beklemek anlamına gelir.

### 1.7.2 Birim testi kontrol listesi

Birçok insan, yazılımlarını test etme eylemini birim testi kavramıyla karıştırır. Başlangıç olarak, şimdiye kadar yazdığınız ve çalıştırdığınız testler hakkında kendinize aşağıdaki soruları sorun:

- İki hafta veya ay veya yıl önce yazdığım bir testi çalıştırıp sonuç alabilir miyim?
- Ekibimin herhangi bir üyesi, iki ay önce yazdığım testleri çalıştırıp sonuç alabilir mi?
- Yazdığım tüm testleri birkaç dakikadan fazla olmayan bir sürede çalıştırabilir miyim?
- Yazdığım tüm testleri bir düğmeye basarak çalıştırabilir miyim?
- Birkaç dakikadan fazla olmayan bir sürede basit bir test yazabilir miyim?
- Başka bir ekibin kodunda hatalar olduğunda testlerim geçer mi?
- Testler farklı makinelerde veya ortamlarda çalıştırıldığında aynı sonuçları gösterir mi?
- Veritabanı, ağ veya dağıtım yoksa testlerim çalışmayı bırakır mı?
- Bir testi silersem, taşırsam veya değiştirirsem, diğer testler etkilenmeden kalır mı?

Bu sorulardan herhangi birine "hayır" cevabı verdiyseniz, uyguladığınız şeyin ya tam olarak otomatik olmadığı ya da birim testi olmadığı yüksek bir olasılıktır. Kesinlikle bir tür testtir ve birim testi kadar önemli olabilir, ancak tüm bu sorulara evet cevabı vermenizi sağlayacak testlere kıyasla dezavantajları vardır.

"O zamana kadar ne yapıyordum?" diye sorabilirsiniz. Entegrasyon testi yapıyordunuz.

## 1.8 Entegrasyon Testleri

Daha önce iyi birim testleri için belirtilen koşullardan bir veya daha fazlasına uymayan herhangi bir testi entegrasyon testi olarak değerlendiriyorum. Örneğin, test gerçek ağı, gerçek REST API'leri, gerçek sistem zamanını, gerçek dosya sistemini veya gerçek bir veritabanını kullanıyorsa, entegrasyon testi alanına girmiştir.

Bir test, sistem zamanının kontrolüne sahip değilse, örneğin, ve test kodunda mevcut `new Date()` kullanıyorsa, o zaman test her yürütüldüğünde farklı bir zaman kullandığı için esasen farklı bir testtir. Artık tutarlı değildir. Bu kendi başına kötü bir şey değil. Entegrasyon testlerinin birim testlerinin önemli karşılıkları olduğunu düşünüyorum, ancak daha sonra kitapta tartışılan "güvenli yeşil bölge" hissine ulaşmak için birim testlerinden ayrılmaları gerekir.

Bir test gerçek veritabanını kullanıyorsa, artık sadece bellekte çalışmıyor - eylemleri yalnızca bellekteki sahte verileri kullanmaktan daha zor silinir. Test ayrıca daha uzun sürecek ve veri erişiminin ne kadar süreceğini kolayca kontrol edemeyeceğiz. Birim testleri hızlı olmalıdır. Entegrasyon testleri genellikle çok daha yavaştır. Yüzlerce testiniz olmaya başladığında, her yarım saniye sayılır.

Entegrasyon testleri başka bir sorunu artırır: aynı anda çok fazla şeyi test etme riski. Örneğin, arabanız bozulduğunu varsayalım. Sorunun ne olduğunu nasıl öğrenirsiniz, bir kenara bırakın düzeltin? Bir motor, birlikte çalışan birçok alt sistemden oluşur, her biri diğerlerine güvenerek nihai sonucu üretmeye yardımcı olur: hareket eden bir araba. Araba hareket etmeyi durdurursa, hata herhangi bir alt sistemde olabilir - ya da birden fazlasında. Bu alt sistemlerin (veya katmanların) entegrasyonu arabayı yolda hareket ettirir. Araba yoldan giderken bunu parçaların nihai entegrasyon testi olarak düşünebilirsiniz. Test başarısız olursa, tüm parçalar birlikte başarısız olur; başarılı olursa, tüm parçalar başarılı olur.

Yazılımda da aynı şey olur. Çoğu geliştiricinin işlevselliklerini test etme yöntemi, uygulamanın nihai işlevselliği, REST API veya kullanıcı arayüzü aracılığıyladır. Bir düğmeyi tıklamak bir dizi olayı tetikler - fonksiyonlar, modüller ve bileşenler nihai sonucu üretmek için birlikte çalışır. Test başarısız olursa, tüm bu yazılım bileşenleri bir ekip olarak başarısız olur ve genel işlemin başarısızlığına neyin sebep olduğunu bulmak zor olabilir (bkz. Şekil 1.7).

```
                    Hata noktaları
                          |
         /----------------+----------------\
        /                 |                 \
    Browser    HAProxy    NGINX    Web app    List
    Sayfa    cdn.site.com foo.site.com        
             bar.site.com  Microservice  Queues
                           
                    Golang     PostgreSQL
                    Web app    Books
                    Workers
         \                |                  /
          \---------------+------------------/
                    Hata noktaları
```

**Şekil 1.7** Entegrasyon testinde birçok hata noktanız olabilir. Tüm birimlerin birlikte çalışması gerekir ve her biri arızalanabilir, bu da bir hatanın kaynağını bulmayı zorlaştırır.

Bill Hetzel'in *The Complete Guide to Software Testing* (Wiley, 1988) kitabında tanımlandığı gibi, entegrasyon testi "yazılım ve/veya donanım öğelerinin birleştirilip test edildiği, tüm sistem entegre edilene kadar devam eden düzenli bir test ilerlemesidir". İşte entegrasyon testini tanımlamanın kendi varyasyonum:

> Entegrasyon testi, diğer ekiplerin bileşenleri, diğer servisler, zaman, ağ, veritabanlar, thread'ler, rastgele sayı üreticileri ve daha fazlası gibi tüm gerçek bağımlılıkları üzerinde tam kontrole sahip olmadan bir iş birimini test etmektir.

Özetlemek gerekirse, bir entegrasyon testi gerçek bağımlılıkları kullanır; birim testleri, iş birimini bağımlılıklarından izole eder, böylece sonuçlarında kolayca tutarlı olurlar ve iş biriminin davranışının herhangi bir yönünü kolayca kontrol edebilir ve simüle edebilirler.

1.7.2. bölümündeki soruları entegrasyon testlerine uygulayalım ve gerçek dünya birim testleriyle ne elde etmek istediğinizi düşünelim:

**İki hafta veya ay veya yıl önce yazdığım bir testi çalıştırıp sonuç alabilir miyim?**

Yapamıyorsanız, daha önce oluşturduğunuz bir özelliği bozup bozmadığınızı nasıl bilirsiniz? Paylaşılan veriler ve kod bir uygulamanın ömrü boyunca düzenli olarak değişir ve kodunuzu değiştirdikten sonra daha önce çalışan tüm özellikler için testleri çalıştıramazsanız (veya çalıştırmayacaksanız), farkına varmadan bozabilirsiniz - buna regresyon denir. Regressions bir sprint veya yayın sonuna yakın çok görünüyor gibi görünüyor, geliştiriciler mevcut hataları düzeltmek için baskı altındayken. Bazen eski hataları çözerken farkında olmadan yeni hatalar ortaya çıkarırlar. Bir şeyi bozduktan 60 saniye sonra bilmek harika olmaz mıydı? Kitapta daha sonra bunun nasıl yapılabileceğini göreceksiniz.

**TANIM:** Regresyon, bozulmuş işlevsellik - eskiden çalışan koddur. Bunu eskiden çalışan ve şimdi çalışmayan bir veya daha fazla iş birimi olarak da düşünebilirsiniz.
