import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  modal: boolean = false;

  private _notificarUpload = new EventEmitter<any>();

  constructor() {}
  // cada vez que se suba una foto en el detalle
  // component tenemo que notificar en nuestro modal a nuestros observadores
  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  abrirModal() {
    this.modal = true;
  }
  cerrarModal() {
    this.modal = false;
  }
}
