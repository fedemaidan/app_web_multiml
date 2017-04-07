import { Component, OnInit } from '@angular/core';
import { MercadoLibre } from '../../providers/mercadolibre';
import { User } from '../../providers/user';
import { Router } from "@angular/router";

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.css']
})
export class ConversacionComponent implements OnInit {

respuesta: string
  isLoading: boolean
  usuarioPregunta: string

  constructor(private user: User,
              private meli: MercadoLibre,
              private router: Router) {
  }

  ngOnInit() {
    if(!this.user.token)
      this.router.navigate(["/"])
    
    if (this.meli.pregunta) {
      this.usuarioPregunta = "USUARIO"
      this.respuesta = ""
      this.isLoading = false

      this.meli.dameNombreUsuario(this.meli.pregunta.from).map(resp => resp.json())
      .subscribe((respuesta) => {
         this.usuarioPregunta = respuesta.nickname
      }, (err) => {
          console.log(err)
      });
    }
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
       this.meli.removerPregunta()
       this.router.navigate(["/preguntas"])
    }, (err) => {
      	console.log(err)
    }); 
  }
  
  seleccionarPregunta(question_id, actualizar) {
    if (actualizar)
      this.meli.setPreguntaPorId(question_id)
  }

  dameFechaArgentina(fecha) {
    var date = new Date(fecha)
    date.setHours(date.getHours() + 2)
    return date
  }
}
