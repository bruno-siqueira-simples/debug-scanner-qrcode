import { UtilProvider } from './../../providers/util/util';
import { SocketProvider } from './../../providers/socket/socket';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage implements OnDestroy {

  options: BarcodeScannerOptions;
  ioConnection: any;
  token: string;

  constructor(private socketService: SocketProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public scanner: BarcodeScanner,
    private alertCtrl: AlertController,
    private util: UtilProvider) {
    this.initIoConnection();
    this.util.getToken().then((val) => {
      this.token = val;
    });
  }

  ngOnDestroy() {
    this.socketService.disconnectSocket();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onEvent("connect")
      .subscribe(() => {
        this.alerta('connect', 'connect');
      });

    this.socketService.onEvent("disconnect")
      .subscribe(() => {
        this.alerta('disconnect', 'disconnect');
      });

    this.socketService.onEvent("connect_error")
      .subscribe((data) => {
        this.alerta('connect_error', JSON.stringify(data));
      });

    this.socketService.onEvent("connect_timeout")
      .subscribe(() => {
        this.alerta('connect_timeout', 'connect_timeout');
      });
  }

  scan() {
    this.options = {
      prompt: 'Escaneie o qrcode'
    }
    this.scanner.scan(this.options).then((data) => {
      this.socketService.send('get_dados_pagamento', JSON.stringify({
        'token': this.token,
        'hash_key': data.text
      }), (resposta) => {
        this.alerta('Resposta get_dados_pagamento', JSON.stringify(resposta))
      })

    }, (err) => {
      this.alerta('Erro', err);
    })
  }

  alerta(titulo: string, data: any) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: data,
      buttons: ['Fechar']
    });
    alert.present();
  }
}
