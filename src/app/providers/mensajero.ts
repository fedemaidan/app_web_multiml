import { Injectable } from '@angular/core';

@Injectable()
export class Mensajero {
	
	mensaje: string = ""
  tipo: string = "alert alert-info"
	show: boolean = false	
  constructor() {
  }
  
  mostrarMensaje(mensaje, tipo = "alert alert-info") {
  	this.mensaje = mensaje
  	this.show = true
    this.tipo = tipo
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
  	this.show = false
  }
}
