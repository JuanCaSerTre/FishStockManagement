import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FishStockService {
  private apiUrl = 'http://localhost:3000'; // Cambia si es necesario

  constructor(private http: HttpClient) {}

  // Método para obtener la información del pez desde el backend
  getFishInfo(reference: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getFishInfo/${reference}`);
  }

  // Método para actualizar el stock (opcional)
  updateFishStock(stockData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateFishStock`, stockData);
  }
}
