import { Injectable,LOCALE_ID ,Inject } from '@angular/core';
import { CLIENTES } from '../components/clientes/clientes.json';
import { Cliente } from '../components/clientes/cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  /*se inyecta httpClient*/
  constructor(@Inject(LOCALE_ID) private locale: string,
    private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any> { 
    /*se hace un cast portque devuelve un observable de cliente*/

      return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
        tap((response: any) =>{
          // tomamos las respuesta y se la asignamos a la variable clientes
         
          console.log('ClienteService: tap 1');
          (response.content as Cliente[]).forEach(cliente =>{
            // se mostrara los datos de cada cliente
              console.log(cliente.nombre);
          });
        }),
        // se transforma a clientes
        map((response: any) => {

         
         // se usa el metodo map del arreglo clientes
         // se modifica los valores internos o cada item del array
         (response.content as Cliente[]).map(cliente =>{
           //pasa a mayuscula el nombre del cliente
           cliente.nombre = cliente.nombre.toUpperCase();
         
           //let datePipe = new DatePipe('es-CL');
           //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy'); 
           // formatDate(cliente.createAt,'dd-MM-yyyy', 'en-US');
           return cliente; // se retorna el cliente modificado
         });
         return response;
        }),
        tap(response =>{
          console.log('ClienteService: tap 2');
          (response.content as Cliente[]).forEach(cliente =>{
            // se mostrara los datos de cada cliente
              console.log(cliente.nombre);
          }

          )
        })
      );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(

      map( (response: any) => response.cliente as Cliente),
      catchError( e => {
        // el estado 400 viene de la validacion, un bad request
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        /*capturamos el error y redirigimos a clientes*/
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
