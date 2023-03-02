import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  url = environment.API_URL + 'register';
  private segurityHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  registrar(body: Record<string, string | number | any>): Observable<any> {
    this.segurityHeaders = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post(this.url, body, { headers: this.segurityHeaders })
  }
}
