import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

// modulo cliente
import { ClientesComponent } from "./components/clientes/clientes.component";
import { FormComponent } from "./components/clientes/form.component";
import { PaginatorComponent } from "./components/paginator/paginator.component";

import { ClienteService } from "./services/cliente.service";
import { HttpClientModule } from "@angular/common/http";

import { FormsModule } from "@angular/forms";
import { ClienteBuscadoComponent } from "./components/cliente-buscado/cliente-buscado.component";
//import es from '@angular/common/locales/es';
import localeEsAr from "@angular/common/locales/es-AR";
import { registerLocaleData } from "@angular/common";
import localeES from "@angular/common/locales/es-CL";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// maneja fechas
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { DetalleComponent } from "./components/clientes/detalle/detalle.component";

registerLocaleData(localeES, "es-CL");
//registerLocaleData(localeEsAr, 'es-AR');
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    ClienteBuscadoComponent,
    PaginatorComponent,
    DetalleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  providers: [ClienteService, { provide: LOCALE_ID, useValue: "es-CL" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
