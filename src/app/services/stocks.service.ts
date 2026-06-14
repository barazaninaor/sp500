import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StocksService {
  private apiUrl = 'https://sp500-backend.onrender.com';

  constructor(private http: HttpClient) {}

  // מחזיר את כל המניות
  getStocks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stocks`);
  }

  // מחזיר את רשימת הסקטורים לתפריט
  getSectors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sectors`);
  }

  // מחזיר מניות לפי סקטור ספציפי (לפי ה-ID)
  getStocksBySector(sectorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stocks?sector=${sectorId}`);
  }

  // הפונקציה החסרה שביקשת - מושכת את כל המניות עם המידע על הסקטורים
  getStocksWithSectors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stocks-with-sectors`);
  }

  // פונקציית העדכון החדשה
  updateMarketData(): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/update-data`, {});
  }
}

