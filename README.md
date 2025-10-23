# 📖 TDD (Test-Driven Development) Çeviri Projesi

## 🎯 Proje Amacı
Bu proje, TDD konusunda temel bir İngilizce PDF kaynağının Türkçe'ye sistematik ve kaliteli bir şekilde çevrilmesi için oluşturulmuştur.

## 📁 Klasör Yapısı

```
tdd-project/
├── originals/          # Orijinal PDF dosyaları (40-50 sayfalık bölümler)
├── translations/       # Tamamlanan Türkçe çeviriler (Markdown formatında)
├── references/         # Referans materyaller ve araştırmalar
└── logs/              # Proje günlükleri ve ilerleme takibi
    └── PROJECT_LOG.md # Ana günlük dosyası
```

## 🔄 Çalışma Akışı

### 1. PDF Yükleme
- Kullanıcı 40-50 sayfalık bir PDF bölümü yükler
- PDF `/originals/` klasörüne kaydedilir

### 2. Çeviri Süreci
- İlk çeviri taslağı hazırlanır
- Anlamsal çeviri yaklaşımı kullanılır
- Teknik terimler için terminoloji sözlüğüne başvurulur

### 3. Onay Mekanizması
- Çeviri kullanıcıya sunulur
- Geri bildirimler alınır
- Gerekli düzeltmeler yapılır

### 4. Finalizasyon
- Onaylanan çeviri markdown dosyasına dönüştürülür
- `/translations/` klasörüne kaydedilir
- Günlük dosyası güncellenir

### 5. Referans Araştırması
- Gerekli kavramlar için derin araştırma yapılır
- Referanslar `/references/` klasörüne eklenir

## 📊 İlerleme Takibi

Proje ilerlemesi `logs/PROJECT_LOG.md` dosyasından takip edilir. Bu dosya:
- Tamamlanan bölümleri
- Devam eden çalışmayı
- Bekleyen işleri
- Oturum kayıtlarını
içerir.

## 🔑 Önemli Dosyalar

- **PROJECT_LOG.md**: Ana günlük ve ilerleme takibi
- **TERMINOLOGY.md**: Tutarlı çeviri için terim sözlüğü
- **README.md**: Bu dosya - proje açıklaması

## 💡 Çeviri İlkeleri

1. **Anlamsal Çeviri**: Kelime kelime değil, anlam odaklı
2. **Tutarlılık**: Terimler için standart karşılıklar kullanılır
3. **Teknik Doğruluk**: TDD kavramları doğru aktarılır
4. **Okunabilirlik**: Türkçe okuyucu için akıcı metin
5. **Kod Bütünlüğü**: Kod örnekleri orijinal haliyle korunur

## 🚀 Yeni Oturum Başlatma

Farklı bir sohbette devam etmek için:
1. `logs/PROJECT_LOG.md` dosyasını oku
2. Son durumu ve kaldığınız yeri öğren
3. İlgili çeviri dosyalarını incele
4. Kaldığınız yerden devam edin

---

**Başlangıç Tarihi:** 23 Ekim 2025  
**Durum:** Aktif - İlk PDF bekleniyor
