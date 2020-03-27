import { Injectable } from '@angular/core';
import { CLIENTES } from '../components/clientes/clientes.json';
import { Cliente } from '../components/clientes/cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
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
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> { 
    /*se hace un cast portque devuelve un observable de cliente*/

      return this.http.get(this.urlEndPoint).pipe(
        map(response => {

         let clientes =  response as Cliente[];

         // se usa el metodo map del arreglo clientes
         // se modifica los valores internos o cada item del array
         return clientes.map(cliente =>{
           cliente.nombre = cliente.nombre.toUpperCase();
           let datePipe = new DatePipe('en-US');
           cliente.createAt = datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy'); // formatDate(cliente.createAt,'dd-MM-yyyy', 'en-US');
           return cliente; // se retorna el cliente modificado
         })
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
