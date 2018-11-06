import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  constructor(private storage: Storage) {
  }


  setAuthInStorage(auth: any) {
    this.storage.set('token', auth.token);
  }


  getToken() {
    return this.storage.get('token').then((val) => {
      return val;
    });
  }

}
