import { Component, OnInit } from '@angular/core';
import { MercadoLibre } from '../../providers/mercadolibre';
import { User } from '../../providers/user';
import { Pregunta } from '../../model/pregunta';
import { Router } from "@angular/router";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
  animations: [
    trigger('preguntaState', [
      state('inactive', style({
        height: '0',
        margin: '1',
        transform: 'scale(0)'
      })),
      state('active',   style({
        margin: '30',
        transform: 'scale(1)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class PreguntasComponent implements OnInit {

  isLoading: boolean = false
  respuesta: string = ""
  showMenu: boolean = true

  constructor(public meli: MercadoLibre,
              public user: User,
              private router: Router) {

  }

  ngOnInit() {

    if(!this.user.token)
      this.router.navigate(["/"])


    if (this.user.cantidadDeCuentas() == 0) {
      this.router.navigate(["/configuracion"])
    }

    this.isLoading = true
  	this.meli.actualizarPreguntas({}).map(res => res.json())
      .subscribe(res => {
          this.isLoading = false
        });

  }

  irACuentas() {
    this.router.navigate(["/list"])
  }

  verPublicacion(item) {
  	var url = item.permalink;
  	window.open(url);
  }

  verUsuario(from) {
  	var url = "http://www.mercadolibre.com.ar/jm/profile?id="+from.id;
  	window.open(url);
  }
  verConversacion(pregunta) {
    this.meli.setPregunta(pregunta)
    this.router.navigate(["/conversacion"])
  }

  setPregunta(pregunta) {
  	this.meli.setPregunta(pregunta)
  }

  responder() {
  	this.meli.responderPregunta( {
                                    user_id_ml: this.meli.pregunta.seller_id,
                                    question_id: this.meli.pregunta.question_id,
                                    text: this.respuesta
                                  })
	    .map(resp => resp.json())
	    .subscribe((respuesta) => {
	       this.respuesta = ""
	    }, (err) => {
      		console.log(err)
    });
  }



  dameFechaArgentina(fecha) {
    var date = new Date(fecha)
    date.setHours(date.getHours() + 2 )
    return date
  }

  dameNickname(id) {
    return this.user.dameNickname(id)
  }

  toggleMenu() {
    this.showMenu = !this.showMenu
  }

}
