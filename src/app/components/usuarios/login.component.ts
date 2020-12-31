import { Component, OnInit } from "@angular/core";
import { Usuario } from './usuario';
import swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  titulo: string = "Por favor Sign In! ";
  usuario: Usuario;

  constructor() {
    //inicializamos el atributo usuario
    // Creando una instancia de
    this.usuario = new Usuario();
  }

  ngOnInit(): void {}

  login():void{

    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){

      // mostramos mensaje de error 
      swal.fire('Error Login','Username o password vacías!','error');
      //con return nos salimos
      return;
    }
  }
}
