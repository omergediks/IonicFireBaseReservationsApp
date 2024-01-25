# Ionic Firebase Kutuphane Randevu App

Bu proje, "Kütüphane Yönetim Sistemi" için oluşturduğum mobil apptir.  Kullanıcıların masa rezervasyonu yapabileceği basit bir Ionic uygulamasını içerir.

## Firebase Yapılandırması

Öncelikle FireBase Console'a gidip oluşturduğunuz proje bilgilerini kullanarak bu alanları doldurmanız gerekiyor.

```typescript
// src/app/app.module.ts

const veritabanı = {
  production: false,
  firebaseConfig: {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
  }
};
```
## Projeyi Çalıştırma

1. Projeyi bilgisayarınıza klonlayın.
2. Terminal veya Komut İstemi'ni açın ve proje dizinine gidin.
3. Gerekli bağımlılıkları yüklemek için `npm install` komutunu çalıştırın.
4. Projeyi başlatmak için `ng serve / ionic serve` komutunu çalıştırın.
5. Tarayıcınızda localhost adresine gidin.
