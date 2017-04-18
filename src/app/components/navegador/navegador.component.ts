import { Component, OnInit } from '@angular/core';
import { User } from '../../providers/user';
import { MercadoLibre } from '../../providers/mercadolibre';
@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent implements OnInit {

  constructor(private user: User,
            private meli: MercadoLibre
  	) { }

  ngOnInit() {
  }

  logout() {
  	this.user.logout();
  }

  sincronizarTodo() {
    this.meli.sincronizarPreguntas({})
  }
}
