import { Component, OnInit } from "@angular/core";
import { Cliente } from "../cliente";
import { ClienteService } from "../../../services/cliente.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "detalle-cliente",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.css"],
})
export class DetalleComponent implements OnInit {
  cliente: Cliente;
  private titulo: string = "Detalle del cliente";
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
}
