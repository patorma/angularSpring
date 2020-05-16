import { Component, OnInit } from "@angular/core";
import { Cliente } from "../cliente";
import { ClienteService } from "../../../services/cliente.service";
import { ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: "detalle-cliente",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.css"],
})
export class DetalleComponent implements OnInit {
  cliente: Cliente;
  titulo: string = "Detalle del cliente";
  private fotoSeleccionada: File;
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
    console.log(this.fotoSeleccionada);
  }

  subirFoto() {
    // nos subscribimos al cambio del cliente con su nueva imagen dentro del observador (subscribe)
    // vamos a subscribir el cambio del cliente con su nueva imagen
    this.clienteService
      .subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe((cliente) => {
        // como actualizamos el cliente viene con la nueva foto incluida
        this.cliente = cliente;
        swal.fire(
          "La foto se ha subido completamente!",
          `La foto se ha subido con éxito: ${this.cliente.foto}`,
          "success"
        );
      });
  }
}
