# Bölüm 1 - Parça 3 (Sayfa 31-45)

**Ekibimin herhangi bir üyesi, iki ay önce yazdığım testleri çalıştırıp sonuç alabilir mi?**

Bu, önceki noktayla birlikte gider ancak bir adım daha ileri götürür. Bir şeyi değiştirdiğinizde başkasının kodunu bozmadığınızdan emin olmak istersiniz. Birçok geliştirici, değiştirdikleri şeye neyin bağlı olduğunu bilmedikleri için eski sistemlerdeki eski kodları değiştirmekten korkar. Özünde, sistemi bilinmeyen bir kararlılık durumuna değiştirme riskini alırlar.

Uygulamanın hala çalışıp çalışmadığını bilmemekten, özellikle o kodu siz yazmadıysanız, daha az korkutucu şey vardır. O güvenlik ağı olan birim testleriniz varsa ve hiçbir şeyi bozmadığınızı biliyorsanız, daha az aşina olduğunuz kodları üstlenmeyi çok daha az korkutucu bulursunuz.

İyi testlere herkes erişebilmeli ve onları çalıştırabilmelidir.

**TANIM:** Legacy code, Wikipedia tarafından "artık standart donanım ve ortamlarda desteklenmeyen eski bilgisayar kaynak kodu" olarak tanımlanır (https://en.wikipedia.org/wiki/Legacy_system), ancak birçok atölye, şu anda bakım altındaki uygulamanın herhangi bir eski sürümünü eski kod olarak adlandırır. Genellikle çalışılması zor, test edilmesi zor ve genellikle okunması bile zor olan kodu ifade eder. Bir müşteri bir zamanlar eski kodu pratik bir şekilde tanımladı: "çalışan kod". Birçok insan eski kodu "testi olmayan kod" olarak tanımlamayı sever. Michael Feathers'ın *Working Effectively with Legacy Code* (Pearson, 2004) kitabı "testi olmayan kod"u eski kodun resmi bir tanımı olarak kullanır ve bu kitabı okurken dikkate alınması gereken bir tanımdır.

**Yazdığım tüm testleri birkaç dakikadan fazla olmayan bir sürede çalıştırabilir miyim?**

Testlerinizi hızlı bir şekilde çalıştıramazsanız (dakikalardan saniyeler daha iyidir), onları daha az sıklıkla çalıştırırsınız (bazı yerlerde günlük veya hatta haftalık veya aylık). Sorun şu ki, kod değiştirdiğinizde, bir şeyi bozup bozmadığınızı görmek için mümkün olan en kısa sürede geri bildirim almak istersiniz. Testleri çalıştırmak arasında ne kadar çok zaman gerekiyorsa, sistemde o kadar çok değişiklik yaparsınız ve bir şeyi bozduğunuzu fark ettiğinizde aramak için (çok) daha fazla yeriniz olur.

İyi testler hızlı çalışmalıdır.

**Yazdığım tüm testleri bir düğmeye basarak çalıştırabilir miyim?**

Yapamazsanız, bu muhtemelen testlerin doğru çalışması için testlerin çalışacağı makineyi yapılandırmanız gerektiği (örneğin bir Docker ortamı kurma veya veritabanına bağlantı stringlerini ayarlama) veya birim testlerinizin tam otomatik olmadığı anlamına gelebilir. Birim testlerinizi tam olarak otomatikleştiremezseniz, muhtemelen onları tekrar tekrar çalıştırmaktan kaçınırsınız, ekibinizdeki herkes gibi.

Kimse sadece sistemin hala çalıştığından emin olmak için testleri çalıştırmak için yapılandırma ayrıntılarıyla uğraşmayı sevmez. Geliştiricilerin sisteme daha fazla özellik yazmak gibi daha önemli işleri vardır. Ancak sistemin durumunu bilmiyorlarsa bunu yapamazlar.

İyi testler orijinal formlarında kolayca yürütülmeli, manuel olarak değil.

**Birkaç dakikadan fazla olmayan bir sürede basit bir test yazabilir miyim?**

Bir entegrasyon testini belirlemenin en kolay yollarından biri, sadece yürütmesinin değil, hazırlanmasının ve uygulanmasının zaman almasıdır. Tüm dahili ve bazen harici bağımlılıklar (bir veritabanı harici bir bağımlılık olarak kabul edilebilir) nedeniyle nasıl yazılacağını anlamak zaman alır. Testi otomatikleştirmiyorsanız, bağımlılıklar daha az sorun olur, ancak otomatik bir testin tüm avantajlarını kaybedersiniz. Bir test yazmak ne kadar zorsa, daha fazla test yazma veya endişe duyduğunuz "büyük şeyler" dışında bir şeye odaklanma olasılığınız o kadar azdır. Birim testlerinin güçlü yönlerinden biri, kırılabilecek her küçük şeyi test etme eğiliminde olmalarıdır, sadece büyük şeyleri değil. İnsanlar genellikle basit ve hatasız olduğunu düşündükleri kodda kaç hata bulabilecekleri konusunda şaşırırlar.

Sadece büyük testlere odaklandığınızda, kodunuza olan genel güven hala çok eksiktir. Kodun çekirdek mantığının çoğu test edilmez (daha fazla bileşeni kapsıyor olsanız bile) ve düşünmemiş olabileceğiniz ve "gayri resmi olarak" endişe duyabileceğiniz birçok hata olabilir.

İyi testler, belirli bir nesne, fonksiyon ve bağımlılık setini (domain model) test etmek için kullanmak istediğiniz kalıpları anladıktan sonra, yazılması kolay ve hızlı olmalıdır.

**Başka bir ekibin kodunda hatalar olduğunda testlerim geçer mi? Testler farklı makinelerde veya ortamlarda çalıştırıldığında aynı sonuçları gösterir mi? Veritabanı, ağ veya dağıtım yoksa testlerim çalışmayı bırakır mı?**

Bu üç nokta, test kodumuzu çeşitli bağımlılıklardan izole etme fikrine atıfta bulunur. Test sonuçları tutarlıdır çünkü sistemimize olan bu dolaylı girdilerin ne sağladığı üzerinde kontrolümüz vardır. Sahte veritabanlarımız, sahte ağlarımız, sahte zamanımız ve sahte makine kültürümüz olabilir. Sonraki bölümlerde, bunlara stub'lar ve bunları enjekte edebileceğimiz seam'ler olarak atıfta bulunacağım.

**Bir testi silersem, taşırsam veya değiştirirsem, diğer testler etkilenmeden kalır mı?**

Birim testlerinin genellikle paylaşılan herhangi bir duruma ihtiyacı yoktur, ancak entegrasyon testleri genellikle harici bir veritabanı veya servis gibi paylaşılan duruma sahiptir. Paylaşılan durum, testler arasında bir bağımlılık yaratabilir. Örneğin, testleri yanlış sırada çalıştırmak gelecekteki testler için durumu bozabilir.

**UYARI:** Deneyimli birim test uzmanları bile, test etmeden önce hiç birim testi yapmadıkları bir domain modeline karşı ilk birim testini yazmanın 30 dakika veya daha fazla sürebileceğini görebilirler. Bu işin bir parçasıdır ve beklenmesi gerekir. O domain modelindeki ikinci ve sonraki testler, iş biriminin giriş ve çıkış noktalarını anladıktan sonra gerçekleştirmek çok kolay olmalıdır.

Önceki sorular ve cevaplarda üç ana kriter tanıyabiliriz:

- **Okunabilirlik** - Eğer okuyamazsak, o zaman bakımı zor, hata ayıklaması zor ve neyin yanlış olduğunu bilmek zor.
- **Sürdürülebilirlik** - Testi veya üretim kodunu sürdürmek testler yüzünden acı veriyorsa, hayatımız yaşayan bir kabus haline gelir.
- **Güven** - Başarısız olduklarında test sonuçlarına güvenmiyorsak, manuel test yapmaya başlarız ve testlerin sağlaması gereken zaman avantajını kaybederiz. Geçtiklerinde testlere güvenmiyorsak, daha fazla hata ayıklamaya başlarız ve yine herhangi bir zaman avantajını kaybederiz.

Şimdiye kadar bir birim testinin ne olmadığı ve testin yararlı olması için hangi özelliklerin mevcut olması gerektiği hakkında açıkladıklarımdan, bu bölümün ortaya koyduğu birincil soruyu cevaplamaya başlayabilirim: iyi bir birim testi nedir?

## 1.9 Tanımımızı Sonlandırma

Şimdi bir birim testinin sahip olması gereken önemli özellikleri ele aldığım için, birim testlerini bir kez ve herkes için tanımlayacağım:

> Bir birim testi, bir giriş noktası aracılığıyla iş birimini çağıran ve ardından çıkış noktalarından birini kontrol eden otomatik bir kod parçasıdır. Bir birim testi neredeyse her zaman bir birim testi çerçevesi kullanılarak yazılır. Kolayca yazılabilir ve hızlı çalışır. Güvenilir, okunabilir ve sürdürülebilirdir. Kontrol ettiğimiz üretim kodu değişmediği sürece tutarlıdır.

Bu tanım kesinlikle zorlu bir görev gibi görünüyor, özellikle de birçok geliştiricinin birim testlerini ne kadar kötü uyguladığı düşünüldüğünde. Şimdiye kadar geliştiriciler olarak testleri nasıl uyguladığımıza, nasıl uygulamak istediğimize kıyasla sert bir şekilde bakmamızı sağlıyor. (Güvenilir, okunabilir ve sürdürülebilir testler, 7'den 9'a kadar olan bölümlerde derinlemesine tartışılmaktadır.)

Bu kitabın ilk baskısında, birim testi tanımım biraz farklıydı. Bir birim testini "yalnızca kontrol akışı koduna karşı çalışma" olarak tanımlardım, ancak artık bunun doğru olduğunu düşünmüyorum. Mantığı olmayan kod genellikle bir iş biriminin parçası olarak kullanılır. Mantığı olmayan özellikler bile bir iş birimi tarafından kullanılacaktır, bu nedenle testler tarafından özel olarak hedeflenmelerine gerek yoktur.

**TANIM:** Kontrol akışı kodu, içinde bir tür mantığı olan, ne kadar küçük olursa olsun, herhangi bir kod parçasıdır. Aşağıdakilerden bir veya daha fazlasına sahiptir: bir if ifadesi, bir döngü, hesaplamalar veya başka herhangi bir karar verme kodu türü.

Getter'lar ve setter'lar, genellikle herhangi bir mantık içermeyen ve bu nedenle testler tarafından özel hedefleme gerektirmeyen kodların iyi örnekleridir. Test ettiğiniz iş birimi tarafından muhtemelen kullanılacak koddur, ancak doğrudan test etmeye gerek yoktur. Ancak dikkat edin: bir getter veya setter içine herhangi bir mantık eklediğinizde, o mantığın test edildiğinden emin olmak isteyeceksiniz.

Bir sonraki bölümde, iyi bir testin ne olduğunu konuşmayı bırakacağız ve testleri ne zaman yazmak isteyebileceğinizden bahsedeceğiz. Test güdümlü geliştirmeyi tartışacağım, çünkü genellikle birim testi yapmakla aynı sepete konuluyor. Bu konuda kaydı düzelttiğimizden emin olmak istiyorum.

## 1.10 Test Güdümlü Geliştirme

Bir birim testi çerçevesiyle okunabilir, sürdürülebilir ve güvenilir testler yazmayı öğrendikten sonra, bir sonraki soru testleri ne zaman yazacağınızdır. Birçok insan, yazılım için birim testleri yazmanın en iyi zamanının, bazı işlevsellikler oluşturduktan sonra ve kodlarını uzak kaynak kontrolüne birleştirmeden hemen önce olduğunu düşünüyor.

Ayrıca, açık olmak gerekirse, birçok insan testlerin yazılmasının iyi bir fikir olduğuna inanmıyor, ancak deneme yanılma yoluyla kaynak kontrol incelemelerinde katı test gereksinimleri olduğunu fark ettiler, bu yüzden kod inceleme tanrılarını memnun etmek ve kodlarını ana dala birleştirmek için testler yazmak zorundalar. (Bu tür bir dinamik, kötü testlerin harika bir kaynağıdır ve bu kitabın üçüncü bölümünde bunu ele alacağım.)

Giderek artan sayıda geliştirici, kodlama oturumu sırasında ve her bir çok küçük işlevsellik parçası uygulanmadan önce birim testlerini artımlı olarak yazmayı tercih ediyor. Bu yaklaşıma test-first veya test güdümlü geliştirme (TDD) denir.

**NOT:** Test güdümlü geliştirmenin tam olarak ne anlama geldiği konusunda birçok farklı görüş vardır. Bazıları bunun test-first geliştirme olduğunu söylüyor ve bazıları bunun çok sayıda teste sahip olmak anlamına geldiğini söylüyor. Bazıları bunun bir tasarlama yolu olduğunu söylüyor ve diğerleri bunun kodunuzun davranışını sadece bir miktar tasarımla yönlendirmenin bir yolu olabileceğini düşünüyor. Bu kitapta, TDD test-first geliştirme anlamına gelir, tasarım teknikte artımlı bir rol alır (bu bölüm dışında, TDD bu kitapta tartışılmayacaktır).

Şekil 1.8 ve 1.9, geleneksel kodlama ile TDD arasındaki farkları gösterir. TDD, Şekil 1.9'da gösterildiği gibi geleneksel geliştirmeden farklıdır. Başarısız olan bir test yazarak başlarsınız; sonra testi geçmeyi sağlayan üretim kodunu oluşturmaya geçersiniz ve ardından kodunuzu yeniden düzenlemeye devam edersiniz veya başka bir başarısız test oluşturursunuz.

```
Fonksiyon, sınıf → Testleri yaz → Testleri → Hataları
veya uygulama yaz  (zamanımız    çalıştır  düzelt
                    varsa)       (zamanımız (zamanımız
                                  varsa)     varsa)
```

**Şekil 1.8** Birim testleri yazmanın geleneksel yolu

```
     Başla.
       |
    Düşün. ←----------------┐
       |                    |
       ↓                    |
    Tasarla.                |
       |                    |
       ↓                    |
  Sonraki küçük            |
  işlevselliğin            |
  eksik veya yanlış        |
  olduğunu kanıtla-        |
  mak için yeni            |
  bir test yaz.            |
       |                    |
       ↓                    |
  Tüm testleri     Yeni test   
  çalıştır.    →   derlenmeli   
                   ve başarısız  
                   olmalı ⊗     
                       |         
                       ↓         
                  En basit       
                  olası          
                  üretim         
                  kodu düzeltmesi
                       |         
                       ↓         
                  Güven          
                  kazanana       
                  kadar          
                  tekrarla       
                       |         
                       ↓         
                  Tüm testleri   
                  çalıştır.      
                       |         
                       ↓         
                  Tüm testler    
                  geçmeli. ✓     
                       |         
      ┌----------------┘         
      |                          
      ↓                          
  Kodu beğenene                  
  kadar tekrarla                 
      |                          
      ↓                          
  Artımlı                        
  yeniden                        
  yapılandırma                   
  gerektiğinde                   
  test veya                      
  üretim kodunda                 
      |                          
      ↓                          
   Tasarla                       
      |                          
      ↓                          
  Tüm testleri    ←--------------┘
  çalıştır.
      |
      ↓
  Tüm testler
  geçmeli. ✓
```

**Şekil 1.9** Test güdümlü geliştirme - kuş bakışı görünümü. Sürecin döngüsel doğasına dikkat edin: testi yaz, kodu yaz, yeniden düzenle, sonraki testi yaz. TDD'nin artımlı doğasını gösterir: küçük adımlar, güvenle kaliteli bir nihai sonuca yol açar.

Bu kitap, TDD yerine iyi birim testleri yazma tekniğine odaklanıyor, ancak ben TDD'nin büyük bir hayranıyım. TDD kullanarak birkaç büyük uygulama ve çerçeve yazdım, onu kullanan ekipleri yönettim ve TDD ve birim testi teknikleri üzerine yüzlerce kurs ve atölye öğrettim. Kariyerim boyunca, TDD'nin kaliteli kod, kaliteli testler ve yazdığım kod için daha iyi tasarımlar oluşturmada yardımcı olduğunu buldum. Sizin yararınıza çalışabileceğine eminim, ancak bunun bir bedeli yok değil (öğrenme zamanı, uygulama zamanı ve daha fazlası). Yine de, öğrenme mücadelesini üstlenmeye istekliyseniz, kesinlikle giriş ücretine değer.

### 1.10.1 TDD: İyi birim testleri için bir ikame değil

TDD'nin proje başarısını garanti etmediğini veya sağlam veya sürdürülebilir testler olmadığını fark etmek önemlidir. TDD tekniğine kapılmak ve birim testlerinin yazılma şekline, adlandırmalarına, ne kadar sürdürülebilir veya okunabilir olduklarına ve doğru şeyleri test edip etmediklerine veya kendilerinde hatalar olup olmadığına dikkat etmemek oldukça kolaydır. Bu yüzden bu kitabı yazıyorum - çünkü iyi testler yazmak TDD'den ayrı bir beceridir.

TDD tekniği oldukça basittir:

1. **Kodun veya işlevselliğin nihai üründe eksik olduğunu kanıtlamak için başarısız bir test yazın.** Test, üretim kodu zaten çalışıyormuş gibi yazılır, bu nedenle testin başarısız olması üretim kodunda bir hata olduğu anlamına gelir. Nasıl bilirim? Test, üretim kodunun hatası olmasaydı geçecek şekilde yazılmıştır.

   JavaScript dışındaki bazı dillerde, test başlangıçta kod henüz mevcut olmadığı için derlenemeyebilir. Çalıştırıldığında, üretim kodu hala çalışmadığı için başarısız olmalıdır. TDD'de "tasarım" düşüncesinin çoğu burada gerçekleşir.

2. **Üretim koduna testinizin beklentilerini karşılayan işlevsellik ekleyerek testi geçirin.** Üretim kodu mümkün olduğunca basit tutulmalıdır. Teste dokunmayın. Sadece üretim koduna dokunarak geçirmeniz gerekir.

3. **Kodunuzu yeniden düzenleyin.** Test geçtiğinde, bir sonraki birim testine geçmekte veya kodunuzu (hem üretim kodu hem de testler) daha okunabilir hale getirmek, kod çoğaltmasını kaldırmak vb. için yeniden düzenlemekte özgürsünüz. "Tasarım" kısmının gerçekleştiği başka bir nokta budur. Yeniden düzenleme yaparız ve hala eski işlevselliği korurken bileşenlerimizi yeniden tasarlayabiliriz.

   Yeniden düzenleme adımları çok küçük ve artımlı olmalı ve bir şeyi değişikliklerimizle bozmadığımızdan emin olmak için her küçük adımdan sonra tüm testleri çalıştırmalıyız. Yeniden düzenleme, birkaç test yazdıktan sonra veya her testten sonra yapılabilir. Önemli bir uygulamadır, çünkü kodunuzun okunmasını ve bakımını kolaylaştırırken, önceden yazılmış tüm testlerden hala geçmesini sağlar. Kitapta daha sonra yeniden düzenleme hakkında tam bir bölüm (8.3) var.

**TANIM:** Yeniden düzenleme, işlevselliğini değiştirmeden bir kod parçasını değiştirmek anlamına gelir. Bir metodu yeniden adlandırdıysanız, yeniden düzenleme yapmışsınızdır. Büyük bir metodu birden fazla küçük metot çağrısına böldüyseniz, kodunuzu yeniden düzenlemiş olursunuz. Kod hala aynı şeyi yapar, ancak bakımı, okunması, hata ayıklaması ve değiştirilmesi daha kolay hale gelir.

Önceki adımlar teknik görünüyor, ancak arkalarında çok fazla bilgelik var. Doğru yapıldığında, TDD kod kalitenizin yükselmesini, hata sayısının azalmasını, koddaki güveninizin artmasını, hataları bulma süresinin kısalmasını, kodunuzun tasarımının iyileşmesini ve yöneticinizin daha mutlu olmasını sağlayabilir. TDD yanlış yapılırsa, proje programınızın kaymasına, zamanınızı boşa harcamasına, motivasyonunuzu düşürmesine ve kod kalitenizi düşürmesine neden olabilir. İki taraflı bir kılıçtır ve birçok insan bunu zor yoldan öğrenir.

Teknik olarak, TDD'nin kimsenin size söylemediği en büyük faydalarından biri, bir testi başarısız görüp, sonra testi değiştirmeden geçmesini sağlayarak, temelde testi kendisini test etmiş olmanızdır. Başarısız olmasını bekliyorsunuz ve geçiyorsa, testinizde bir hata olabilir veya yanlış şeyi test ediyor olabilirsiniz. Test başarısız olduysa, düzelttiniz ve şimdi geçmesini bekliyorsunuz ve hala başarısız oluyorsa, testinizde bir hata olabilir veya belki yanlış bir şeyin olmasını bekliyor.

Bu kitap okunabilir, sürdürülebilir ve güvenilir testlerle ilgileniyor, ancak bunun üstüne TDD eklerseniz, başarısız olmaları gerektiğinde başarısız olan ve geçmeleri gerektiğinde geçen testleri görerek kendi testlerinize olan güveniniz artacaktır. Test sonrası tarzda, genellikle onları yalnızca geçmeleri gerektiğinde geçerken görürsünüz ve geçmemeleri gerektiğinde başarısız olurlar (test ettikleri kod zaten çalışıyor olmalı). TDD bununla çok yardımcı olur ve aynı zamanda geliştiricilerin TDD uygularken gerçekten test ettikten sonra birim testi yaparken olduğundan çok daha az hata ayıklama yapmasının nedenlerinden biridir. Testlere güvenirlerse, "her ihtimale karşı" hata ayıklama ihtiyacı hissetmezler. Bu tür güveni yalnızca testin her iki tarafını da görerek kazanabilirsiniz - gerektiğinde başarısız olması ve gerektiğinde geçmesi.

### 1.10.2 Başarılı TDD için gereken üç temel beceri

Test güdümlü geliştirmede başarılı olmak için üç farklı beceri setine ihtiyacınız vardır: iyi testler yazmayı bilmek, onları test-first yazmak ve testleri ve üretim kodunu iyi tasarlamak. Şekil 1.10 bunları daha net gösterir:

- Testlerinizi önce yazdığınız için sürdürülebilir, okunabilir veya güvenilir oldukları anlamına gelmez. İyi birim testi becerileri bu kitabın tamamen ilgili olduğu şeydir.
- Okunabilir, sürdürülebilir testler yazdığınız için, onları test-first yazarken elde ettiğiniz avantajların aynısını elde edeceğiniz anlamına gelmez. Test-first becerileri, orada bulunan TDD kitaplarının çoğunun öğrettiği şeydir, iyi test yapma becerilerini öğretmeden. Özellikle Kent Beck'in *Test-Driven Development: By Example* (Addison-Wesley Professional, 2002) kitabını tavsiye ederim.
- Testlerinizi önce yazdığınız ve okunabilir ve sürdürülebilir olduklarında, iyi tasarlanmış bir sistemle sonuçlanacağınız anlamına gelmez. Tasarım becerileri, kodunuzu güzel ve sürdürülebilir yapan şeylerdir. Steve Freeman ve Nat Pryce'ın *Growing Object-Oriented Software, Guided by Tests* (Addison-Wesley Professional, 2009) ve Robert C. Martin'in *Clean Code* (Pearson, 2008) kitaplarını konu hakkında iyi kitaplar olarak öneririm.

```
┌──────────────────────────────────────────┐
│             TDD becerileri               │
│                                          │
│  ┌────────┐    ┌────────┐    ┌────────┐│
│  │  İyi   │    │Test-   │    │ SOLID  ││
│  │testler │    │first   │    │tasarım ││
│  │yazmak  │    │yazmak  │    │        ││
│  └────────┘    └────────┘    └────────┘│
│      ↑              ↑            ↑      │
└──────┼──────────────┼────────────┼──────┘
       │              │            │
       │              └────────────┘
   Bu kitap            Diğer kitaplar
```

**Şekil 1.10** Test güdümlü geliştirmenin üç temel becerisi

TDD öğrenmeye pragmatik bir yaklaşım, bu üç yönün her birini ayrı ayrı öğrenmektir; yani, bu arada diğerlerini görmezden gelerek, aynı anda bir beceriye odaklanmaktır. Bu yaklaşımı önermemin nedeni, genellikle insanların üç beceri setini aynı anda öğrenmeye çalıştığını, süreçte gerçekten zor zamanlar geçirdiğini ve sonunda vazgeçtiğini görüyorum çünkü tırmanılacak duvar çok yüksek. Bu alana öğrenmek için daha artımlı bir yaklaşım benimseyerek, kendinizi şu anda odaklandığınız alandan farklı bir alanda yanlış yaptığınız sürekli korkusundan kurtarırsınız.

Bir sonraki bölümde, JavaScript için en yaygın kullanılan test çerçevelerinden biri olan Jest'i kullanarak ilk birim testlerinizi yazmaya başlayacaksınız.

## Özet

- İyi bir birim testi şu niteliklere sahiptir:
  - Hızlı çalışmalıdır.
  - Test edilen kod üzerinde tam kontrole sahip olmalıdır.
  - Tamamen izole edilmiş olmalıdır (diğer testlerden bağımsız çalışmalıdır).
  - Dosya sistemi dosyaları, ağlar veya veritabanlar gerektirmeden bellekte çalışmalıdır.
  - Mümkün olduğunca senkron ve doğrusal olmalıdır (yardım edebilirsek paralel thread yok).

- Giriş noktaları, iş birimlerimizin kapılarıdır ve alttaki mantığı tetikleyen public fonksiyonlardır. Çıkış noktaları, testinizle inceleyebileceğiniz yerlerdir. İş birimlerinin etkilerini temsil ederler.

- Bir çıkış noktası bir dönüş değeri, bir durum değişikliği veya üçüncü taraf bir bağımlılığa bir çağrı olabilir. Her çıkış noktası genellikle ayrı bir test gerektirir ve her çıkış noktası türü farklı bir test tekniği gerektirir.

- Bir iş birimi, bir giriş noktasının çağrılmasından, bir veya daha fazla çıkış noktası aracılığıyla fark edilebilir bir nihai sonuca kadar gerçekleşen eylemlerin toplamıdır. Bir iş birimi bir fonksiyonu, bir modülü veya birden fazla modülü kapsayabilir.

- Entegrasyon testi, bazı veya tüm bağımlılıkların gerçek olduğu ve mevcut yürütme sürecinin dışında bulunduğu birim testidir. Tersine, birim testi entegrasyon testi gibidir, ancak tüm bağımlılıklar bellektedir (hem gerçek hem de sahte) ve testte davranışları üzerinde kontrolümüz vardır.

- Herhangi bir testin en önemli özellikleri okunabilirlik, sürdürülebilirlik ve güvendir. Okunabilirlik, testi okumayı ve anlamayı ne kadar kolay olduğunu söyler. Sürdürülebilirlik, test kodunu sürdürmenin ne kadar acı verici olduğunun ölçüsüdür. Güven olmadan, bir kod tabanına önemli değişiklikler (yeniden düzenleme gibi) getirmek daha zordur, bu da kod bozulmasına yol açar.

- Test güdümlü geliştirme (TDD), üretim kodundan önce testler yazmayı savunan bir tekniktir. Bu yaklaşım ayrıca test-first yaklaşımı olarak da adlandırılır (code-first'in aksine). TDD'nin ana faydası testlerinizin doğruluğunu doğrulamaktır. Üretim kodu yazmadan önce testlerinizin başarısız olmasını görmek, kapsamları olan işlevsellik düzgün çalışmayı durdurursa aynı testlerin başarısız olacağını garanti eder.
