import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  clientes: Cliente[];


  /* Inyección de dependencias*/
  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    /*clientes es un observador va hacer observado por observadores, aca se subscribe , y en el metodo subscribe el observador seria asignar el atributo clientes el valor que se recibe del clienteservice, que seria el listado de clientes con los cambios*/
     this.clienteService.getClientes().subscribe(
       /*funcion anonima como observador que se encarga de asignar el valor al cliente component*/
       /*nuestro observador, actualiza estado de clientes*/
       clientes => this.clientes = clientes
     );
  }

}
