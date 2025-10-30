# 1 Birim Testinin Temelleri

Bu bölüm şunları kapsar:
- Giriş noktalarını ve çıkış noktalarını belirleme
- Birim testi ve iş birimi tanımları
- Birim testi ile entegrasyon testi arasındaki fark
- Basit bir birim testi örneği
- Test güdümlü geliştirmeyi anlama

Manuel testler berbat. Kodunuzu yazarsınız, hata ayıklayıcıda çalıştırırsınız, uygulamanızda doğru tuşlara basarsınız ve her şeyi tam yerine oturtursunuz, sonra bir dahaki sefere yeni kod yazdığınızda tüm bunları tekrarlarsınız. Ayrıca yeni koddan etkilenmiş olabilecek diğer tüm kodları da kontrol etmeyi hatırlamanız gerekir. Daha fazla manuel iş. Harika.

Testleri ve gerileme testlerini tamamen manuel olarak yapmak, aynı eylemleri bir maymun gibi tekrar tekrar yinelemek, hataya açık ve zaman alıcıdır. İnsanlar bunu yazılım geliştirmede nefret edilebilecek her şey kadar nefret ediyor gibi görünüyor. Bu sorunlar, araçlar kullanma ve bunları iyilik için kullanma kararımızla hafifler - bize değerli zaman ve hata ayıklama acısı kazandıran otomatik testler yazarak. Entegrasyon ve birim testi çerçeveleri, geliştiricilerin bilinen bir API seti ile testleri daha hızlı yazmasına, bu testleri otomatik olarak yürütmesine ve test sonuçlarını kolayca gözden geçirmesine yardımcı olur. Ve asla unutmazlar! Bu kitabı okuyorsunuz çünkü ya siz de aynı şekilde hissediyorsunuz, ya da biri sizi okumaya zorladı ve o kişi de aynı şekilde hissediyor. Ya da belki o kişi sizi bu kitabı okumaya zorlamaya zorlandı. Önemli değil. Eğer tekrarlayan manuel testlerin harika olduğuna inanıyorsanız, bu kitabı okumak çok zor olacaktır. Varsayım, iyi birim testleri yazmayı öğrenmek istediğinizdir.

Bu kitap ayrıca JavaScript veya TypeScript kullanarak, en az ECMAScript 6 (ES6) özelliklerini kullanarak kod yazmayı bildiğinizi ve node paket yöneticisine (npm) aşina olduğunuzu varsayar. Bir başka varsayım ise Git kaynak kontrolüne aşina olduğunuzdur. Daha önce github.com'u gördüyseniz ve oradan bir depoyu nasıl klonlayacağınızı biliyorsanız, hazırsınız demektir.

Bu kitaptaki tüm kod listelemeleri JavaScript ve TypeScript'te olsa da, bu kitabı okumak için JavaScript programcısı olmanız gerekmez. Bu kitabın önceki baskıları C# dilindeydi ve oradaki kalıpların yaklaşık %80'inin kolayca aktarıldığını gördüm. Java, .NET, Python, Ruby veya diğer dillerden gelsseniz bile bu kitabı okuyabilirsiniz. Kalıplar sadece kalıptır. Dil bu kalıpları göstermek için kullanılır, ancak dile özgü değildirler.

## Bu kitapta JavaScript ve TypeScript

Bu kitap boyunca hem sade JavaScript hem de TypeScript örnekleri içerir. Böyle bir Babil Kulesi (kelime oyunu amaçlanmadı) yaratmaktan tamamen ben sorumluyum, ama söz veriyorum, bunun iyi bir nedeni var: bu kitap JavaScript'te üç programlama paradigmasıyla ilgileniyor: prosedürel, fonksiyonel ve nesne yönelimli tasarım.

Prosedürel ve fonksiyonel tasarımlarla ilgili örnekler için normal JavaScript kullanıyorum. Nesne yönelimli örnekler için TypeScript kullanıyorum, çünkü bu fikirleri ifade etmek için gereken yapıyı sağlıyor.

Bu kitabın önceki baskılarında, C# ile çalışırken, bu bir sorun değildi. Birden fazla paradigmayı destekleyen JavaScript'e geçerken, TypeScript kullanmak mantıklı.

Neden tüm paradigmalar için sadece TypeScript kullanmıyorsunuz diye sorabilirsiniz? Hem birim testleri yazmak için TypeScript'in gerekmediğini göstermek hem de birim testi kavramlarının bir dile veya herhangi bir derleyici ya da linter türüne bağlı olmadığını göstermek için.

Bu, eğer fonksiyonel programlamaya ilgi duyuyorsanız, bu kitaptaki bazı örneklerin mantıklı geleceği, diğerlerinin ise aşırı karmaşık veya gereksiz ayrıntılı görüneceği anlamına gelir. Sadece fonksiyonel örneklere odaklanmaktan çekinmeyin.

Nesne yönelimli programlamaya ilgi duyuyorsanız veya C#/Java geçmişinden geliyorsanız, nesne yönelimli olmayan örneklerden bazılarının basit olduğunu ve kendi projelerinizdeki günlük işinizi temsil etmediğini göreceksiniz. Korkmayın, nesne yönelimli stille ilgili bolca bölüm olacak.

## 1.1 İlk Adım

Her zaman bir ilk adım vardır: ilk kez bir program yazdığınız, ilk kez bir projede başarısız olduğunuz ve yapmaya çalıştığınız şeyde ilk kez başarılı olduğunuz an. İlkinizi asla unutmazsınız ve ilk testlerinizi de unutmamanızı umuyorum.

Testlerle bir şekilde karşılaşmış olabilirsiniz. En sevdiğiniz bazı açık kaynak projeler paketlenmiş "test" klasörleriyle gelir - işyerinizdeki kendi projelerinizde bunlar var. Kendiniz birkaç test yazmış olabilirsiniz ve bunları kötü, tuhaf, yavaş veya sürdürülemez olarak hatırlayabilirsiniz. Daha da kötüsü, bunları işe yaramaz ve zaman kaybı olarak hissetmiş olabilirsiniz. (Maalesef birçok insan öyle hissediyor.) Ya da birim testleriyle harika bir ilk deneyim yaşamış olabilirsiniz ve neyi kaçırıyor olabileceğinizi görmek için bu kitabı okuyorsunuz.

Bu bölüm, birim testinin "klasik" tanımını analiz edecek ve bunu entegrasyon testi kavramıyla karşılaştıracaktır. Bu ayrım birçok kişi için kafa karıştırıcıdır, ancak öğrenmek çok önemlidir, çünkü kitapta daha sonra öğreneceğiniz gibi, birim testlerini diğer test türlerinden ayırmak, testleriniz başarısız olduğunda veya geçtiğinde yüksek güvene sahip olmak için çok önemli olabilir.

Ayrıca birim testine karşı entegrasyon testinin artılarını ve eksilerini tartışacağız ve "iyi" bir birim testinin ne olabileceğine dair daha iyi bir tanım geliştireceğiz. Test güdümlü geliştirmeye (TDD) bir bakışla bitireceğiz, çünkü genellikle birim testiyle ilişkilendirilir, ancak yüksek oranda önerdiğim ayrı bir beceridir (bu kitabın ana konusu olmasa da). Bu bölüm boyunca, kitabın başka yerlerinde daha kapsamlı olarak açıklanan kavramlara da değineceğim.

Önce, bir birim testinin ne olması gerektiğini tanımlayalım.

## 1.2 Birim Testini Adım Adım Tanımlama

Birim testi yazılım geliştirmede yeni bir kavram değildir. 1970'lerde Smalltalk programlama dilinin ilk günlerinden beri dolaşıyor ve bir geliştiricinin kod kalitesini artırırken modülün, sınıfın veya fonksiyonun işlevsel gereksinimlerini daha derin bir şekilde anlamasının en iyi yollarından biri olarak kendini tekrar tekrar kanıtlıyor. Kent Beck, Smalltalk'ta birim testi kavramını tanıttı ve bu kavram birçok başka programlama diline taşındı, bu da birim testini son derece yararlı bir uygulama haline getirdi.

Birim testi tanımımız olarak kullanmak istemediklerimizi görmek için, başlangıç noktası olarak Wikipedia'ya bakalım. Tanımını çekinceyle kullanacağım, çünkü bence eksik olan birçok önemli parça var, ancak diğer iyi tanımların eksikliğinden dolayı birçok kişi tarafından büyük ölçüde kabul ediliyor. Tanımımız bu bölüm boyunca yavaş yavaş gelişecek ve nihai tanım 1.9. bölümünde görünecek.

> Birim testleri genellikle, bir uygulamanın bir bölümünün ("birim" olarak bilinen) tasarımına uygun olduğundan ve amaçlandığı gibi davrandığından emin olmak için yazılım geliştiricileri tarafından yazılan ve çalıştırılan otomatik testlerdir. Prosedürel programlamada, bir birim tüm bir modül olabilir, ancak daha yaygın olarak bireysel bir fonksiyon veya prosedürdür. Nesne yönelimli programlamada, bir birim genellikle bir sınıf gibi tüm bir arayüz veya bireysel bir metottur (https://en.wikipedia.org/wiki/Unit_testing).

Test edeceğiniz şey, test edilen özne, sistem veya paket (SUT) olarak adlandırılır.

**TANIM:** SUT, test edilen özne, sistem veya paket (subject, system, or suite under test) anlamına gelir ve bazı insanlar CUT (bileşen, sınıf veya test edilen kod - component, class, or code under test) kullanmayı sever. Bir şeyi test ettiğinizde, test ettiğiniz şeye SUT olarak atıfta bulunursunuz.

Birim testindeki "birim" kelimesinden bahsedelim. Bana göre, birim sistemin içindeki bir "iş birimi" veya "kullanım durumu" anlamına gelir. Bir iş biriminin, giriş noktası ve çıkış noktası dediğim bir başlangıcı ve sonu vardır. Bir iş biriminin basit bir örneği, bir şey hesaplayan ve bir değer döndüren bir fonksiyondur. Ancak, bir fonksiyon hesaplama sürecinde başka fonksiyonları, başka modülleri ve başka bileşenleri de kullanabilir, bu da iş biriminin (giriş noktasından çıkış noktasına kadar) sadece bir fonksiyondan fazlasını kapsayabileceği anlamına gelir.

### İş Birimi

Bir iş birimi, bir giriş noktasının çağrılması ile bir veya daha fazla çıkış noktası aracılığıyla fark edilebilir bir nihai sonuca kadar gerçekleşen tüm eylemlerdir. Örneğin, herkese açık görünür bir fonksiyon verildiğinde:

1. Fonksiyonun gövdesi, iş biriminin tamamı veya bir parçasıdır.
2. Fonksiyonun bildirimi ve imzası, gövdeye giriş noktasıdır.
3. Fonksiyonun sonuçta ortaya çıkan çıktıları veya davranışları, çıkış noktalarıdır.

## 1.3 Giriş Noktaları ve Çıkış Noktaları

Bir iş birimi her zaman bir giriş noktasına ve bir veya daha fazla çıkış noktasına sahiptir. Şekil 1.1, bir iş biriminin basit bir diyagramını gösterir.

```
        ↑ Çıkış noktası
        |
        ↓ Giriş noktası
       ___
      /   \
     | İş  |
     |Birimi|
      \___/
       /  \
      ↓    ↓
Çıkış noktası  Çıkış noktası
```

**Şekil 1.1** Bir iş biriminin giriş noktaları ve çıkış noktaları vardır.

Bir iş birimi tek bir fonksiyon, birden fazla fonksiyon ve hatta birden fazla modül veya bileşen olabilir. Ancak her zaman dışarıdan (testler veya diğer üretim kodları aracılığıyla) tetikleyebileceğimiz bir giriş noktasına sahiptir ve her zaman yararlı bir şey yapmakla biter. Eğer yararlı bir şey yapmazsa, kod tabanımızdan kaldırsak da olur.

Neyin *yararlı* olduğu? Kodda herkese açık olarak fark edilebilir bir şey: bir dönüş değeri, bir durum değişikliği veya harici bir tarafa çağrı, Şekil 1.2'de gösterildiği gibi. Bu fark edilebilir davranışlar, *çıkış noktaları* dediğim şeylerdir.

```
             someFunction()
    Dönüş değeri    ↓
    veya hata       |
        ↑          ___
        |         /   \
               | İş  |
               |Birimi|
                \___/
               /     \
              ↓       ↓
    Fark edilebilir    Üçüncü taraf
    durum değişikliği  bağımlılık çağrısı
```

**Şekil 1.2** Çıkış noktası türleri

### Neden "çıkış noktası"?

Neden "davranış" gibi bir şey yerine "çıkış noktası" terimini kullanıyorsunuz? Benim düşüncem, davranışların tamamen dahili olabileceği, oysa çağıran taraftan dışarıdan görünür davranışları aradığımızdır. Bu fark bir bakışta ayırt edilmesi zor olabilir. Ayrıca, "çıkış noktası" güzel bir şekilde iş birimi bağlamından ayrılıp test bağlamına geri döndüğümüzü gösterir, ancak davranışlar bundan biraz daha akışkan olabilir. Vladimir Khorikov'un *Unit Testing Principles, Practices, and Patterns* (Manning, 2020) kitabında gözlemlenebilir davranış da dahil olmak üzere davranış türleri hakkında kapsamlı bir tartışma var. Bu konu hakkında daha fazla bilgi edinmek için o kitaba bakın.

Aşağıdaki liste, basit bir iş biriminin hızlı bir kod örneğini gösterir.

**Liste 1.1** Test etmek istediğimiz basit bir fonksiyon

```javascript
const sum = (numbers) => {
  const [a, b] = numbers.split(',');
  const result = parseInt(a) + parseInt(b);
  return result;
};
```

### Bu kitapta kullanılan JavaScript sürümü hakkında

Node.js 12.8 ile sade ES6 JavaScript'i JSDoc tarzı yorumlarla birlikte kullanmayı seçtim. Kullanacağım modül sistemi, işleri basit tutmak için CommonJS olacaktır. Belki gelecekteki bir baskıda ES modüllerini (.mjs dosyaları) kullanmaya başlarım, ancak şimdilik ve bu kitabın geri kalanı için CommonJS yeterli olacaktır. Bu kitaptaki kalıplar için zaten pek fark etmiyor.

Burada kullanılan teknikleri, TypeScript, Sade JS, ES modülleri, backend veya frontend, Angular veya React kullanıyor olun, şu anda çalıştığınız JavaScript yığını için kolayca ekstrapolasyon yapabilmelisiniz. Bu önemli değil.

### Bu bölümün kodunu alma

Bu kitapta gösterilen tüm kod örneklerini GitHub'dan indirebilirsiniz. Depoyu https://github.com/royosherove/aout3-samples adresinde bulabilirsiniz. Node 12.8 veya üstünün yüklü olduğundan emin olun ve `npm install` komutunu ardından `npm run ch[bölüm numarası]` komutunu çalıştırın. Bu bölüm için `npm run ch1` çalıştırırsınız. Bu, bu bölümdeki tüm testleri çalıştıracak, böylece çıktılarını görebilirsiniz.

Bu iş birimi tamamen tek bir fonksiyonda kapsüllenmiştir. Fonksiyon giriş noktasıdır ve nihai sonucu bir değer döndürdüğü için, çıkış noktası olarak da görev yapar. Nihai sonucu iş birimini tetiklediğimiz yerde alıyoruz, dolayısıyla giriş noktası aynı zamanda çıkış noktasıdır.

Bu fonksiyonu bir iş birimi olarak çizseydik, Şekil 1.3 gibi bir şey olurdu. Giriş noktası olarak `sum(numbers)` kullandım, `numbers` değil, çünkü giriş noktası fonksiyon imzasıdır. Parametreler, giriş noktası aracılığıyla verilen bağlam veya girdilerdir.

```
    Dönüş değeri
        ↑
        |
        ↓ sum(numbers)
       ___
      /   \
     | İş  |
     |Birimi|
      \___/
```

**Şekil 1.3** Giriş noktası ile aynı olan çıkış noktasına sahip bir fonksiyon

Aşağıdaki liste bu fikrin bir varyasyonunu gösterir.

**Liste 1.2** Giriş noktaları ve çıkış noktaları olan bir iş birimi

```javascript
let total = 0;

const totalSoFar = () => {
  return total;
};

const sum = (numbers) => {
  const [a, b] = numbers.split(',');
  const result = parseInt(a) + parseInt(b);
  total += result; // ❶ Yeni işlevsellik: çalışan toplam hesaplama
  return result;
};
```

❶ Yeni işlevsellik: çalışan toplam hesaplama

Bu yeni `sum` versiyonunun iki çıkış noktası vardır. İki şey yapar:

- Bir değer döndürür.
- Yeni işlevsellik sunar: tüm toplamların çalışan toplamı. Modülün durumunu, giriş noktası çağıranından (totalSoFar aracılığıyla) fark edilebilir bir şekilde ayarlar.

Şekil 1.4, bu iş birimini nasıl çizeceğimi gösterir. Bu iki çıkış noktasını, aynı iş biriminden iki farklı yol veya gereksinim olarak düşünebilirsiniz, çünkü bunlar gerçekten kodun yapması beklenen iki farklı yararlı şeydir. Bu aynı zamanda burada iki farklı birim testi yazma olasılığımın çok yüksek olduğu anlamına gelir: her çıkış noktası için bir tane. Çok yakında tam olarak bunu yapacağız.

```
    Dönüş değeri
        ↑
        |
        ↓ sum(numbers)
       ___
      /   \
     | İş  |
     |Birimi|
      \___/
        |
        ↓
    Durum değişikliği
    totalSoFar()
```

**Şekil 1.4** İki çıkış noktası olan bir iş birimi

`totalSoFar` hakkında ne düşünüyorsunuz? Bu da bir giriş noktası mı? Evet, *ayrı bir testte* olabilir. `totalSoFar`'ı önceden `sum`'ı tetiklemeden çağırdığımızı kanıtlayan bir test yazabilirim ve 0 döndürür. Bu onun kendi küçük iş birimi olurdu, ki bu tamamen iyidir. Genellikle bir iş birimi (örneğin `sum`) daha küçük birimlerden oluşabilir.

Görebileceğiniz gibi, testlerimizin kapsamı değişebilir ve mutasyona uğrayabilir, ancak yine de onları giriş noktaları ve çıkış noktalarıyla tanımlayabiliriz. Giriş noktaları her zaman testin iş birimini tetiklediği yerdir. Bir iş birimine birden fazla giriş noktanız olabilir, her biri farklı bir test seti tarafından kullanılır.

### Tasarım üzerine bir not

İki ana eylem türü vardır: "sorgu" eylemleri ve "komut" eylemleri. Sorgu eylemleri bir şeyi değiştirmez; sadece değer döndürür. Komut eylemleri bir şeyi değiştirir ama değer döndürmez.

İkisini genellikle birleştiririz, ancak birçok durumda bunları ayırmak daha iyi bir tasarım seçimi olabilir. Bu kitap öncelikli olarak tasarım hakkında değil, ancak Martin Fowler'ın web sitesinde komut sorgu ayrımı kavramı hakkında daha fazla okumanızı tavsiye ederim: https://martinfowler.com/bliki/CommandQuerySeparation.xhtml.

### Gereksinimleri ve yeni testleri belirten çıkış noktaları ve tersi

Çıkış noktaları bir iş biriminin nihai sonuçlarıdır. Birim testleri için, genellikle her çıkış noktası için kendi okunabilir adıyla en az bir test yazarım. Daha sonra, daha fazla güven kazanmak için, hepsinde aynı giriş noktasını kullanarak girdiler üzerinde varyasyonlarla daha fazla test ekleyebilirim.

Bu düzeylerde ayrılması imkansız olabileceğinden, entegrasyon testleri genellikle birden fazla nihai sonuç içerir. Bu aynı zamanda entegrasyon testlerinin hata ayıklamasının, ayağa kaldırılmasının ve bakımının daha zor olmasının nedenlerinden biridir: birim testlerinden çok daha fazlasını yaparlar, yakında göreceğiniz gibi.

Örnek fonksiyonumuzun üçüncü bir versiyonu aşağıdaki listede gösterilmiştir.

**Liste 1.3** Fonksiyona bir loglayıcı çağrısı ekleme

```javascript
let total = 0;

const totalSoFar = () => {
  return total;
};

const logger = makeLogger();

const sum = (numbers) => {
  const [a, b] = numbers.split(',');
  logger.info( // ❶ Yeni bir çıkış noktası
    'this is a very important log output', // ❶
    { firstNumWas: a, secondNumWas: b }); // ❶
  const result = parseInt(a) + parseInt(b);
  total += result;
  return result;
};
```

❶ Yeni bir çıkış noktası

Fonksiyonda yeni bir çıkış noktası (veya gereksinim, veya nihai sonuç) olduğunu görebilirsiniz. Harici bir varlığa bir şey logluyor - belki bir dosyaya, konsola veya veritabanına. Bilmiyoruz ve umurumuzda değil. Bu üçüncü çıkış noktası türüdür: üçüncü bir tarafa çağrı. Buna "bir bağımlılık çağırma" demekten de hoşlanırım.

**TANIM:** Bir bağımlılık, bir birim testi sırasında tam kontrole sahip olmadığımız bir şeydir. Ya da bir testte kontrol etmeye çalışmanın hayatımızı çekilmez kılacağı bir şey olabilir. Bazı örnekler arasında dosyalara yazan loglayıcılar, ağla konuşan şeyler, diğer ekipler tarafından kontrol edilen kod, uzun zaman alan bileşenler (hesaplamalar, thread'ler, veritabanı erişimi) ve daha fazlası sayılabilir. Genel kural, eğer ne yaptığını tam olarak ve kolayca kontrol edebiliyorsak, bellekte çalışıyorsa ve hızlıysa, o zaman bir bağımlılık değildir. Kurala her zaman istisnalar vardır, ancak bu sizi en azından vakaların %80'inden geçirmelidir.

Şekil 1.5, bu iş birimini üç çıkış noktasıyla nasıl çizeceğimi gösterir. Bu noktada hala bir fonksiyon boyutunda iş biriminden bahsediyoruz. Giriş noktası fonksiyon çağrısıdır, ancak şimdi yararlı bir şey yapan ve çağıranın herkese açık bir şekilde doğrulayabileceği üç olası yolumuz veya çıkış noktamız var.

```
    Dönüş değeri
        ↑
        |
        ↓ sum(numbers)
       ___
      /   \
     | İş  |
     |Birimi|
      \___/
       /  \
      ↓    ↓
Durum değişikliği  Üçüncü taraf
totalSoFar()      loglayıcı çağrısı
```

**Şekil 1.5** Bir fonksiyondan üç çıkış noktasını gösterme

İşte ilginç kısım: her çıkış noktası için ayrı bir test yapmak iyi bir fikirdir. Bu, testleri daha okunabilir ve diğer sonuçları etkilemeden hata ayıklamayı veya değiştirmeyi daha basit hale getirecektir.

## 1.4 Çıkış Noktası Türleri

Üç farklı nihai sonuç türümüz olduğunu gördük:

- Çağrılan fonksiyon yararlı bir değer döndürür (undefined değil). Bu statik olarak yazılmış bir dil olsaydı (Java veya C# gibi), public, non-void bir fonksiyon derdik.
- Çağrı öncesinde ve sonrasında sistemin durumunda veya davranışında, private durumu sorgulamadan belirlenebilen fark edilebilir bir değişiklik vardır.
- Testin kontrolü olmayan üçüncü taraf bir sisteme bir çağrı vardır. O üçüncü taraf sistem herhangi bir değer döndürmez veya bu değer göz ardı edilir. (Örnek: kod, sizin yazmadığınız ve kaynak kodunu kontrol etmediğiniz üçüncü taraf bir loglama sistemini çağırır.)
