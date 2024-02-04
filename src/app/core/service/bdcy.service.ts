import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculos } from '../../Vehiculo';

@Injectable({
  providedIn: 'root'
})
export class BdcyService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getVehi(cod: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehiculos?cod=${cod}`);
  }

  setVehiculo(vehiculo: Vehiculos): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vehiculos`, vehiculo);
  }

  editarVehiculo(id: string, datosActualizados: any): Observable<any> {
    const url = `${this.apiUrl}/vehiculos/${id}`;
    return this.http.patch(url, datosActualizados);
  }
}
