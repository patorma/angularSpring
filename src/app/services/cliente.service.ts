import { Injectable } from '@angular/core';
import { CLIENTES } from '../components/clientes/clientes.json';
import { Cliente } from '../components/clientes/cliente';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  /*se inyecta httpClient*/
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> { 
    
    /*se hace un cast portque devuelve un observable de cliente*/
    return this.http.get<Cliente[]>(this.urlEndPoint);
     
  
    
  } 
}
