import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditarUService {

  url = environment.API_URL + 'actualizar';
  private segurityHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  actualizar(body: Record<string, string | number | any>): Observable<any> {
    this.segurityHeaders = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post(this.url, body, { headers: this.segurityHeaders })
  }
}
