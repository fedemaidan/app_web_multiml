import { Component, OnInit } from '@angular/core';
import { User } from '../../providers/user';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	account: {name: string, password: string} = {
    	name: 'mariano',
    	password: 'mariano'
  	};

  	constructor(
  		private user: User,
  		private router: Router
  		) { }

  	ngOnInit() {
  		if(this.user._user) {
  			console.log("ya estoy gato")
	      this.router.navigate(["/preguntas"])
	    }
  	}

  	submit() {
		this.user.login(this.account).subscribe((resp) => {
		  if (resp.json().success == true){
		  	console.log("entre")
		    this.router.navigate(["/preguntas"])
		  }
		  else
		    {
		      alert(resp.json().msg)
		    }
		}, (err) => {
		  console.log(err)
		  alert("Fallo en el servidor")
		});
	}

}
