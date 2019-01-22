import { Component, OnInit } from '@angular/core';
import { User } from '../../providers/user';
import { MercadoLibre } from '../../providers/mercadolibre';
import { Router } from "@angular/router";

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  isLoading: boolean
  url = null
  hidden: false

  constructor(public user: User,
              public meli: MercadoLibre,
              private router: Router) {}
  ngOnInit() {
    var accountInfo = { user: this.user._user}

    this.meli.urlIniML(accountInfo).map(
            res => res.json()).subscribe(data => {
            this.url = data.url
          });

    if(!this.user.token)
      this.router.navigate(["/"])

  	this.isLoading = true
    this.user.actualizarCuentas({})
    	.map(res => res.json())
	    .subscribe(res => {
	        this.isLoading = false
	      });
  }

  agregarCuenta() {

    window.location.replace(this.url);
  }

  removerCuenta(cuenta) {
    this.meli.removerCuentaML({
      user_id_ml: cuenta.id_ml,
      nickname: cuenta.nickname
    })
  }

  irAPreguntas() {
    this.router.navigate(["/preguntas"])
  }

  verUsuario(id) {
    var url = "http://www.mercadolibre.com.ar/jm/profile?id="+id;
    window.open(url);
  }


}
