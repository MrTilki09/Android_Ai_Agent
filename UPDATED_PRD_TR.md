# Ajanik Dijital İkiz Uygulaması PRD

## 1. Ürün Özeti

Ajanik Dijital İkiz Uygulaması, kullanıcıların dikkat dağıtan uygulama kullanımını azaltmasına yardımcı olmak için yapay zeka ajanı kullanan Android odaklı bir React Native mobil uygulamasıdır. Ürün; yerel mobil telemetriyi, Android native izinlerini, LLM tabanlı araç çağırma döngüsünü ve Dijital İkiz tarzı müdahaleleri bir araya getirir.

Uygulama, klasik ve katı bir engelleyici gibi davranmak yerine kullanım alışkanlıklarını gözlemlemeyi, kullanıcının mevcut dijital davranışını anlamayı ve bu davranış kullanıcının hedeflediği “ideal ikiz” davranışından uzaklaştığında müdahale etmeyi amaçlar.

## 2. Problem Tanımı

Mevcut ekran süresi araçları genellikle sabit zamanlayıcılara, manuel limitlere veya sert uygulama engellerine dayanır. Kullanıcılar bu araçları çoğu zaman genel, rahatsız edici veya uygulamayı açma nedenlerinden kopuk buldukları için aşar ya da görmezden gelir.

Kullanıcıların daha uyarlanabilir bir sisteme ihtiyacı vardır:

- Örtük cihaz kullanım verilerinden öğrenen.
- Hangi uygulamaların dikkat dağıtıcı hale geldiğini anlayan.
- Kullanıcıyı doğru anda dürten.
- Deneyimi kişisel, yerel ve ajan odaklı tutan.
- Kullanıcının mevcut davranışını ideal üretken benliğiyle hizalamasına yardım eden.

## 3. Ürün Amacı

Bir yapay zeka ajanı tarafından desteklenen Android öncelikli React Native mobil uygulaması geliştirmek. Uygulama şunları yapabilmelidir:

- Cihazdan uygulama kullanım bilgilerini toplamak.
- Konuşma hafızasını ve ajan gözlemlerini yerel olarak saklamak.
- Kullanıcının veya ajanın dikkat dağıtan uygulamalar için kullanım limitleri tanımlamasına izin vermek.
- Seçilen uygulamaları Android native servisleri üzerinden izlemek.
- Limitler aşıldığında bağlamsal Dijital İkiz müdahaleleri tetiklemek.
- Araç çağırma ve ajan muhakemesi için yerel bir LLM sunucusuyla iletişim kurmak.

## 4. Hedef Kullanıcılar

### Birincil Kullanıcılar

- Öğrenciler.
- Kişisel gelişime önem veren kullanıcılar.
- Dikkat dağınıklığı yaşayan profesyoneller.
- Sosyal medya, oyun, tarayıcı veya diğer zorunlu olmayan uygulamalarda yüksek günlük kullanım süresine sahip kullanıcılar.

### Temel Sorunlar

- Dikkat dağıtan uygulamalarda yüksek ekran süresi.
- Anlık hazza yenik düşme ve sonsuz kaydırma.
- Bildirim yorgunluğu.
- Geleneksel uygulama zamanlayıcılarını aşma.
- Uygulama tarafından cezalandırılmadan destek alma isteği.

### Kullanıcı Hedefleri

- Dikkat dağıtan uygulamaların kullanımını azaltmak.
- Daha bilinçli dijital alışkanlıklar geliştirmek.
- Genel engeller yerine kişiselleştirilmiş müdahaleler almak.
- Kişisel kullanım verilerini mümkün olduğunca yerelde tutmak.
- Dijital davranış yönetiminde yapay zeka asistanını koç gibi kullanmak.

## 5. Ürün Kapsamı

### Kapsam Dahilinde

- React Native Android uygulaması.
- Home, Chat, Apps, Settings ve Intervention alanlarını içeren drawer tabanlı navigasyon.
- Yapılandırılabilir LM Studio uyumlu endpoint üzerinden yerel LLM entegrasyonu.
- Ajan araç çağırma döngüsü.
- Native Android kullanım istatistikleri erişimi.
- Uygulama kullanım limiti takibi için native Android erişilebilirlik servisi.
- Uygulama adları, ikonlar, kullanım süresi ve limitleri içeren yerel uygulama kullanım listesi.
- Dijital İkiz kullanım limiti saklama.
- İzlenen bir uygulama limitini aştığında deep link tabanlı müdahale ekranı.
- SQLite ve Drizzle ile yerel sohbet hafızası.
- Bildirim, SMS, kişiler, kullanım istatistikleri ve erişilebilirlik için izin akışları.
- Kullanım istatistikleri, kişiler, SMS, bildirimler, Twitter/X oluşturucu ve uygulama limitleri için native bridge araçları.

### Mevcut Sürümde Kapsam Dışı

- iOS uygulaması.
- Biyometrik veya sağlık takibi.
- Tam arka plan analitik motoru.
- Sert işletim sistemi seviyesinde uygulama kilidi.
- Bulut tabanlı kullanıcı profili senkronizasyonu.
- Gelişmiş psikolojik kişiselleştirme modeli.
- Üretim seviyesinde güvenlik, gizlilik ve gözlemlenebilirlik sistemleri.
- Kullanıcı onayı olmadan tamamen otonom paylaşım veya mesajlaşma.

## 6. Mevcut Uygulama Durumu

### Tamamlandı

- React Native Android proje kurulumu.
- Android native modüllerinin React Native bridge üzerinden kayıt edilmesi.
- Konuşma geçmişini ve araç tanımlarını LM Studio uyumlu yerel LLM sunucusuna gönderen ajan döngüsü.
- Native araç çalıştırma ve gözlem geri beslemesi içeren çok adımlı araç çağırma döngüsü.
- SQLite içinde yerel sohbet ve araç hafızası.
- Önceki kullanıcı/asistan mesajlarını yerel hafızadan yükleyen sohbet arayüzü.
- Settings ekranında yapılandırılabilir LM Studio URL ayarı.
- Bugünün uygulama kullanımını okuyan kullanım istatistikleri native modülü.
- Kullanım izni kontrolü ve sistem ayarlarına yönlendirme.
- Algılanan uygulamaları, ikonları, kullanım sürelerini ve yapılandırılmış Dijital İkiz limitlerini gösteren Apps ekranı.
- Erişilebilirlik tabanlı Dijital İkiz izleme servisi.
- Kullanıcı tarafından tanımlanan paket limitlerini React Native’den Android native servisine gönderen uygulama limiti bridge’i.
- Yerel async storage ile Dijital İkiz limit saklama.
- Settings ekranında kayıtlı Dijital İkiz limitlerini görüntüleme.
- Müdahale akışı için deep link rotası.
- İzlenen bir uygulama yapılandırılmış kullanım limitini aştığında gösterilen müdahale ekranı.
- Native bildirim zamanlama ve anlık bildirim yeteneği.
- Ajan akışında onaylı native SMS gönderme yeteneği.
- Ajan akışında onaylı native kişi okuma yeteneği.
- Paylaşmadan önce kullanıcı onayı gerektiren Twitter/X oluşturucu açma yeteneği.
- Basit ajan-arayüz aksiyonu olarak arka plan rengi değiştirme aracı.
- İlk açılış/onboarding ekran yapısının mevcut olması.

### Kısmen Tamamlandı

- JITAI davranışı müdahale ekranı ve native bildirim yeteneğiyle mevcuttur; ancak mevcut müdahale tam LLM kişiselleştirmesinden çok kural/limit tabanlıdır.
- Kullanım limiti ayarlama ajan araç çağrıları ve yerel saklama üzerinden mevcuttur; ancak Apps ekranından her uygulama için manuel limit düzenleme tam olarak tamamlanmamıştır.
- Uygulama kullanım istatistiklerini okuyabilir; ancak kilit açma sayısı, mevcut ön plan uygulaması telemetrisi ve daha zengin oturum analizi yapılandırılmış ajan bağlamı olarak tam modellenmemiştir.
- Erişilebilirlik servisi seçilen paketleri izleyip uygulamayı tetikleyebilir; ancak pil/performans optimizasyonu doğrulanmamıştır.
- Yerel veri saklama mevcuttur; ancak gizlilik kontrolleri, silme arayüzü ve dışa aktarma kontrolleri tamamlanmamıştır.
- İzin yönetimi mevcuttur; ancak onboarding, kullanıcıyı gerekli izinlerden daha iyi geçirmelidir.
- Orijinal “Gerçek İkiz ve Mükemmel İkiz” konsepti limitler ve müdahale mesajlarıyla temsil edilmektedir; ancak tam bir ikiz profil modeli henüz yoktur.

### Henüz Tamamlanmadı

- Hafta içi/hafta sonu ve bağlama duyarlı dinamik baseline öğrenimi.
- Kullanıcı kişiliği, niyeti ve tekrar eden kalıplara dayalı tam psikolojik kişiselleştirme sistemi.
- Kullanıcının müdahaleden sonra dikkat dağıtan uygulamadan 5 dakika içinde çıkıp çıkmadığını ölçen otomatik JITAI başarı takibi.
- Kilit açma sayısı toplama.
- LLM erişilemediğinde sürekli pasif telemetri kuyruğu.
- LLM hataları ve native modül hataları etrafında üretim seviyesi hata yönetimi.
- Resmi gizlilik/güvenlik incelemesi.
- Pil tüketimi ölçümü.
- API gecikme süresi ölçümü.
- Ajan döngüsü, veritabanı davranışı ve native bridge akışları için otomatik testler.

## 7. Temel Özellikler ve Kullanıcı Hikayeleri

### 7.1 Ajan Sohbeti ve Araç Çağırma

**Kullanıcı Hikayesi:** Bir kullanıcı olarak, yapay zeka ajanıyla sohbet etmek istiyorum; böylece kullanım kalıplarımı incelemesini, limitleri ayarlamasını ve dijital alışkanlıklarımı yönetmeme yardım etmesini isteyebilirim.

**Durum:** Tamamlandı.

**Uygulanan Davranış:**

- Kullanıcı sohbet mesajı gönderebilir.
- Ajan konuşma geçmişini ve kullanılabilir araç şemalarını yerel LLM endpoint’ine gönderir.
- Ajan LLM’den araç çağrıları alabilir.
- Native araç sonuçları hafızaya geri eklenir.
- Ajan nihai asistan yanıtı oluşana kadar döngüyü sürdürür.

**Kabul Kriterleri:**

- Kullanıcı mesajı sohbette hemen görünür.
- LLM tamamlandığında asistan yanıtı görünür.
- Araç çağrıları çalıştırılıp ajana geri beslenebilir.
- Konuşma geçmişi yerel olarak kalıcıdır.

### 7.2 Yerel LLM Yapılandırması

**Kullanıcı Hikayesi:** Bir kullanıcı olarak, yerel LLM sunucu URL’imi yapılandırmak istiyorum; böylece ajanı LM Studio veya uyumlu başka bir yerel endpoint üzerinden çalıştırabilirim.

**Durum:** Tamamlandı.

**Uygulanan Davranış:**

- Settings içinde LM Studio URL modalı vardır.
- Kaydedilen URL varsayılan yerel emulator endpoint’inin üzerine yazar.
- Ajan istekleri mevcutsa yapılandırılmış URL’i kullanır.

**Kabul Kriterleri:**

- Kullanıcı endpoint URL’i kaydedebilir.
- Uygulama sonraki ajan çağrılarında kaydedilen endpoint’i tekrar kullanır.
- Özel URL belirlenmediğinde varsayılan Android emulator host’u kullanılabilir.

### 7.3 Dijital İz / Kullanım Verisi Toplama

**Kullanıcı Hikayesi:** Ajan olarak, kullanıcının mevcut dijital davranışını anlayabilmek için örtük uygulama kullanım verilerini almam gerekir.

**Durum:** Kısmen tamamlandı.

**Uygulanan Davranış:**

- Android kullanım istatistikleri native modül üzerinden okunur.
- Bugünün uygulama kullanımı paket adları, toplam ön plan süresi, uygulama etiketleri ve ikonlarla döner.
- Apps ekranı sonuçları gösterir.
- Ajanın kullanım istatistiklerini istemek için aracı vardır.

**Kalan İşler:**

- Kilit açma sayısı toplama eklemek.
- Daha zengin ön plan/oturum bağlamı eklemek.
- Uzun vadeli analiz için kullanım payload’larını normalize etmek.
- Sadece isteğe bağlı okuma yerine arka plan telemetri toplama eklemek.

### 7.4 Uygulama Kullanım Paneli

**Kullanıcı Hikayesi:** Bir kullanıcı olarak, bugün hangi uygulamaları ne kadar kullandığımı görmek istiyorum; böylece davranışımı anlayabilirim.

**Durum:** Tamamlandı.

**Uygulanan Davranış:**

- Apps ekranı Android kullanım istatistiklerinden algılanan uygulamaları listeler.
- Her uygulamada ikon, ad, paket kullanım süresi ve yapılandırılmış limit görüntülenebilir.
- Boş/izin eksikliği durumunda kullanıcıya kullanım izni gerektiği söylenir.

**Kabul Kriterleri:**

- İzin verildikten sonra kullanım verisi görünür.
- Uygulama kullanım süresi okunabilir formattadır.
- Kayıtlı Dijital İkiz limitleri uygulama kullanımıyla birlikte gösterilir.

### 7.5 Dijital İkiz Limitleri

**Kullanıcı Hikayesi:** Kullanıcı veya ajan olarak, uygulama bazlı limitler istiyorum; böylece Dijital İkiz bir uygulamanın sağlıklı eşiği ne zaman geçtiğini bilebilir.

**Durum:** Temel seviyede tamamlandı.

**Uygulanan Davranış:**

- Ajan araç çağrısı üzerinden paket bazlı kullanım limitleri belirleyebilir.
- Limitler yerel olarak kalıcı şekilde saklanır.
- Limitler Android native Dijital İkiz servisine gönderilir.
- Settings kayıtlı limitleri gösterebilir.

**Kalan İşler:**

- Uygulama başına limit düzenlemek için tam manuel arayüz eklemek.
- Yaygın dikkat dağıtan uygulamalar için hazır şablonlar eklemek.
- Gözlemlenen davranıştan önerilen limitler üretmek.

### 7.6 Erişilebilirlik Tabanlı İzleme

**Kullanıcı Hikayesi:** Dijital İkiz sistemi olarak, izlenen bir uygulamanın açıldığını fark etmem gerekir; böylece kullanıcı limitini aştığında yanıt verebilirim.

**Durum:** Android prototipi için tamamlandı.

**Uygulanan Davranış:**

- Android erişilebilirlik servisi uygulama pencere değişikliklerini dinler.
- Servis açılan uygulamanın yapılandırılmış bir limiti olup olmadığını kontrol eder.
- Servis bugünkü kullanımı yapılandırılmış limitle karşılaştırır.
- Kullanım limiti aşarsa servis müdahale rotasını açar.
- Kullanım limitin altındaysa kalan süre için zamanlayıcı başlatır.

**Kabul Kriterleri:**

- Erişilebilirlik izni kontrol edilebilir.
- Kullanıcı Android erişilebilirlik ayarlarına gönderilebilir.
- İzlenen uygulamalar limit mantığını tetikler.
- Limiti aşan uygulamalar müdahale akışını açar.

### 7.7 JITAI / Müdahale Akışı

**Kullanıcı Hikayesi:** Ajan olarak, kullanıcıya genel bir engel yerine bağlamsal bir dürtme sunmak için doğru anda müdahale etmem gerekir.

**Durum:** Kısmen tamamlandı.

**Uygulanan Davranış:**

- Müdahale ekranı deep link üzerinden açılır.
- Ekran uygulama paketini tanımlar ve bilinen paketleri kullanıcı dostu adlara eşler.
- Mesaj, günlük limitin aşıldığını açıklar.
- Native bildirim yeteneği ayrı olarak mevcuttur.

**Kalan İşler:**

- Müdahale metnini doğrudan LLM tarafından üretilen kişiselleştirilmiş muhakemeye bağlamak.
- Müdahalenin davranışı değiştirip değiştirmediğini izlemek.
- “Düşün”, “niyet belirle”, “ana ekrana dön” veya “yarının limitini ayarla” gibi yumuşak aksiyonlar eklemek.
- Perfect Twin tarzı metin içeren bildirim tabanlı JITAI yolu eklemek.

### 7.8 İzin ve Güvenlik Akışı

**Kullanıcı Hikayesi:** Bir kullanıcı olarak, hassas izinler üzerinde kontrol sahibi olmak istiyorum; böylece ajanın nelere erişebileceğini anlayabilirim.

**Durum:** Kısmen tamamlandı.

**Uygulanan Davranış:**

- Bildirim, SMS, kişiler ve ilgili Android izinleri için runtime izin istekleri vardır.
- Kullanım istatistikleri izni kontrol edilebilir ve ayarlarda açılabilir.
- Erişilebilirlik izni kontrol edilebilir ve ayarlarda açılabilir.
- SMS, kişiler ve arayüz rengi değişimi gibi hassas ajan aksiyonları onay ister.

**Kalan İşler:**

- İzin onboarding akışını iyileştirmek.
- Sistem izin pencerelerinden önce daha açık izin açıklamaları eklemek.
- Kayıtlı ajan hafızasını ve limitleri temizlemek için gizlilik kontrolleri eklemek.

### 7.9 Ek Native Ajan Araçları

**Kullanıcı Hikayesi:** Ajan olarak, kullanıcı onayıyla faydalı işlemler yapabilmek için native telefon yeteneklerine kontrollü erişim istiyorum.

**Durum:** Prototip araçlar için tamamlandı.

**Uygulanan Davranış:**

- Native Android bridge üzerinden SMS gönderme.
- Native Android bridge üzerinden kişileri okuma.
- Önceden doldurulmuş içerikle Twitter/X oluşturucuyu açma.
- Yerel bildirim zamanlama veya gösterme.
- Arayüz arka plan rengini değiştirme.

**Kabul Kriterleri:**

- Hassas araç çalıştırma için kullanıcı onayı gerekir.
- Native modüller ajana gözlem veya durum mesajı döndürür.
- Dışarıdan görülebilir aksiyonlar tamamlanmadan önce kontrol kullanıcıda kalır.

## 8. Başarı Metrikleri

### Ürün Metrikleri

- Seçilen dikkat dağıtan uygulamalarda kullanım süresinin azalması.
- Başarılı Dijital İkiz müdahalesi sayısı.
- Müdahaleden sonra kullanıcının dikkat dağıtan uygulamadan çıkma oranı.
- En az bir dikkat dağıtan uygulama için limit belirleyen kullanıcı sayısı.
- Yapay zeka ajanı ile sohbet etkileşimi.

### Teknik Metrikler

- Kullanım istatistikleri okuma başarı oranı.
- Erişilebilirlik servisi çalışma süresi.
- LLM yanıt gecikmesi.
- Araç çağrısı tamamlanma oranı.
- Yerel veritabanı okuma/yazma başarı oranı.
- 24 saatlik pil etkisi.

## 9. Fonksiyonel Olmayan Gereksinimler

### Gizlilik

Hassas uygulama kullanım verileri varsayılan olarak yerelde kalmalıdır. LLM endpoint’ine gönderildiğinde kullanıcı, seçilen endpoint’in bu bağlamı aldığının farkında olmalıdır.

**Mevcut Durum:** Kısmen tamamlandı. Yerel saklama ve yerel LLM desteği mevcuttur; ancak gizlilik ayarları ve kullanıcıya dönük kontroller geliştirilmelidir.

### Performans

Müdahale, kullanıcı hâlâ dikkat dağıtan bağlamdayken anlamlı olacak kadar hızlı gerçekleşmelidir.

**Mevcut Durum:** Doğrulanmadı. Native servis hemen tetikleyebilir; ancak gecikme ölçümü eklenmemiştir.

### Pil

İzleme servisi aşırı arka plan çalışmasından kaçınmalı ve pil kullanımını düşük tutmalıdır.

**Mevcut Durum:** Doğrulanmadı.

### Güvenilirlik

Uygulama LLM hatalarını, izin reddini ve native modül hatalarını düzgün şekilde yönetmelidir.

**Mevcut Durum:** Kısmen tamamlandı. Bazı hatalar yakalanır; ancak kullanıcıya dönük toparlanma akışları iyileştirilmelidir.

### Çevrimdışı Dayanıklılık

LLM endpoint’i erişilemez olduğunda bile uygulama kullanım bağlamını toplamaya veya korumaya devam etmelidir.

**Mevcut Durum:** Tamamlanmadı.

## 10. Riskler ve Açık Sorular

- Erişilebilirlik servisleri güçlü ve hassastır; uygulama açık kullanıcı güveni ve izin gerekçesi sunmalıdır.
- Kullanım istatistikleri izni manueldir ve daha iyi onboarding olmadan kullanıcıları zorlayabilir.
- LLM tarafından üretilen müdahalelerin destekleyici kalması ve utandırıcı olmaması için guardrail gerekir.
- Native izleme davranışı farklı Android sürümleri ve üretici cihazlarında test edilmelidir.
- Mevcut müdahale mantığı limit tabanlıdır; daha zengin ajanik kişiselleştirme katmanı hâlâ daha güçlü bir modele ihtiyaç duyar.
- Uygulama şu anda yerel LLM sunucusunun Android emulator veya cihazdan erişilebilir olmasına bağlıdır.

## 11. Önerilen Sonraki Kilometre Taşları

### Kilometre Taşı 1: Prototipi Stabilize Et

- İzin onboarding akışını düzeltmek.
- Uygulama limitleri için manuel düzenleme eklemek.
- Hafıza temizleme/sıfırlama kontrolleri eklemek.
- Sohbette daha iyi LLM hata durumları eklemek.
- Yerel hafıza ve ajan döngüsü davranışı için testler eklemek.

### Kilometre Taşı 2: Dijital İkiz Modelini Tamamla

- Yapılandırılmış Gerçek İkiz profili oluşturmak.
- Yapılandırılmış İdeal İkiz hedefleri/tercihleri oluşturmak.
- Uygulama kullanımını çok günlü olarak takip etmek.
- Uygulama, zaman, hafta içi/hafta sonu ve odak bağlamına göre dinamik baseline eklemek.

### Kilometre Taşı 3: JITAI Sistemini Geliştir

- Ajandan kişiselleştirilmiş müdahale metni üretmek.
- Müdahale sonuçlarını izlemek.
- Sert yönlendirmelerden önce yumuşak dürtmeler eklemek.
- Seçilen bağlamlar için bildirim tabanlı müdahaleler eklemek.

### Kilometre Taşı 4: Üretime Hazırlık

- Pil kullanımını doğrulamak.
- Gecikmeyi doğrulamak.
- İzin ve gizlilik akışlarını sağlamlaştırmak.
- Yerel öncelikli gizliliğe saygı duyan analitik eklemek.
- Native bridge davranışı için regresyon testleri eklemek.

