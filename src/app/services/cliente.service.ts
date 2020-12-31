import { Injectable, LOCALE_ID, Inject } from "@angular/core";
import { Cliente } from "../components/clientes/cliente";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEvent,
} from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { formatDate, DatePipe } from "@angular/common";
import { Region } from "../components/clientes/region";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private urlEndPoint: string = "http://localhost:8080/api/clientes";

  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  /*se inyecta httpClient*/
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private http: HttpClient,
    private router: Router
  ) {}

  private isNoAutorizado(e): boolean{
    // El código de error HTTP 401
    // Unauthorized (no autorizado) indica que la peticion (request)
    // no ha sido ejecutada porque carece de credenciales válidas de
    //autenticación
    //El código de error HTTP 403 Forbidden (prohibido)
    //en respuesta a un cliente de una pagina web o servicio , indica 
    //que el servidor se niega a permitir la accion solicitada. En otras
    //palabras, el servidor ha denegado el acceso 
     if(e.status == 401 || e.status == 403){
       this.router.navigate(['/login']);
       return true;
     }
     return false;
      
  }

  getRegion(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + "/regiones").pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getClientes(page: number): Observable<any> {
    /*se hace un cast portque devuelve un observable de cliente*/

    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
      tap((response: any) => {
        // tomamos las respuesta y se la asignamos a la variable clientes

        console.log("ClienteService: tap 1");
        (response.content as Cliente[]).forEach((cliente) => {
          // se mostrara los datos de cada cliente
          console.log(cliente.nombre);
        });
      }),
      // se transforma a clientes
      map((response: any) => {
        // se usa el metodo map del arreglo clientes
        // se modifica los valores internos o cada item del array
        (response.content as Cliente[]).map((cliente) => {
          //pasa a mayuscula el nombre del cliente
          cliente.nombre = cliente.nombre.toUpperCase();

          //let datePipe = new DatePipe('es-CL');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          // formatDate(cliente.createAt,'dd-MM-yyyy', 'en-US');
          return cliente; // se retorna el cliente modificado
        });
        return response;
      }),
      tap((response) => {
        console.log("ClienteService: tap 2");
        (response.content as Cliente[]).forEach((cliente) => {
          // se mostrara los datos de cada cliente
          console.log(cliente.nombre);
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.urlEndPoint, cliente, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {
          if(this.isNoAutorizado(e)){
            return throwError(e);
          }
          // el estado 400 viene de la validacion, un bad request
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        /*capturamos el error y redirigimos a clientes*/
        this.router.navigate(["/clientes"]);
        console.error(e.error.mensaje);
        swal.fire("Error al editar", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {

          // if(this.isNoAutorizado(e)){
          //   return throwError(e);
          // }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {

          if(this.isNoAutorizado(e)){
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }
  // Agregar metodo para subir foto
  // se tiene que retornar un observable de cliente
  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    // el primer parametro debe tener el mismo nombre que le pusimos en el backend-end:
    //@RequestParam("archivo")
    formData.append("archivo", archivo);
    formData.append("id", id);

    //Añadir barra de progerso
    const req = new HttpRequest(
      "POST",
      `${this.urlEndPoint}/upload`,
      formData,
      {
        reportProgress: true,
      }
    );
    // debemos convertir a un observable con pipe
    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
