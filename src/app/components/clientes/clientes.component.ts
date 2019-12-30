import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [
    {id: 1, nombre: 'Patricio', apellido: 'Contreras', email: 'patorma@yahoo.com', createAt: '2019-12-30'},
    {id: 2, nombre: 'Pablo', apellido: 'Torres', email: 'pablo@gmail.com', createAt: '2019-11-24'},
    {id: 3, nombre: 'Saul', apellido: 'Palma', email: 'saul_palma@gmail.com', createAt: '2019-09-15'},
    {id: 4, nombre: 'Daniela', apellido: 'Contreras', email: 'daniela_pu@gmail.com', createAt: '2019-03-28'},
    {id: 5, nombre: 'Alex', apellido: 'Fernandez', email: 'Alex@gmail.com', createAt: '2019-05-06'}
  ];



  constructor() { }

  ngOnInit() {
  }

}
