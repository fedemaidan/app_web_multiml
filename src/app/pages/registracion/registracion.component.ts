import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styleUrls: ['./registracion.component.css']
})
export class RegistracionComponent implements OnInit {

	account: {name: string, password: string} = {
    	name: 'test',
    	password: 'test'
  	};

  	constructor() { }

	ngOnInit() {
	}

}
