import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the SocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const SERVER_URL = 'https://appwad.com/api/pagamento';


@Injectable()
export class SocketProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SocketProvider Provider');
  }
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public disconnectSocket(): void {
    this.socket.disconnect();
  }

  public send(title_event: string, data: any, callback): void {
    this.socket.emit(title_event, data, callback);
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => observer.next(data));
    });
  }

  public onEvent(event: string): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
