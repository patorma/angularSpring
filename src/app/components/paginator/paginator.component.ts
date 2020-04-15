import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styles: [
  ],
})
export class PaginatorComponent implements OnInit {

 @Input() paginador: any;

 paginas: number[];
   
  constructor() { }

  ngOnInit(): void {
    //  en el contructor(Array) el numero de elementos, 
    // totalPages(este atributo contiene el total de paginas 
    // que existe dentro de los atributos del  paginador) 
    // se llena este arreglo con un valor por defecto
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor,indice) => indice + 1);
  }

}
