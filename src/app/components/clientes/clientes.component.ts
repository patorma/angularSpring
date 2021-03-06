import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";

// Servivios
import { ClienteService } from "../../services/cliente.service";
import { ModalService } from "../../services/modal.service";

import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;

  /* Inyección de dependencias*/
  constructor(
    private clienteService: ClienteService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // paramMap se encarga de observar entonces se subscribe
    // esto se encarga de subscribirse a un observador
    this.activatedRoute.paramMap.subscribe((params) => {
      // el operador suma convierte el string en number
      let page: number = +params.get("page");
      if (!page) {
        page = 0;
      }
      // clientes es un observador va hacer observado por observadores, aca se subscribe ,
      // y en el metodo subscribe el observador seria asignar el atributo clientes el valor
      // que se recibe del clienteservice, que seria el listado de clientes con los cambios
      this.clienteService
        .getClientes(page)
        .pipe(
          tap((response) => {
            console.log("ClientesComponent: tap 3");
            (response.content as Cliente[]).forEach((cliente) => {
              console.log(cliente.nombre);
            });
          }) //  response.content lista de objeto clientes y se asigna al atributo cliente
        )
        .subscribe((response) => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    });

    this.modalService.notificarUpload.subscribe((cliente) => {
      // se pregunta si el cliente id de la lista es igual al cliente id que se esta emitiendo
      // recibimos el cliente original y lo transformamos cada uno el map retorna los clientes modificados
      this.clientes = this.clientes.map((clienteOriginal) => {
        if (cliente.id === clienteOriginal.id) {
          // al cliente original le pasamos la foto actualizada
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });
    });
  }

  public delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Está seguro?",
        text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.clienteService.delete(cliente.id).subscribe((response) => {
            this.clientes = this.clientes.filter((cli) => cli !== cliente);
            swalWithBootstrapButtons.fire(
              "Cliente eliminado!",
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              "success"
            );
          });
        }
      });
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
  // aca toma el cliente al cual hicimos click y se lo vamos asignar al atributo clienteSeleccionado
  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
