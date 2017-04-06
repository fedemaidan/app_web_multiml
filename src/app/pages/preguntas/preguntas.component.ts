import { Component, OnInit } from '@angular/core';
import { MercadoLibre } from '../../providers/mercadolibre';
import { User } from '../../providers/user';
import { Pregunta } from '../../model/pregunta';
import { Router } from "@angular/router";

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  isLoading: boolean = false
  respuesta: string = ""

  constructor(private meli: MercadoLibre,
              private user: User,
              private router: Router) {

  }
  
  ngOnInit() {
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
  	console.log(this.respuesta)
  	this.meli.responderPregunta( {
                                    user_id_ml: this.meli.pregunta.seller_id, 
                                    question_id: this.meli.pregunta.question_id, 
                                    text: this.respuesta 
                                  })
	    .map(resp => resp.json())
	    .subscribe((respuesta) => {
	       this.respuesta = ""
	       this.meli.removerPregunta()
	       this.router.navigate(["/preguntas"])
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

}
