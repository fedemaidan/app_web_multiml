import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../providers/user';
import { MercadoLibre } from '../../providers/mercadolibre';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NavegadorComponent implements OnInit {

  isIn = false;   // store state

  constructor(public user: User,
            public meli: MercadoLibre
  	) { }

  ngOnInit() {
  }

  logout() {
  	this.user.logout();
  }

  sincronizarTodo() {
    this.meli.sincronizarPreguntas({})
  }


  toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
    }
}
