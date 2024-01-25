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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string="";
  password: string="";

  constructor(private kad: Auth,private ctrl: AlertController,private router: Router) { }

  ngOnInit() {
  }

  async login() {
    signInWithEmailAndPassword(
      this.kad,
      this.email,
      this.password
    ).then(
      (kullanci: any) => {
      this.router.navigateByUrl('/home');
    }).catch(async (error: any) => {
      const alert = this.ctrl.create({
        header: 'GİRİS BASARI',
        message: 'email şifreniz hatalı.',
        buttons: ['OKAY']
      });
       (await alert).present();
    }) 
  }

  register(){
    this.router.navigateByUrl('/register');
  }

}
