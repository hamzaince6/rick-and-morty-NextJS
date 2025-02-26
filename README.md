# Rick and Morty Character Explorer

> Bu proje, [isbul.net](https://www.isbul.net/) için hazırlanmış bir case study çalışmasıdır. Modern web teknolojileri ve best practice'ler kullanılarak, verilen gereksinimlere uygun şekilde geliştirilmiştir.

Modern ve kullanıcı dostu bir arayüz ile Rick and Morty karakterlerini keşfetmenizi sağlayan bir web uygulaması. Bu proje, modern web teknolojilerini ve best practice'leri kullanarak geliştirilmiş, yüksek performanslı ve ölçeklenebilir bir yapıya sahiptir.

## Özellikler

- **Gelişmiş Filtreleme Sistemi**
  - Status ve gender bazlı filtreleme
  - URL query parametreleri ile entegre çalışan filtreler
  - Anlık güncellenen sonuçlar
  - Sayfalama desteği

- **Modern Teknoloji Stack'i**
  - Next.js 15 (App Router)
  - TypeScript
  - Tailwind CSS
  - shadcn/ui komponentleri

- **Optimizasyon ve Performans**
  - Server-Side Rendering (SSR)
  - React Query ile optimze edilmiş API çağrıları
  - Zustand ile etkin state yönetimi
  - URL tabanlı durum yönetimi (nuqs)

## Teknik Detaylar

### State Management
- **Zustand**: Global state yönetimi için kullanıldı
- **React Query**: API çağrıları ve cache yönetimi
- **nuqs**: URL query parametrelerinin yönetimi (shallow: false)

### Kod Kalitesi
- ESLint & Prettier entegrasyonu
- Husky & Lint-Staged ile otomatik kod formatlaması
- Strict TypeScript konfigürasyonu (any kullanımı yasak)
- Modern kod yazım standartları

### API Entegrasyonu
- Rick and Morty API (https://rickandmortyapi.com)
- React Query hooks ile modüler API çağrıları
- Tip güvenli API yanıtları

## Proje Yapısı

```
src/
├── app/                    # Next.js app router yapısı
├── components/            # UI komponentleri
│   ├── ui/               # shadcn/ui komponentleri
│   └── ...               # Özel komponentler
├── hooks/                # Custom React hooks
├── lib/                  # Utility fonksiyonları
├── store/                # Zustand store'ları
└── types/                # TypeScript tip tanımlamaları
```

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/hamzaince6/case-study.git
```

2. Bağımlılıkları yükleyin:
```bash
cd case-study
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## Demo

Canlı demo: [https://case-study-api.netlify.app](https://case-study-api.netlify.app)

## Öne Çıkan Teknik Çözümler

### SSR ve Client-Side Optimizasyon
- Server-Side Rendering ile ilk yükleme performansı optimizasyonu
- React Query ile client-side veri önbellekleme
- URL tabanlı durum yönetimi ile sayfa yenilemelerinde durum koruması

### Modern UI/UX
- shadcn/ui ile tutarlı ve modern tasarım
- Responsive layout
- Kullanıcı dostu filtreleme arayüzü

### Kod Kalitesi
- TypeScript ile tam tip güvenliği
- ESLint ve Prettier ile tutarlı kod stili
- Husky ile otomatik kod kalite kontrolleri
- Modüler ve yeniden kullanılabilir komponentler

## Geliştirme Prensipleri

- Clean Code prensipleri
- SOLID prensiplerine uygun yapı
- DRY (Don't Repeat Yourself) prensibi
- Component-Based Architecture
- Tip güvenliği (TypeScript)
