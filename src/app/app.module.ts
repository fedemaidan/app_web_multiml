import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';


import { AppComponent } from './app.component';
import { User } from "./providers/user";
import { Api } from "./providers/api";
import { MercadoLibre } from "./providers/mercadolibre";
import { LoginComponent } from './pages/login/login.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { ConversacionComponent } from './pages/conversacion/conversacion.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { NavegadorComponent } from './components/navegador/navegador.component';
import { RegistracionComponent } from './pages/registracion/registracion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PreguntasComponent,
    ConversacionComponent,
    ConfiguracionComponent,
    NavegadorComponent,
    RegistracionComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'preguntas',
        component: PreguntasComponent
      },
      {
        path: 'conversacion',
        component: ConversacionComponent
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent
      },
      {
        path: 'registracion',
        component: RegistracionComponent
      }
    ])
  ],
  providers: [Api, User, MercadoLibre],
  bootstrap: [AppComponent ]
})
export class AppModule { }
