import { Component, OnInit } from '@angular/core';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential
} from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string="";
  password: string="";

  constructor(private kad: Auth,private ctrl: AlertController,private router: Router) { }

  ngOnInit() {
  }


  async register() {
    createUserWithEmailAndPassword(this.kad,this.email,this.password
    ).then(async (userCredential: UserCredential) => {
      const alert = this.ctrl.create({
        header: 'TAMAM',
        message: 'Başarıyla kaydoldunuz',
        buttons: ['OKAY']
      });
       (await alert).present();
    }).catch(async (error: any) => {
      const alert = this.ctrl.create({
        header: 'Hata',
        message: 'Kayıt başarısız',
        buttons: ['Tamam']
      });
       (await alert).present();
    })
}

  login(){
    this.router.navigateByUrl('/login');
  }

}
