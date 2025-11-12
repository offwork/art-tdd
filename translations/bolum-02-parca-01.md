# 2 İlk Birim Testi

**Bu bölümde ele alınanlar:**
- Jest ile ilk testinizi yazmak
- Test yapısı ve isimlendirme kuralları
- Doğrulama (assertion) kütüphanesiyle çalışmak
- Testleri yeniden yapılandırmak ve tekrarları azaltmak

Gerçek bir birim test çerçevesiyle ilk birim testlerimi yazmaya başladığımda, çok az dokümantasyon vardı ve çalıştığım çerçevelerde düzgün örnekler yoktu. (O zamanlar çoğunlukla VB 5 ve 6'da kod yazıyordum.) Bu çerçevelerle çalışmayı öğrenmek bir meydan okumaydı ve oldukça zayıf testler yazarak başladım. Neyse ki, zamanlar değişti. JavaScript'te ve pratikte her dilde geniş bir seçenek yelpazesi bulunuyor ve bu yardımcı araç paketlerini denemek için topluluktan bol miktarda dokümantasyon ve destek var.

Önceki bölümde çok basit, kendi yaptığımız bir test çerçevesi yazdık. Bu bölümde, kitap boyunca tercih edeceğimiz çerçeve olan Jest'e bir göz atacağız.

## 2.1 Jest'e Giriş

Jest, Facebook tarafından oluşturulmuş açık kaynaklı bir test çerçevesidir. Kullanımı kolay, hatırlaması kolay ve pek çok harika özelliği var. Jest başlangıçta JavaScript'te frontend React bileşenlerini test etmek için oluşturulmuştu. Günümüzde endüstrinin birçok yerinde hem backend hem de frontend proje testleri için yaygın olarak kullanılıyor. İki ana test sözdizimi türünü destekler (biri `test` kelimesini kullanan, diğeri ise Jest'in birçok özelliğine ilham veren Jasmine sözdizimini temel alan). Hangisini daha çok beğendiğimizi görmek için ikisini de deneyeceğiz.

Jest dışında, JavaScript'te başka birçok test çerçevesi var ve hemen hemen hepsi de açık kaynak. Aralarında stil ve API açısından bazı farklılıklar var, ancak bu kitabın amaçları açısından bu pek önemli değil.

### 2.1.1 Ortamımızı Hazırlamak

Node.js'in yerel olarak yüklü olduğundan emin olun. Makinenizde çalışır hale getirmek için https://nodejs.org/en/download/ adresindeki talimatları takip edebilirsiniz. Site size uzun süreli destek (LTS) sürümü veya güncel sürüm seçenekleri sunacaktır. LTS sürümü kurumlara yönelik, güncel sürüm ise daha sık güncellemelere sahip. Bu kitabın amaçları için her ikisi de işe yarayacaktır.

Node paket yöneticisinin (npm) makinenizde yüklü olduğundan emin olun. Node.js ile birlikte gelir, bu yüzden komut satırında `npm -v` komutunu çalıştırın ve 6.10.2 veya daha yüksek bir sürüm görürseniz, devam edebilirsiniz. Görmüyorsanız, Node.js'in yüklü olduğundan emin olun.

### 2.1.2 Çalışma Klasörümüzü Hazırlamak

Jest'le başlamak için "ch2" adında yeni bir boş klasör oluşturalım ve seçtiğiniz paket yöneticisiyle başlatalım. Ben npm kullanacağım, çünkü birini seçmem gerekiyor. Yarn alternatif bir paket yöneticisi. Bu kitabın amaçları için hangisini kullandığınız önemli olmamalı.

Jest ya bir jest.config.js ya da package.json dosyası bekler. İkincisiyle gideceğiz ve npm init bunu bizim için oluşturacak:

```bash
mkdir ch2
cd ch2
npm init --yes
//veya
yarn init -yes 
git init
```

Bu klasörde Git'i de başlatıyorum. Değişiklikleri takip etmek için zaten tavsiye edilirdi, ancak Jest için bu dosya perde arkasında dosyalardaki değişiklikleri izlemek ve belirli testleri çalıştırmak için kullanılır. Jest'in işini kolaylaştırır.

Varsayılan olarak, Jest yapılandırmasını ya bu komutla oluşturulan package.json dosyasında ya da özel bir jest.config.js dosyasında arayacaktır. Şimdilik varsayılan package.json dosyasından başka bir şeye ihtiyacımız olmayacak. Jest yapılandırma seçenekleri hakkında daha fazla bilgi edinmek isterseniz, https://jestjs.io/docs/en/configuration adresine başvurabilirsiniz.

### 2.1.3 Jest'i Yüklemek

Ardından Jest'i yükleyeceğiz. Jest'i bir dev bağımlılığı olarak yüklemek için (yani üretime dağıtılmayacağı anlamına gelir) şu komutu kullanabiliriz:

```bash
npm install --save-dev jest
//veya
yarn add jest -dev
```

Bu, [kök klasörü]/node_modules/bin altında yeni bir jest.js dosyası oluşturacaktır. Daha sonra `npx jest` komutunu kullanarak Jest'i çalıştırabiliriz.

Jest'i yerel makinede global olarak da yükleyebiliriz (bunu save-dev yüklemesinin üzerine yapmanızı öneririm) şu komutu çalıştırarak:

```bash
npm install -g jest
```

Bu bize, testleri olan herhangi bir klasörde, npm üzerinden geçmeden doğrudan komut satırından `jest` komutunu çalıştırma özgürlüğü verecektir.

Gerçek projelerde, testleri çalıştırmak için global jest yerine npm komutlarını kullanmak yaygındır. Bunu önümüzdeki birkaç sayfada nasıl yapacağımı göstereceğim.

### 2.1.4 Bir Test Dosyası Oluşturmak

Jest'in test dosyalarını bulmanın birkaç varsayılan yolu vardır:

- Eğer bir `__tests__` klasörü varsa, isimlendirme kurallarından bağımsız olarak içindeki tüm dosyaları test dosyası olarak yükler.
- Projenizin kök klasörü altındaki herhangi bir klasörde, özyinelemeli olarak `*.spec.js` veya `*.test.js` ile biten dosyaları bulmaya çalışır.

İlk varyasyonu kullanacağız, ancak daha sonra onları taşımak istersek (ve `__tests__` klasörünü tamamen kullanmayı bıraksak bile) işleri biraz daha tutarlı hale getirmek için dosyalarımızı `*test.js` veya `*.spec.js` ile adlandıracağız.

Jest'i jest.config.js dosyası veya package.json aracılığıyla, hangi dosyaların nerede bulunacağını belirterek istediğiniz kadar yapılandırabilirsiniz. Tüm ayrıntıları bulmak için Jest belgelerine https://jestjs.io/docs/en/configuration adresinde bakabilirsiniz.

Bir sonraki adım, ch2 klasörümüzün altında `__tests__` adında özel bir klasör oluşturmaktır. Bu klasörün altında, test.js veya spec.js ile biten bir dosya oluşturun—örneğin, my-component.test.js. Hangi son eki seçeceğiniz size kalmış—kendi tarzınızla ilgili. Ben bu kitapta ikisini de birbirinin yerine kullanacağım çünkü "test"i "spec"in en basit versiyonu olarak düşünüyorum, bu yüzden çok basit şeyler gösterirken kullanıyorum.

**Test Dosyası Konumları**

Test dosyalarını yerleştirmek için iki ana desen görüyorum: Bazı insanlar test dosyalarını test edilen dosyaların veya modüllerin hemen yanına yerleştirmeyi tercih ediyor. Diğerleri tüm dosyaları bir test dizini altına yerleştirmeyi tercih ediyor. Hangi yaklaşımı seçtiğiniz gerçekten önemli değil; sadece proje boyunca seçiminizde tutarlı olun, böylece belirli bir öğenin testlerini nerede bulacağınızı bilmek kolay olur.

Test dosyalarını bir test klasörüne yerleştirmenin, yardımcı dosyaları da testlere yakın test klasörünün altına koymama izin verdiğini görüyorum. Testler ve test edilen kod arasında kolayca gezinmeye gelince, günümüzde çoğu IDE için, klavye kısayolu ile kod ve testleri arasında gezinmenize izin veren eklentiler var.

Dosyanın başında Jest'i kullanmaya başlamak için `require()` kullanmamıza gerek yok. Kullanmamız için global fonksiyonları otomatik olarak içe aktarır. İlgilenmeniz gereken ana fonksiyonlar `test`, `describe`, `it` ve `expect`'i içerir. Liste 2.1 basit bir testin nasıl görünebileceğini gösterir.

**Liste 2.1 Merhaba Jest**

```javascript
test('hello jest', () => {
  expect('hello').toEqual('goodbye');
});
```

Henüz `describe` ve `it` kullanmadık, ama yakında onlara da geleceğiz.

### 2.1.5 Jest'i Çalıştırmak

Bu testi çalıştırmak için Jest'i çalıştırabilmemiz gerekir. Jest'in komut satırından tanınması için şunlardan birini yapmamız gerekir:

- `npm install jest -g` çalıştırarak Jest'i makinede global olarak yükleyin.
- ch2 klasörünün kökünde jest yazarak Jest'i node_modules dizininden çalıştırmak için npx kullanın.

Tüm yıldızlar doğru şekilde sıralandıysa, Jest test çalıştırmasının sonuçlarını ve bir başarısızlık görmelisiniz. İlk başarısızlığınız. Yaşasın! Şekil 2.1, komutu çalıştırdığımda terminalimdeki çıktıyı gösteriyor. Bir test aracından bu kadar güzel, renkli (e-kitabı okuyorsanız), faydalı çıktı görmek oldukça havalı. Terminaliniz karanlık moddaysa daha da havalı görünür.

**Şekil 2.1 Jest'ten terminal çıktısı**

```
aout3-samples/ch2 [ jest
FAIL __tests__/hellojes.test.js
  ✗ hello jest (14ms)

  • hello jest

    expect(received).toEqual(expected) // deep equality

    Expected: "goodbye"
    Received: "hello"

      1 | test('hello jest', () => {
    > 2 |   expect('hello').toEqual('goodbye');
        |                   ^
      3 | });
      4 |

    at Object.toEqual (__tests__/hellojes.test.js:2:21)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.145s
Ran all test suites.
aout3-samples/ch2 [
```

Ayrıntılara daha yakından bakalım. Şekil 2.2 aynı çıktıyı gösteriyor, ancak takip edilecek numaralarla. Burada kaç bilgi parçası sunulduğunu görelim:

**Şekil 2.2 Jest'ten açıklamalı terminal çıktısı**

① Yanlarında güzel kırmızı X'ler bulunan tüm başarısız testlerin hızlı bir listesi (adlarıyla birlikte)
② Başarısız olan beklenti üzerine ayrıntılı bir rapor (yani bizim doğrulamamız)
③ Gerçek değer ve beklenen değer arasındaki tam fark
④ Yürütülen karşılaştırmanın türü
⑤ Test için kod
⑥ Testin başarısız olduğu tam satır (görsel olarak)
⑦ Kaç testin çalıştığı, başarısız olduğu ve geçtiğine dair bir rapor
⑧ Geçen süre
⑨ Snapshot sayısı (tartışmamızla ilgili değil)

Tüm bu raporlama işlevselliğini kendiniz yazmayı hayal edin. Mümkün, ama kimin zamanı ve eğilimi var? Ayrıca, raporlama mekanizmasındaki hataları da halletmeniz gerekir.

Testteki `goodbye`'u `hello` ile değiştirirsek, test geçtiğinde ne olduğunu görebiliriz (şekil 2.3). Her şey olması gerektiği gibi güzel ve yeşil (yine, dijital versiyonda—aksi takdirde güzel ve gri).

**Şekil 2.3 Geçen bir test için Jest terminal çıktısı**

```
aout3-samples/ch2 [ jest
PASS __tests__/hellojes.test.js
  ✓ hello jest (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.487s
Ran all test suites.
aout3-samples/ch2 [
```

Bu tek Merhaba Dünya testini çalıştırmanın 1,5 saniye sürdüğünü fark edebilirsiniz. Bunun yerine `jest --watch` komutunu kullansaydık, Jest'in klasörümüzdeki dosya sistemi etkinliğini izlemesini ve her seferinde kendini yeniden başlatmadan değişen dosyalar için testleri otomatik olarak çalıştırmasını sağlayabilirdik. Bu, önemli miktarda zaman tasarrufu sağlayabilir ve sürekli test kavramına gerçekten yardımcı olur. İş istasyonunuzun diğer penceresinde `jest --watch` açık bir terminal ayarlayın ve kodlamaya devam edip yaratabileceğiniz sorunlar hakkında hızlı geri bildirim alabilirsiniz. Bu, işlerin akışına girmek için iyi bir yoldur.

Jest ayrıca async tarzı test ve callback'leri de destekler. Bu konulara kitapta daha sonra değineceğim, ancak bu stil hakkında şimdi daha fazla bilgi edinmek isterseniz, konu hakkındaki Jest dokümantasyonuna gidin: https://jestjs.io/docs/en/asynchronous.

## 2.2 Kütüphane, Doğrulama, Çalıştırıcı ve Raporlayıcı

Jest bizim için birkaç kapasitede çalıştı:

- Testi yazarken kullanmak için bir test kütüphanesi olarak hareket etti.
- Test içinde doğrulama yapmak için bir doğrulama kütüphanesi olarak hareket etti (`expect`).
- Test çalıştırıcısı olarak hareket etti.
- Test çalıştırması için test raporlayıcısı olarak hareket etti.

Jest ayrıca mock'lar, stub'lar ve spy'lar oluşturmak için izolasyon olanakları sağlar, ancak bunu henüz görmedik. Bu fikirlere sonraki bölümlerde değineceğiz.

İzolasyon olanaklarının dışında, bir test çerçevesinin az önce bahsettiğim tüm rolleri doldurması—kütüphane, doğrulamalar, test çalıştırıcısı ve test raporlayıcısı—diğer dillerde çok yaygındır, ancak JavaScript dünyası biraz daha parçalı görünüyor. Diğer birçok test çerçevesi bu olanaklardan yalnızca bazılarını sağlar. Belki bunun nedeni "tek bir şey yap ve onu iyi yap" mantrasının ciddiye alınmış olması veya belki başka nedenlerden dolayıdır. Her halükarda, Jest hepsini bir arada yapan bir avuç çerçeveden biri olarak öne çıkıyor. JavaScript'teki açık kaynak kültürünün gücünün bir kanıtıdır ki bu kategorilerin her biri için, kendi süper araç setinizi oluşturmak üzere karıştırıp eşleştirebileceğiniz birden fazla araç vardır.

Bu kitap için Jest'i seçmemin nedenlerinden biri, araçlarla çok fazla uğraşmak veya eksik özelliklerle uğraşmak zorunda kalmamamız—sadece desenlere odaklanabilmemiz. Bu şekilde, çoğunlukla desenler ve anti-desenlerle ilgilenen bir kitapta birden fazla çerçeve kullanmak zorunda kalmayız.

## 2.3 Birim Test Çerçevelerinin Sunduğu İmkanlar

Bir saniyeliğine uzaklaşalım ve nerede olduğumuzu görelim. Jest gibi çerçeveler, önceki bölümde yapmaya başladığımız gibi kendi çerçevemizi oluşturmaya veya işleri manuel olarak test etmeye kıyasla bize ne sunuyor?

**Yapı**—Her özelliği test etmek istediğinizde tekerleği yeniden icat etmek yerine, bir test çerçevesi kullandığınızda her zaman aynı şekilde başlarsınız—herkesin kolayca tanıyabileceği, okuyabileceği ve anlayabileceği iyi tanımlanmış bir yapıya sahip bir test yazarak.

**Tekrarlanabilirlik**—Bir test çerçevesi kullanırken, yeni bir test yazma eylemini tekrarlamak kolaydır. Ayrıca, bir test çalıştırıcısı kullanarak testin yürütülmesini tekrarlamak da kolaydır ve bunu hızlı bir şekilde ve günde birçok kez yapmak kolaydır. Ayrıca başarısızlıkları ve nedenlerini anlamak da kolaydır. Birisi bizim için tüm zor işi zaten yapmış, bunun yerine tüm bunları kendi elle yapılmış çerçevemize kodlamamız gerekmiyor.

**Güven ve zaman tasarrufu**—Kendi test çerçevemizi oluşturduğumuzda, çerçevede hata olma olasılığı daha yüksektir, çünkü mevcut olgun ve yaygın olarak kullanılan bir çerçeve kadar savaşta test edilmemiştir. Öte yandan, işleri manuel olarak test etmek genellikle çok zaman alıcıdır. Zamanımız kısıtlı olduğunda, muhtemelen en kritik hissedilen şeyleri test etmeye odaklanacağız ve daha az önemli gelebilecek şeyleri atlayacağız. Küçük ama önemli hataları atlıyor olabiliriz. Yeni testler yazmayı kolaylaştırarak, büyük şeyler için test yazmak çok fazla zaman harcamayacağımız için daha az önemli hissedilen şeyler için de testler yazma olasılığımız daha yüksek olur.

**Ortak anlayış**—Çerçevenin raporlaması, görevleri takım düzeyinde yönetmek için yardımcı olabilir (bir test geçiyorsa, görevin tamamlandığı anlamına gelir). Bazı insanlar bunu faydalı buluyor.

Kısacası, birim testleri yazmak, çalıştırmak ve sonuçlarını gözden geçirmek için çerçeveler ve yardımcı araçları, bunları düzgün bir şekilde kullanmak için zaman yatırımı yapmaya istekli geliştiricilerin günlük yaşamlarında büyük bir fark yaratabilir. Şekil 2.4, bir birim test çerçevesinin ve yardımcı araçlarının yazılım geliştirmede etki alanlarını gösterir ve tablo 2.1, bir test çerçevesiyle genellikle yürüttüğümüz eylem türlerini listeler.

**Şekil 2.4 Birim testleri kod olarak yazılır, birim test çerçevesinden kütüphaneler kullanılarak. Testler IDE içinden veya komut satırından bir test çalıştırıcısından çalıştırılır ve sonuçlar bir test raporlayıcı aracılığıyla (metin çıktısı olarak veya IDE'de) geliştirici veya otomatik yapı süreci tarafından gözden geçirilir.**

**Tablo 2.1 Test çerçevelerinin geliştiricilerin testleri yazmasına ve yürütmesine ve sonuçları gözden geçirmesine nasıl yardımcı olduğu**

| Birim Test Pratiği | Çerçeve Nasıl Yardımcı Olur |
|---|---|
| Testleri kolayca ve yapılandırılmış bir şekilde yazın. | Çerçeve, geliştiriciye yardımcı fonksiyonlar, doğrulama fonksiyonları ve yapıyla ilgili fonksiyonlar sağlar. |
| Birim testlerinden birini veya hepsini yürütün. | Çerçeve bir test çalıştırıcısı sağlar, genellikle komut satırında, bu çalıştırıcı:<br>1. Kodunuzdaki testleri tanımlar<br>2. Testleri otomatik olarak çalıştırır<br>3. Çalışırken test durumunu gösterir |
| Test çalıştırmalarının sonuçlarını gözden geçirin. | Bir test çalıştırıcısı genellikle şu bilgileri sağlar:<br>1. Kaç test çalıştı<br>2. Kaç test çalışmadı<br>3. Kaç test başarısız oldu<br>4. Hangi testler başarısız oldu<br>5. Testlerin başarısız olma nedeni<br>6. Başarısız olan kod konumu<br>7. Muhtemelen testin başarısız olmasına neden olan istisnalar için tam bir stack trace sağlar ve çağrı yığınındaki çeşitli metod çağrılarına gitmenizi sağlar |

Yazma sırasında, yaklaşık 900 birim test çerçevesi bulunuyor ve çoğu genel kullanımdaki programlama dili için birden fazla çerçeve var (ve birkaç ölü çerçeve). Wikipedia'da iyi bir liste bulabilirsiniz: https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks.

**NOT:** Bir birim test çerçevesi kullanmak, yazdığınız testlerin okunabilir, sürdürülebilir veya güvenilir olduğunu veya test etmek istediğiniz tüm mantığı kapsadığını garanti etmez. Birim testlerinizin bu özelliklere sahip olduğundan nasıl emin olacağımıza 7'den 9'a kadar olan bölümlerde ve kitap boyunca çeşitli yerlerde bakacağız.

### 2.3.1 xUnit Çerçeveleri

Testler yazmaya başladığımda (Visual Basic günlerinde), çoğu birim test çerçevesinin ölçüldüğü standart toplu olarak xUnit olarak adlandırılırdı. xUnit çerçeveleri fikrinin büyükbabası, Smalltalk için birim test çerçevesi olan SUnit'ti.

Bu birim test çerçevelerinin adları genellikle oluşturuldukları dilin ilk harfleriyle başlar; C++ için CppUnit, Java için JUnit, .NET için NUnit ve xUnit, Haskell programlama dili için HUnit olabilir. Hepsi bu isimlendirme kurallarını takip etmez, ancak çoğu yapar.

### 2.3.2 xUnit, TAP ve Jest Yapıları

Sadece isimler makul derecede tutarlı değildi. Bir xUnit çerçevesi kullanıyorsanız, testlerin oluşturulduğu belirli bir yapı da bekleyebilirdiniz. Bu çerçeveler çalıştığında, sonuçlarını aynı yapıda çıktı verirlerdi, bu genellikle belirli bir şemaya sahip bir XML dosyasıydı.

Bu tür xUnit XML raporu bugün hala yaygındır ve çoğu yapı aracında, bu formatı yerel eklentilerle destekleyen ve test çalıştırmalarının sonuçlarını bildirmek için kullanan Jenkins gibi araçlarda yaygın olarak kullanılır. Statik dillerdeki çoğu birim test çerçevesi hala yapı için xUnit modelini kullanır; bu, birini kullanmayı öğrendiğinizde, herhangi birini kolayca kullanabilmeniz gerektiği anlamına gelir (elbette belirli programlama dilini bildiğinizi varsayarsak).

Test sonuçlarının raporlama yapısı için diğer ilginç standart TAP, Test Anything Protocol'dür. TAP, Perl için test donanımının bir parçası olarak hayata başladı, ancak şimdi C, C++, Python, PHP, Perl, Java, JavaScript ve diğer dillerde uygulamaları var. TAP sadece bir raporlama spesifikasyonundan çok daha fazlasıdır. JavaScript dünyasında, TAP çerçevesi, TAP protokolünü yerel olarak destekleyen en iyi bilinen test çerçevesidir.

Jest kesinlikle bir xUnit veya TAP çerçevesi değildir. Çıktısı varsayılan olarak xUnit veya TAP uyumlu değildir. Ancak, xUnit tarzı raporlama hala yapı alanında hüküm sürdüğü için, genellikle bir yapı sunucusunda raporlama için bu protokole uyum sağlamak isteriz. Çoğu yapı aracı tarafından kolayca tanınan Jest test sonuçları elde etmek için, `jest-xunit` gibi npm modüllerini yükleyebilirsiniz (TAP'ye özgü çıktı istiyorsanız, `jest-tap-reporter` kullanın) ve ardından Jest'i raporlama formatını değiştirmesi için yapılandırmak üzere projenizde özel bir jest.config.js dosyası kullanabilirsiniz.

Şimdi ilerleyelim ve Jest ile biraz daha gerçek bir test gibi bir şey yazalım, olur mu?

## 2.4 Password Verifier Projesini Tanıtmak

Bu kitapta test örnekleri için çoğunlukla kullanacağımız proje, başlangıçta sadece bir fonksiyon içerecek şekilde basit başlayacak. Kitap ilerledikçe, birim testinin farklı yönlerini göstermek için bu projeyi yeni özellikler, modüller ve sınıflarla genişleteceğiz. Buna Password Verifier projesi diyeceğiz.

İlk senaryo oldukça basit. Bir parola doğrulama kütüphanesi oluşturacağız ve ilk başta sadece bir fonksiyon olacak. `verifyPassword(rules)` fonksiyonu, `rules` olarak adlandırılan özel doğrulama fonksiyonlarını koymamıza izin verir ve kurallara göre hataların listesini çıktı olarak verir. Her kural fonksiyonu iki alan çıktı verir:

```javascript
{
  passed: (boolean),
  reason: (string)
}
```

Bu kitapta, `verifyPassword`'ün işlevselliğini çeşitli şekillerde kontrol eden testler yazmayı öğreteceğim çünkü ona daha fazla özellik ekliyoruz.

Aşağıdaki liste, bu fonksiyonun çok naif bir uygulamayla birlikte 0. versiyonunu gösterir.

**Liste 2.2 Password Verifier versiyon 0**

```javascript
const verifyPassword = (input, rules) => {
  const errors = [];
  rules.forEach(rule => {
    const result = rule(input);
    if (!result.passed) {
      errors.push(`error ${result.reason}`);
    }
  });
  return errors;
};
```

Evet, bu en fonksiyonel tarz kod değil ve daha sonra biraz yeniden yapılandırabiliriz, ancak burada işleri çok basit tutmak istedim, böylece testlere odaklanabiliriz.

Fonksiyon pek bir şey yapmıyor. Verilen tüm kurallar üzerinde yineleme yapıyor ve her birini sağlanan girdiyle çalıştırıyor. Eğer kuralın sonucu geçmezse, döndürülen son errors dizisine bir hata ekleniyor.

## 2.5 verifyPassword için İlk Jest Testi

Jest'in yüklü olduğunu varsayarak, devam edip `__tests__` klasörü altında password-verifier0.spec.js adında yeni bir dosya oluşturabilirsiniz. `__tests__` klasörünü kullanmak, test dosyalarını düzenlemek için sadece bir konvansiyondur ve Jest'in varsayılan yapılandırmasının bir parçasıdır. Test dosyalarını test edilen kodun hemen yanına yerleştirmeyi tercih edenler var. Her yaklaşımın artıları ve eksileri var ve bunlara kitabın ilerleyen bölümlerinde gireceğiz. Şimdilik, varsayılanlarla gidelim.

İşte yeni fonksiyonumuza karşı bir testin ilk versiyonu.

**Liste 2.3 verifyPassword()'a karşı ilk test**

```javascript
test('badly named test', () => {
  const fakeRule = input =>  ①
    ({ passed: false, reason: 'fake reason' }); ①
  const errors = verifyPassword('any value', [fakeRule]); ②
  expect(errors[0]).toMatch('fake reason'); ③
});
```

① Test için girdileri hazırlama
② Girdilerle giriş noktasını çağırma
③ Çıkış noktasını kontrol etme

### 2.5.1 Düzenle-Davran-Doğrula Deseni

Liste 2.3'teki testin yapısı, halk arasında Düzenle-Davran-Doğrula (Arrange-Act-Assert - AAA) deseni olarak adlandırılır. Oldukça güzel! Bir testin parçaları hakkında "o 'düzenle' kısmı çok karmaşık" veya "nerede 'davran' kısmı?" gibi şeyler söyleyerek akıl yürütmeyi çok kolay buluyorum.

Düzenle kısmında, her zaman false döndüren sahte bir kural oluşturuyoruz, böylece aslında kullanıldığını, testin sonunda nedenine (reason) doğrulama yaparak ispatlayabiliriz. Daha sonra bunu basit bir girdi ile birlikte verifyPassword'e gönderiyoruz. Doğrula bölümünde, aldığımız ilk hatanın düzenle kısmında verdiğimiz sahte nedenle eşleştiğini kontrol ediyoruz.

`.toMatch(/string/)` bir dize parçasını bulmak için düzenli ifade kullanır. `.toContain('fake reason')` kullanmakla aynıdır.

Jest'i bir test yazdıktan veya bir şeyi düzelttikten sonra manuel olarak çalıştırmak yorucu, bu yüzden npm'i Jest'i otomatik olarak çalıştıracak şekilde yapılandıralım. ch2'nin kök klasöründeki package.json'a gidin ve scripts öğesinin altına şu öğeleri ekleyin:

```json
"scripts": {
  "test": "jest",
  "testw": "jest --watch" //git kullanmıyorsanız, --watchAll olarak değiştirin
},
```

Eğer bu klasörde Git'i başlatmadıysanız, `--watch` yerine `--watchAll` komutunu kullanabilirsiniz.

Her şey iyi gittiyse, artık ch2 klasöründen komut satırında `npm test` yazabilirsiniz ve Jest testleri bir kez çalıştıracaktır. `npm run testw` yazarsanız, Jest çalışacak ve işlemi Ctrl-C ile öldürene kadar sonsuz bir döngüde değişiklikleri bekleyecektir. (`run` kelimesini kullanmanız gerekir çünkü testw, npm'in otomatik olarak tanıdığı özel anahtar kelimelerden biri değildir.)

Testi çalıştırırsanız, fonksiyon beklendiği gibi çalıştığı için testin geçtiğini görebilirsiniz.

### 2.5.2 Testi Test Etmek

Üretim koduna bir hata koyalım ve testin gerektiğinde başarısız olup olmadığını görelim.

**Liste 2.4 Bir hata eklemek**

```javascript
const verifyPassword = (input, rules) => {
  const errors = [];
  rules.forEach(rule => {
    const result = rule(input);
    if (!result.passed) {
      // errors.push(`error ${result.reason}`); ①
    }
  });
  return errors;
};
```

① Bu satırı yanlışlıkla yorum haline getirdik.

Şimdi testinizin güzel bir mesajla başarısız olduğunu görmelisiniz. Satırı yorumdan çıkaralım ve testin tekrar geçtiğini görelim. Bu, test güdümlü geliştirme yapmıyorsanız ve testleri koddan sonra yazıyorsanız, testlerinizde biraz güven kazanmanın harika bir yoludur.

### 2.5.3 USE İsimlendirmesi

Testimizin gerçekten kötü bir adı var. Burada neyi başarmaya çalıştığımız hakkında hiçbir şey açıklamıyor. Test adlarına üç bilgi parçası koymayı seviyorum, böylece testin okuyucusu sadece test adına bakarak zihinsel sorularının çoğunu cevaplayabilir. Bu üç parça şunları içerir:

- Test altındaki iş birimi (`verifyPassword` fonksiyonu, bu durumda)
- İş birimine senaryo veya girdiler (başarısız kural)
- Beklenen davranış veya çıkış noktası (bir nedenle bir hata döndürür)

İnceleme sürecinde, kitabın bir gözden geçireni olan Tyler Lemke, bunun için güzel bir kısaltma buldu: USE: test altındaki birim (unit), senaryo (scenario), beklenti (expectation). Beğendim ve hatırlaması kolay. Teşekkürler Tyler!

Aşağıdaki liste, testimizin USE adıyla sonraki revizyonunu gösterir.

**Liste 2.5 USE ile bir testi adlandırma**

```javascript
test('verifyPassword, given a failing rule, returns errors', () => {
  const fakeRule = input => ({ passed: false, reason: 'fake reason' });
  const errors = verifyPassword('any value', [fakeRule]);
  expect(errors[0]).toContain('fake reason');
});
```

Bu biraz daha iyi. Bir test başarısız olduğunda, özellikle bir yapı işlemi sırasında, genellikle yorumları veya tam test kodunu görmezsiniz. Genellikle sadece testin adını görürsünüz. Ad o kadar net olmalı ki, üretim kodu sorununun nerede olabileceğini anlamak için test koduna bile bakmanıza gerek kalmamalıdır.

### 2.5.4 Dize Karşılaştırmaları ve Sürdürülebilirlik

Ayrıca şu satırda başka bir küçük değişiklik yaptık:

```javascript
expect(errors[0]).toContain('fake reason');
```

Testlerde çok yaygın olduğu gibi bir dizenin diğerine eşit olup olmadığını kontrol etmek yerine, bir dizenin çıktıda içerilip içerilmediğini kontrol ediyoruz. Bu, testimizi çıktıdaki gelecekteki değişikliklere karşı daha az kırılgan hale getirir. Bunu başarmak için `.toContain` veya düzenli ifade kullanarak bir dizenin bir kısmını eşleştiren `.toMatch(/fake reason/)` kullanabiliriz.

Dizeler bir tür kullanıcı arayüzüdür. İnsanlar tarafından görülebilirler ve değişebilirler—özellikle dizelerin kenarları. Dizede bulunan bilginin özünün var olduğu önemlidir. Birisi bir dizenin sonuna yeni bir satır eklediğinde testimizi değiştirmek istemeyiz. Bu, testlerimizde teşvik etmek istediğimiz düşünme türünün bir parçasıdır: zaman içinde test sürdürülebilirliği ve test kırılganlığına karşı direnç, yüksek önceliktedir.

İdeal olarak testin sadece üretim kodunda gerçekten bir şey yanlış olduğunda başarısız olmasını istiyoruz. Yanlış pozitiflerin sayısını minimuma indirmek istiyoruz. `toContain()` veya `toMatch()` kullanmak bu hedefe doğru ilerlemek için harika bir yoldur.

Kitap boyunca ve özellikle kitabın 2. bölümünde test sürdürülebilirliğini iyileştirmenin daha fazla yolu hakkında konuşacağım.
