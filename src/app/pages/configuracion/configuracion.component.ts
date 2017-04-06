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

  	this.isLoading = true
    this.user.actualizarCuentas({})
    	.map(res => res.json())
	    .subscribe(res => {
	        this.isLoading = false
	      });

     // this.user.socket.on('errorNuevaCuenta', (mensaje) => {
     //           dialogs.confirm({
     //          title: "Error agregando cuenta",
     //          message: "Ocurrio el siguiente error al intentar registrar la cuenta: " + mensaje,
     //          okButtonText: "Volver a intentar",
     //          cancelButtonText: "Cancelar",
     //      }).then(function (result) {
     //          console.log(result)
     //          if (result) {
     //            this.agregarCuenta()
     //          }
     //      });
     //   })
      
  }

  agregarCuenta() {
    var accountInfo = { user: this.user._user}
    window.open(this.meli.logoutML(), "_blank");
    var self = this
    setTimeout( () => {
      self.meli.urlIniML(accountInfo).map(
              res => res.json()).subscribe(data => {
                window.open(data.url,"_blank");
            })
    }, 2000)
    

    
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

  logout() {
    this.user.logout()
    this.router.navigate(["/"])
  }

}
