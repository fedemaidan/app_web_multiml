import { Injectable } from '@angular/core';

@Injectable()
export class Mensajero {
	
	private mensaje: string = ""
  private tipo: string = "alert alert-info"
	private show: boolean = false	
  constructor() {
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
