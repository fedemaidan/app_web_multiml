import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { User } from "./providers/user";
import { Api } from "./providers/api";
import { Mensajero } from "./providers/mensajero";
import { MercadoLibre } from "./providers/mercadolibre";
import { LoginComponent } from './pages/login/login.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { ConversacionComponent } from './pages/conversacion/conversacion.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { NavegadorComponent } from './components/navegador/navegador.component';
import { RegistracionComponent } from './pages/registracion/registracion.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PreguntasComponent,
    ConversacionComponent,
    ConfiguracionComponent,
    NavegadorComponent,
    RegistracionComponent,
    MensajeComponent,
    RecuperarContrasenaComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReCaptchaModule,
    BrowserAnimationsModule,
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
      },
      {
        path: 'recuperar_contrasena',
        component: RecuperarContrasenaComponent
      }
    ], { 
      useHash: true
    })
  ],
  providers: [Api, User, MercadoLibre, Mensajero],
  bootstrap: [AppComponent ]
})
export class AppModule { }
