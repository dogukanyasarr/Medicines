# Medivy – AI Destekli İlaç Sorgulama Mobil Uygulaması

Medivy, React Native ile geliştirilen ve özel eğitilmiş yapay zeka modeliyle güçlendirilmiş bir ilaç sorgulama mobil uygulamasıdır. Kullanıcılar, ilaçlar hakkında detaylı bilgi alabilir, reçetelerini yönetebilir ve favori ilaçlarını kolayca takip edebilir.

## Proje Amacı
Sağlık Bakanlığı'ndan alınan ilaç verileriyle, kullanıcıların ilaçlar ve etken maddeleri hakkında güvenilir bilgiye ulaşmasını sağlamak, reçete ve ilaç yönetimini kolaylaştırmak ve yapay zeka desteğiyle kişiselleştirilmiş öneriler sunmak.

## Temel Özellikler
- **AI Destekli Sorgulama:** Eğitilmiş model ile, ilaçların etken maddesine göre hastanın kullanıp kullanamayacağına dair öneriler sunar. (Örn: "Etken şu olan ilacı hekimine danışmadan kullanma, eğer alerjin olduğunu düşünüyorsan...")
- **Detaylı İlaç Bilgisi:** Adı, miligramı, yüzdesi, çözeltisi, etken maddesi, firma, ATC kodu, ruhsat tarihi, barkodu, ruhsat no'su gibi tüm bilgiler JSON formatında saklanır ve sorgulanabilir.
- **Reçete Yönetimi:** Kullanıcılar, doktorlarından aldıkları reçeteleri uygulama içinde güvenle depolayabilir ve yönetebilir.
- **Favori İlaçlar:** İlaçlar miligramına kadar favorilere eklenebilir, kullanıcılar sık kullandıkları ilaçlara hızlıca erişebilir.
- **Gelişmiş Arama:** İlaçlar arasında isim, etken madde veya diğer kriterlere göre hızlı arama yapılabilir.
- **Atomic Design:** Uygulama arayüzü atomic design prensiplerine göre modüler ve sürdürülebilir şekilde tasarlanmıştır.
- **Bulut Tabanlı Veri ve Login:** İlaç verileri ve kullanıcı giriş işlemleri Python FastAPI ile bulut ortamında yönetilir.
- **Web API Üzerinden AI Modeli:** Eğitilmiş yapay zeka modeli, FastAPI tabanlı bir web API üzerinden uygulamaya entegre edilmiştir.

## Kullanılan Teknolojiler
- **React Native** – Mobil uygulama geliştirme
- **TypeScript** – Tip güvenliği
- **Python FastAPI** – Bulut tabanlı API ve veri yönetimi
- **Uvicorn** – FastAPI için ASGI sunucusu
- **Transformers, Torch, SentencePiece** – AI modelinin eğitimi ve sunumu
- **Özel AI Modeli** – İlaç etken maddesi bazlı öneriler için eğitilmiş model
- **JSON Veri Yapısı** – İlaç verilerinin saklanması
- **Atomic Design** – Arayüz mimarisi

### Kullandığım Kütüphaneler
- fastapi
- uvicorn
- transformers
- torch
- sentencepiece

## Veri Yapısı
İlaç verileri, Sağlık Bakanlığı'ndan alınan CSV dosyasının JSON'a dönüştürülmesiyle elde edilmiştir. Her ilaç için aşağıdaki bilgiler tutulur:
- Adı
- Miligramı
- Yüzdesi
- Çözeltisi
- Etken maddesi
- Firma
- ATC kodu
- Ruhsat tarihi
- Barkodu
- Ruhsat numarası

## AI Entegrasyonu
Medivy, OpenAI veya GeminiAI gibi hazır çözümler yerine, ilaç etken maddelerine göre özel eğitilmiş bir yapay zeka modeli kullanır. Model, FastAPI tabanlı bir web API üzerinden uygulamaya entegre edilmiştir ve hastanın reçetesindeki ilaçların etken maddelerine göre kişiselleştirilmiş öneriler ve uyarılar sunar.

## Bulut Tabanlı Mimari
- **Veri ve Login:** Tüm ilaç verileri ve kullanıcı giriş işlemleri, Python FastAPI ile geliştirilen bulut tabanlı bir backend üzerinden sağlanır.
- **AI Modeli:** Eğitilmiş yapay zeka modeli de yine FastAPI ile sunulan bir web API üzerinden mobil uygulamaya entegre edilmiştir.

## Atomic Design
Uygulama arayüzü, atomic design prensiplerine uygun olarak atom, molekül, organizma, şablon ve sayfa seviyelerinde modüler olarak geliştirilmiştir. Bu sayede kodun bakımı ve ölçeklenmesi kolaydır.

## Reçete ve Favori Yönetimi
- **Reçete Sayfası:** Kullanıcılar, doktorlarından aldıkları reçeteleri uygulama içinde saklayabilir ve yönetebilir.
- **Favori İlaçlar:** Kullanıcılar, ilaçları miligramına kadar favorilere ekleyebilir ve hızlıca erişebilir.

## Kurulum
1. Depoyu klonlayın:
   ```bash
   git clone <repo-link>
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   # veya
   yarn install
   ```
3. Uygulamayı başlatın:
   ```bash
   npx react-native run-android
   # veya
   npx react-native run-ios
   ```

## Kullanım
- Uygulamayı açın ve giriş yapın.
- Ana ekrandan ilaç ismi, etken madde veya barkod ile sorgulama yapın.
- AI destekli önerileri ve uyarıları inceleyin.
- Reçetelerinizi ve favori ilaçlarınızı yönetin.

## Katkı Sağlama
Katkıda bulunmak için projeyi fork'layıp pull request gönderebilirsiniz.

## Lisans
Bu proje MIT lisansı ile lisanslanmıştır. 