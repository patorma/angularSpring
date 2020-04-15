import { Component, OnInit , Input, OnChanges} from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styles: [
  ],
})
export class PaginatorComponent implements OnInit, OnChanges {

 @Input() paginador: any;

 paginas: number[];

 desde: number;
 hasta: number;
   
  constructor() { }
// ngOnInit() se ejecuta solo una vez
  ngOnInit(): void {
  
  }

  ngOnChanges(){
      // se calcula el desde y hata para calcular el rango a mostrar en el paginador
    // en desde habran dos calculos
    // primer parametro de desde el maximo entre  y nuestra pagina actual menos 4 y segundo parametro totaldepaginas-5
    // min [max (el minimo que podria tener el desde  y la pagina actual-4)]
    // la pagina actual la obtenemos del paginador a traves del atributo number
    this.desde = Math.min( Math.max(1, this.paginador.number-4), this.paginador.totalPages-5);
    // max[el minimo entre el total de paginas y nuestra pagina actual + 4]
    this.hasta = Math.max(Math.min(this.paginador.totalPages,this.paginador.number+4), 6);

    if(this.paginador.totalPages > 5){
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor,indice) => indice + this.desde);
    } else {
    //  en el contructor(Array) el numero de elementos, 
    // totalPages(este atributo contiene el total de paginas 
    // que existe dentro de los atributos del  paginador) 
    // se llena este arreglo con un valor por defecto
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor,indice) => indice + 1);
  }

  }

}
