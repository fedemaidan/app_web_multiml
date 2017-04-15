import { Component, OnInit } from '@angular/core';
import { User } from '../../providers/user';
import { Mensajero } from '../../providers/mensajero';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	account: {name: string, password: string} = {
    	name: 'fede',
    	password: 'fede',
    	response_captcha: null
  	};

  	constructor(
  		private user: User,
  		private router: Router,
  		private mensajero: Mensajero
  		) { }

  	ngOnInit() {
  		if(this.user._user) {
	      this.router.navigate(["/preguntas"])
	    }
  	}

  	submit() {
		this.user.login(this.account).subscribe((resp) => {
		  if (resp.json().success == true){
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

}
