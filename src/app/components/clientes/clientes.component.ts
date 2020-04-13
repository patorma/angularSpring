import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/cliente.service';
import {  Router,ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  clientes: Cliente[];
  


  /* Inyección de dependencias*/
  constructor(private clienteService: ClienteService, private router: Router ,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let page = 0;
   // clientes es un observador va hacer observado por observadores, aca se subscribe , 
   // y en el metodo subscribe el observador seria asignar el atributo clientes el valor 
   // que se recibe del clienteservice, que seria el listado de clientes con los cambios
    this.clienteService.getClientes(page)
     .pipe(
        tap(response=> {
          console.log('ClientesComponent: tap 3');
          (response.content as Cliente[]).forEach(cliente =>{
             console.log(cliente.nombre);
          });
        })         //  response.content lista de objeto clientes y se asigna al atributo cliente
     ).subscribe(response => this.clientes = response.content as Cliente[]);
  }

  public delete(cliente: Cliente): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli =>cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Cliente eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )
       
      } 
    })
    /*this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.delete(id).subscribe(
           cliente => {
            
             this.cliente = cliente;
             this.router.navigate(['/clientes'])
            

            }
        )
      }
    }

    )*/
  }

}
