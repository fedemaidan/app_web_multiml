import { Component, OnInit } from '@angular/core';
import { User } from '../../providers/user';
import { MercadoLibre } from '../../providers/mercadolibre';
import { Router } from "@angular/router";

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  isLoading: boolean
  url
  constructor(private user: User,
              private meli: MercadoLibre,
              private router: Router) {}
  ngOnInit() {
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
    var accountInfo = { user: this.user._user}
    var log = window.open(this.meli.logoutML(), "_blank");
    
    var self = this
    setTimeout( () => {
      self.meli.urlIniML(accountInfo).map(
              res => res.json()).subscribe(data => {
                window.open(data.url,"_blank");
            })
    }, 4000)
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
