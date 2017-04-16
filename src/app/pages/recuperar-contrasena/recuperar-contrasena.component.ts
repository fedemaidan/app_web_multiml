import { Component, OnInit } from '@angular/core';
import { Mensajero } from '../../providers/mensajero';
import { User } from '../../providers/user';
import { Router } from "@angular/router";
import { ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {
	@ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

	account: {name: string, password: string, response_captcha: String} = {
    	name: 'fede',
    	password: 'fede',
    	response_captcha: null
  	};
  	
  	estadoEnviado = false

	constructor(
		private user: User,
		private router: Router,
      	private mensajero: Mensajero
      ) { }

	ngOnInit() {

	}

	recuperarContrasena() {
		this.account.response_captcha = this.captcha.getResponse();
		this.user.recuperarContrasena(this.account).subscribe((resp) => {
	      if (resp.json().success == true) {
	      	this.estadoEnviado = true
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
