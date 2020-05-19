import { Component, OnInit } from "@angular/core";
import { Cliente } from "../cliente";
import { ClienteService } from "../../../services/cliente.service";
import { ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "detalle-cliente",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.css"],
})
export class DetalleComponent implements OnInit {
  cliente: Cliente;
  titulo: string = "Detalle del cliente";
  private fotoSeleccionada: File;
  // Atributo de progreso
  progreso: number = 0;
  // inyectamos el cliente service en el constructor
  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      // con el signo + volvemos el String id a un number
      let id: number = +params.get("id");
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => {
          this.cliente = cliente;
        });
      }
    });
  }
  // event va sin $ solo en en html se le agrega a event $
  seleccionarFoto(event) {
    //files es un arreglo de archivos
    this.fotoSeleccionada = event.target.files[0];
    // cada vez que seleccionemos una nueva foto o imagen tenemos que volver a reiniciar el progreso
    // en cero ya que vamos a subir una nueva foto
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    // type tipo de archivo
    // indexOf lo que hace es buscar en el string (cadena) si hay alguna coincidencia con image
    // si la encuebntra va a retornar la posicion o primera ocurrencia que encuentre
    // si es menor a cero lo que retorna envia un error
    if (this.fotoSeleccionada.type.indexOf("image") < 0) {
      swal.fire(
        "Error seleccionar imagen:",
        "El archivo debe ser del tipo imagen",
        "error"
      );
      // reiniciamos la foto seleccionada
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire("Error Upload:", "Debe seleccionar una foto", "error");
    } else {
      // nos subscribimos al cambio del cliente con su nueva imagen dentro del observador (subscribe)
      // vamos a subscribir el cambio del cliente con su nueva imagen
      this.clienteService
        .subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe((event) => {
          // se pregunta si se produce un upload progress o si se esta subiendo una foto
          //  HttpEventType es un numnerador con muchas opciones
          if (event.type === HttpEventType.UploadProgress) {
            // se calcula el porcentaje de progreso , la transferencia
            // se usa la clase Math matematica para redondear
            // se divide lo que se ha enviado por el total de lo que tenemos que enviar y
            // multiplicado por 100
            //loaded lo cargado hasta el momento
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            // tomamos el body de la respuesta o response y lo pasamos a una variable
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;
            swal.fire(
              "La foto se ha subido completamente!",
              response.mensaje,
              "success"
            );
          }
          // como actualizamos el cliente viene con la nueva foto incluida
          // this.cliente = cliente;
        });
    }
  }
}
