import { Component, OnInit } from '@angular/core';
import { User } from '../../providers/user';
import { Mensajero } from '../../providers/mensajero';
import { Router } from "@angular/router";
import { ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';

@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styleUrls: ['./registracion.component.scss']
})
export class RegistracionComponent implements OnInit {
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

	account: {name: string, mail: string, password: string,  response_captcha: String} = {
		name: '',
    	mail: '',
    	password: '',
      response_captcha: null
  	};

  	constructor(
  		private user: User,
  		private router: Router,
      private mensajero: Mensajero
  		) { }

	ngOnInit() {

	}

	registrar() {
    this.account.response_captcha = this.captcha.getResponse();
		this.user.signup(this.account).subscribe((resp) => {
          if (resp.json().success == true) {
                this.user.login(this.account).subscribe((resp) => {
          				  if (resp.json().success == true) {
          				    this.router.navigate(["/preguntas"])
          				  }
          				  else
        				    {
                      this.captcha.reset();
        				      this.mensajero.mostrarMensajeError(resp.json().msg)
        				    }
          				}, (err) => {
          				  console.log(err)
                    this.captcha.reset();
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
