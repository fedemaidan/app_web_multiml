import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Api } from './api';
import { MercadoLibre } from './mercadolibre';
import { Pregunta } from '../model/pregunta';
import { Cuenta } from '../model/cuenta';
// import * as SocketIO from 'socket.io-client';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class User {
  _user: any
  token: string

  socket

  url: string = 'http://multiml.com/api';
  urlSocket: string = 'https://fab8b305.ngrok.io';

  public cuentas: Cuenta[]

  constructor(public http: Http, 
              public api: Api
              ) {
    // this.socket = new SocketIO(this.urlSocket, 3000);
    // this.socket.connect()
    // this.cargarUsuario() 
  }

  dameNickname(id) {

    var aux = "a"

    this.cuentas.forEach((cuenta) => {
      if (cuenta.id_ml == id)
        aux = cuenta.nickname
    })

    return aux
  }

  cargarUsuario(user, token) {
    this._user = user
    this.token = token
    this.actualizarCuentas({})
    // helper.setupNotifications(utils.ad.getApplicationContext(), self._user, self.socket);
  }

  getApi() {
    return this.url
  }

  login(accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    let seq = this.api.post(this.url, 'authenticate_web', accountInfo).share();
    
    seq
      .map(res => res.json())
      .subscribe(res => {
        if(res.success == true) {
          var self = this
          self.cargarUsuario(accountInfo.name, res.token)
        }
        else {
          console.log("falló")
        }
      });

    return seq;
  }

  recuperarContrasena(accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    let seq = this.api.post(this.url, 'recuperarContrasena', accountInfo).share();
    return seq;
  }

  signup(accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    let seq = this.api.post(this.url,'signup', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if(res.status == 'success') {
          this.login(accountInfo)
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  actualizarCuentas(accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    let seq = this.api.get(this.url,'cuentas',{},  accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        
        if(res.success == true) {
          this.cuentas = <Cuenta[]>res.data
          console.log(this.cuentas)
          // this.socket.on('actualizarCuentas', (resource) => {
          //   this.actualizarCuentas(resource);
          // })

        } else {
          console.error('ERROR ACTUALIZANDO CUENTAS', res);
          return res.msg
        }
      }, err => {
        console.error('ERROR', err);
        return err.msg
      });

    return seq;
  }

  dameToken(ml_id) {
    if (this.cuentas != null) {
      this.cuentas.forEach((cuenta) => {
        if (cuenta.id_ml == ml_id) {
          return cuenta.token.valueOf()
        }
          
      })
    }
    return null;
  }

  logout() {
    this._user = null
    this.token = null
  }

  cargarHeadersAutorizations(options) {
    if (!options) {
      options = new RequestOptions();
    }

    if (this.token) {
     var headers = new Headers();
     headers.append('Authorization', this.token);
     options.headers = headers 
    }

    return options
  } 
}