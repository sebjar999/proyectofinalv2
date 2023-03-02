import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface InfoUsuarios {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

interface Credenciales {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    url = 'http://localhost/Api/public/';

    private segurityHeaders: HttpHeaders;

    constructor(private http: HttpClient) { }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public GuardarInformacionUsuario(obj: InfoUsuarios) {

        this.segurityHeaders = new HttpHeaders({
            'Accept': '*/*',
            'Content-Type': 'application/json; charset=utf-8',
        });

        return this.http.post<any>(this.url + `register_user`, obj,
            { headers: this.segurityHeaders });
    }

    public validarLoginApp(data: Credenciales) {
        this.segurityHeaders = new HttpHeaders({
            'Accept': '*/*',
            'Content-Type': 'application/json; charset=utf-8',
        });
        return this.http.post<any>(this.url + `iniciar_sesion`, data,
            { headers: this.segurityHeaders }
        );
    }

    public eliminarUsuario(data: number) {
        this.segurityHeaders = new HttpHeaders({
            'Accept': '*/*',
            'Content-Type': 'application/json; charset=utf-8',
        });
        return this.http.get<any>(this.url + `eliminar_cuenta/${data}`,
            { headers: this.segurityHeaders }
        );
    }

    public guardarInformacionRuta(obj: InfoUsuarios) {
        this.segurityHeaders = new HttpHeaders({
            'Accept': '*/*',
            'Content-Type': 'application/json; charset=utf-8',
        });
        return this.http.post<any>(this.url + `registrar_ruta`, obj,
            { headers: this.segurityHeaders });
    }
}
