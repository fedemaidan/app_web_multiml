import { Component, OnInit } from '@angular/core';
import { User } from '../../providers/user';
import { Mensajero } from '../../providers/mensajero';
import { Router } from "@angular/router";

@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styleUrls: ['./registracion.component.css']
})
export class RegistracionComponent implements OnInit {

	account: {name: string, mail: string, password: string} = {
		name: '',
    	mail: '',
    	password: ''
  	};

  	constructor(
  		private user: User,
  		private router: Router,
      private mensajero: Mensajero
  		) { }

	ngOnInit() {
    
	}

	registrar() {
		this.user.signup(this.account).subscribe((resp) => {
          if (resp.json().success == true) {
                this.user.login(this.account).subscribe((resp) => {
          				  if (resp.json().success == true) {
          				    this.router.navigate(["/preguntas"])
          				  }
          				  else
        				    {
        				      this.mensajero.mostrarMensajeError(resp.json().msg)
        				    }
          				}, (err) => {
          				  console.log(err)
          				  this.mensajero.mostrarMensajeError("Falló en el servidor")
          				});
          }
          else
          {
            this.mensajero.mostrarMensajeError(resp.json().msg)
          }
        }, (err) => {
          console.log(err.message)
          this.mensajero.mostrarMensajeError("Falló en el servidor")
        }); 
	}
}
