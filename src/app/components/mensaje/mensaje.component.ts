import { Component, OnInit } from '@angular/core';
import { Mensajero } from '../../providers/mensajero';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {

  constructor( public mensajero: Mensajero) { }
  
  ngOnInit() {
  }

}
