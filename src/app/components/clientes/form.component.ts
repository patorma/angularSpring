import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";
import { ClienteService } from "../../services/cliente.service";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
import { Region } from "./region";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  regiones: Region[];
  private titulo: string = "Crear cliente";
  private errores: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    /*Recibe como argumento los parametros en subscribe */
    this.activatedRoute.params.subscribe((params) => {
      let id = params["id"];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
    this.clienteService
      .getRegion()
      .subscribe((regiones) => (this.regiones = regiones));
  }

  public create(): void {
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(["/clientes"]);
        swal.fire(
          "Nuevo Cliente",
          `El cliente ${cliente.nombre} ha sido creado con éxito!`,
          "success"
        );
      },
      (err) => {
        // error es el atributo del objeto error que contiene el json
        // y ásamos los errores en el parametro errors
        // como errors (ver backend) es any  se convierte a un arreglo de string
        // lo anterior es opcional es para que el codigo sea más estricto
        this.errores = err.error.errors as string[];
        console.error("Codigo del error desde el backend: " + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.cliente);
    this.clienteService.update(this.cliente).subscribe(
      (response) => {
        this.router.navigate(["/clientes"]);
        swal.fire(
          "Cliente Actualizado",
          `${response.mensaje}: ${response.cliente.nombre}`,
          "success"
        );
      },
      (err) => {
        // error es el atributo del objeto error que contiene el json
        // y ásamos los errores en el parametro errors
        // como errors (ver backend) es any  se convierte a un arreglo de string
        // lo anterior es opcional es para que el codigo sea más estricto
        this.errores = err.error.errors as string[];
        console.error("Codigo del error desde el backend: " + err.status);
        console.error(err.error.errors);
      }
    );
  }
  // el primer objeto corresponde a cada una de las regiones del ngFor de la iteracion
  // el segundo objeto es el objeto asignado al cliente  y ahi hay que compara
  compararRegion(o1: Region, o2: Region): boolean {
    // se compara el objeto 1 y el objeto 2
    // si es undefined se deja marcado el seleccionar con un mensaje
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }
}
