import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class Mensajero {
	
	private mensaje: string = ""
  private tipo: string = "alert alert-info"
	private show: boolean = false	
  
  constructor(private user: User) {
      
      this.user.socket.on('error', (mensaje) => {
          this.mostrarMensajeError(mensaje)
      })
      this.user.socket.on('exito', (mensaje) => {
          this.mostrarMensajeExito(mensaje)
      })
  }
  
  mostrarMensajeInfo(mensaje) {
    this.mostrarMensaje(mensaje, "alert alert-info")
  }

  mostrarMensajeExito(mensaje) {
    this.mostrarMensaje(mensaje, "alert alert-success")
  }

  mostrarMensajeError(mensaje) {
    this.mostrarMensaje(mensaje, "alert alert-danger")
  }

  ocultar() {
    this.mensaje = ""
    this.show = false
  }

  private mostrarMensaje(mensaje, tipo = "alert alert-info") {
    this.mensaje = mensaje
    this.show = true
    this.tipo = tipo
  }

}
