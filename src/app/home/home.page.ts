// home.page.ts

import { Component } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc,
  setDoc,
  Firestore,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ad: string = '';
  soyad: string = '';
  secilenMasa: string = '';
  bosMasalar: any = [];
  masaAdi: string = ''; // Yeni masa adı
  randevular: any = []; // Mevcut randevular

  private firestore: Firestore;
  showMenu: boolean = false;
  masaEkleFormVisible: boolean = false;
  yuvarlakButonlarVisible: boolean = false;
  mevcutRandevularVisible: boolean = false;
  masaSecimiVisible: boolean = false;
  randevuBilgileriVisible: boolean = false;

  constructor(
    private alertController: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private auth: Auth,
    private router: Router
  ) {
    this.firestore = getFirestore();

    onAuthStateChanged(this.auth, (kullanicivarmi) => {
      if (kullanicivarmi) {
        this.bosMasalariGetir();
        this.randevulariGetir(); // Mevcut randevuları al
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
  toggleMenu() {
    this.showMenu = true;
    this.masaEkleFormVisible = false;
    this.yuvarlakButonlarVisible = false;
    this.mevcutRandevularVisible = false;
    this.masaSecimiVisible = false;
    this.randevuBilgileriVisible = false;
  }
  async bosMasalariGetir() {
    this.bosMasalar = [];
    // Mevcut masaları listeleme fonksiyonu
    const tablesSnapshot = await getDocs(collection(this.firestore, 'masalar'));
    tablesSnapshot.forEach((tableDoc) => {
      let tableObject = {
        id: tableDoc.id,
        isim: tableDoc.data()['isim'],
        bosmu: tableDoc.data()['bosmu'],
      };
      this.bosMasalar.push(tableObject);
    });
  }

  async masaEkle() {
    if (!this.masaAdi) {
      const alert = await this.alertController.create({
        header: 'Hata',
        message: 'Lütfen masa adını girin.',
        buttons: ['Tamam'],
      });
      await alert.present();
      return;
    }

    // Yeni masa ekleme fonksiyonu
    const newTableRef = await addDoc(collection(this.firestore, 'masalar'), {
      isim: this.masaAdi,
      bosmu: true,
    });

    this.bosMasalariGetir(); // Masaları yenile
    this.masaAdi = ''; // Yeni masa adını sıfırla
  }

  async masaDurumDegistir(masaId: string, yeniDurum: boolean) {
    // Masa durumunu güncelleme fonksiyonu
    const masaRef = doc(this.firestore, 'masalar', masaId);
    await setDoc(masaRef, { bosmu: yeniDurum }, { merge: true });

    this.bosMasalariGetir(); // Masaları yenile
  }

  async randevulariGetir() {
    this.randevular = [];
    // Mevcut randevuları listeleme fonksiyonu
    const appointmentsSnapshot = await getDocs(collection(this.firestore, 'randevular'));
    appointmentsSnapshot.forEach((appointmentDoc) => {
      let appointmentObject = {
        id: appointmentDoc.id,
        masaId: appointmentDoc.data()['masaId'],
        ad: appointmentDoc.data()['ad'],
        soyad: appointmentDoc.data()['soyad'],
      };
      this.randevular.push(appointmentObject);
    });
  }

  async randevuAl(masaId: string) {
    if (!this.ad || !this.soyad || !masaId) {
      const alert = await this.alertController.create({
        header: 'Hata',
        message: 'Lütfen tüm alanları doldurun.',
        buttons: ['Tamam'],
      });
      await alert.present();
      return;
    }

    await this.randevuKaydet(masaId);

    const alert = await this.alertController.create({
      header: 'Başarılı',
      message: 'Randevu başarıyla alındı.',
      buttons: ['Tamam'],
    });
    await alert.present();

    // İsteğe bağlı olarak, randevu alındıktan sonra kullanıcıyı başka bir sayfaya yönlendirebilirsiniz.
    // this.router.navigateByUrl('/ana-sayfa');
  }

  async randevuKaydet(masaId: string) {
    const randevularCollectionRef = collection(this.firestore, 'randevular');
    await addDoc(randevularCollectionRef, {
      masaId: masaId,
      ad: this.ad,
      soyad: this.soyad,
    });

    const masaRef = doc(this.firestore, 'masalar', masaId);
    await setDoc(masaRef, { bosmu: false }, { merge: true });

    // Bos masaları yenile
    this.bosMasalariGetir();
    // Mevcut randevuları yenile
    this.randevulariGetir();
  }

  async cikis() {
    const alert = await this.alertController.create({
      header: 'Çıkış',
      buttons: [
        {
          text: 'Hayır',
          role: 'cancel',
        },
        {
          text: 'Evet',
          handler: async () => {
            try {
              await signOut(this.auth);
              this.router.navigateByUrl('/login');
            } catch (error) {
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentActionSheet(buttons: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: buttons
    });

    await actionSheet.present();
  }

  degisiklikFonksiyonu(masa: any, islem: string) {
    if (islem === 'masaAdiDegistir') {
      // Masa adını değiştirme işlemi burada yapılacak
    } else if (islem === 'masaSil') {
      // Masa silme işlemi burada yapılacak
    }
  }

  // Ion-Fab ile menüyü kontrol etmek için eklediğimiz fonksiyonlar
  toggleMevcutRandevular() {
    this.mevcutRandevularVisible = !this.mevcutRandevularVisible;
  }

  toggleYuvarlakButonlar() {
    this.yuvarlakButonlarVisible = !this.yuvarlakButonlarVisible;
  }

  toggleMasaEkleForm() {
    this.masaEkleFormVisible = !this.masaEkleFormVisible;
  }
  toggleMasaSecimi() {
    this.masaSecimiVisible = !this.masaSecimiVisible;
    this.randevuBilgileriVisible = !this.randevuBilgileriVisible;
  }
  
}
