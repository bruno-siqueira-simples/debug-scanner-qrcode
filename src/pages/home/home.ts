import { ScannerPage } from './../scanner/scanner';
import { UtilProvider } from './../../providers/util/util';
import { LoginServiceProvider } from './../../providers/login-service/login-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, private loginService: LoginServiceProvider, private util: UtilProvider) {

  }

  login() {
    this.loginService.login(this.username, this.password).then(data => {
      this.util.setAuthInStorage(data);
      this.navCtrl.push(ScannerPage);
    });
  }

}
