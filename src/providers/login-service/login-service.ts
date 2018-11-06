import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginServiceProvider {

  url = 'https://appwad.com/api';

  constructor(public http: HttpClient) {

  }
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/usuario/login', { 'login': username, 'senha': password }).subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }


}
