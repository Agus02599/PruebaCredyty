import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Vehiculos } from '../../Vehiculo';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BdcyService {

  private apiUrl = 'http://localhost:3000';

  private _recargar$ = new Subject<void>()

  constructor(private http: HttpClient) { }

  get recargar$(){
    return this._recargar$;
  }

  getListVehi(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehiculos`);
  }

  getVehi(cod: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehiculos?cod=${cod}`);
  }

  setVehiculo(vehiculo: Vehiculos): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vehiculos`, vehiculo);
  }

  editarVehiculo(id: string, datosActualizados: any): Observable<any> {
    const url = `${this.apiUrl}/vehiculos/${id}`;
    return this.http.patch(url, datosActualizados)
    .pipe(
      tap(() =>{
        this._recargar$.next();
      })
    )
  }
}
