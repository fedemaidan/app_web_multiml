import { Injectable } from '@angular/core';
import { Http,  RequestOptions } from '@angular/http';
import { Api } from './api';
import { User } from './user';
import { Pregunta } from '../model/pregunta';
import { Cuenta } from '../model/cuenta';
import 'rxjs/add/operator/map';

@Injectable()
export class MercadoLibre {

  urlML = "https://api.mercadolibre.com"
  preguntas: Pregunta[]
  pregunta: Pregunta
  cantidadPreguntas = null
  socketOn = false

  constructor(public http: Http
  	, public api: Api
  	, public user: User) 
  { 
    
  }

  urlIniML(params: any) {
    var accountInfo = this.user.cargarHeadersAutorizations(null)
    let seq = this.api.get(this.user.getApi(),'iniciarConML', params, accountInfo).share();
    return seq;
  }

  logoutML() {
      return "http://www.mercadolibre.com/jms/mla/lgz/logout";
  }

  removerCuentaML(body: any) {
    var headers = this.user.cargarHeadersAutorizations({})
    
    let seq = this.api.post(this.user.getApi(),'removerUsuarioML', body, headers).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        if(res.success == true) {
            this.user.actualizarCuentas({})
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }
  
  
  responderPregunta( accountInfo: any) {
    accountInfo = this.user.cargarHeadersAutorizations(accountInfo)
    let seq = this.api.post(this.user.getApi(),'responder', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        if(res.success == true) {
          this.removerPregunta()
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  sincronizarPreguntas( body: any) {
    var headers = this.user.cargarHeadersAutorizations({})

    let seq = this.api.post(this.user.getApi(),'sincronizarNuevamentePreguntas', body, headers).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        if(res.success == true) {
          this.actualizarPreguntas({})
        } else {
          console.log(res)
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  actualizarConversaciones() {
    if (this.preguntas) {
      this.preguntas.forEach( (pregunta) => {
        if (pregunta.preguntas_previas == null) {
          this.actualizarConveracionCon(pregunta)
        }
      })
    }
  }
  
  actualizarConveracionCon(pregunta) {
    
    if (this.user.cuentas != null) {
      
      this.user.cuentas.forEach((cuenta) => {
        
        if (cuenta.id_ml == pregunta.seller_id) {
          
          var token = cuenta.token
          
          let seq = this.api.get(this.urlML,
                                  'questions/search',
                                  {  
                                    item: pregunta.item_id, 
                                    from: pregunta.from.id,
                                    access_token: token,
                                    sort: 'date_created_asc'
                                  }, 
                                  new RequestOptions() ).share();
          
          seq
            .map(res => res.json())
            .subscribe(res => {
              if(res.questions != null) {
                pregunta.preguntas_previas = res.questions
                pregunta.cantidad_preguntas_previas = pregunta.preguntas_previas.length
              } else {
                console.error('ERROR ACTUALIZANDO CONVERSACION DE UNA PREGUNTA', res);
                return res.msg
              }
            }, err => {
              console.error('ERROR', err);
              return err.msg
            });

          
          return seq;
        }
      })
    }
  }

  dameNombreUsuario(from) {
    let seq = this.api.get(this.urlML,'users/'+from.id,{}, new RequestOptions() ).share();
    return seq;
  }  

  setPregunta(pregunta: Pregunta) {
    this.pregunta = pregunta
    this.actualizarConveracionCon(this.pregunta)
  }

  setPreguntaPorId(question_id) {
    var pregunta =  this.preguntas.filter( (pregunta) => { 
          return pregunta.question_id == question_id
        } 
      )

    this.setPregunta(pregunta[0])
  }

  removerPregunta() {
    var index = this.preguntas.indexOf(this.pregunta);
    this.preguntas.splice(index, 1);
   }

   // cargarNuevaPregunta(resource) {
   //   this.actualizarPreguntas({})
   // }

   actualizarPreguntas(accountInfo: any) {
    
    if (!this.socketOn) {
        this.user.socket.on('actualizar', (mensaje) => {
          this.actualizarPreguntas({})
      })
    }

    accountInfo = this.user.cargarHeadersAutorizations(accountInfo)
    
    let seq = this.api.get(this.user.getApi(),'preguntas',{},  accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        
        if(res.success == true) {

          this.preguntas = <Pregunta[]>res.data
          if (this.preguntas) {
            this.preguntas.forEach( (pregunta) => {
              this.actualizarConveracionCon(pregunta)
              pregunta.seller_name = this.user.dameNickname(pregunta.seller_id)

            })
            this.cantidadPreguntas = this.preguntas.length
          }
          
          
         
          
        } else {
          console.error('ERROR ACTUALIZANDO PREGUNTAS', res);
          return res.msg
        }
      }, err => {
        console.error('ERROR', err);
        return err.msg
      });

    return seq;
  }
}