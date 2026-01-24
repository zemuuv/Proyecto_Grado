import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Residuo {
  
   private apiUrl = 'http://localhost:8080/residuo';

  constructor(private http: HttpClient) {}

  obtenerResiduoAleatorio(tipo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/aleatorio?tipo=${tipo}`);
  }

}
