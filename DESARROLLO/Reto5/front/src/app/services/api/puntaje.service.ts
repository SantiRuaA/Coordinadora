import { Injectable } from "@angular/core";
import { ResponseInterface } from "../../models/response.interface";
import { PuntajeInterface } from "src/app/models/puntaje.interface";
import { EmpleadoInterface } from "src/app/models/empleado.interface";
import { PremioInterface } from "src/app/models/premio.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PuntajeService {
    url: string = 'http://localhost:3030/';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return headers;
    }

    getAllPuntajes(): Observable<PuntajeInterface[]> {
        let address = this.url + 'puntaje';
        const headers = this.getHeaders();
        return this.http.get<PuntajeInterface[]>(address, { headers });
    }

    getOnePuntajes(id: any): Observable<PuntajeInterface> {
        let address = this.url + 'puntaje/' + id;
        const headers = this.getHeaders();
        return this.http.get<PuntajeInterface>(address, { headers });
    }

    postPuntajes(form: PuntajeInterface): Observable<ResponseInterface> {
        let address = this.url + 'puntaje';
        const headers = this.getHeaders();
        return this.http.post<ResponseInterface>(address, form, { headers });
    }

    putPuntajes(id: any): Observable<ResponseInterface> {
        let address = this.url + 'puntaje/' + id;
        const headers = this.getHeaders();
        return this.http.put<ResponseInterface>(address, id, { headers });
    }

    deletePuntajes(id: any): Observable<ResponseInterface> {
        let addres = this.url + 'puntaje/' + id;
        const headers = this.getHeaders();
        return this.http.delete<ResponseInterface>(addres, { headers });
    }

    getEmpleado(): Observable<EmpleadoInterface[]> {
        const address = this.url + 'empleado';
        const headers = this.getHeaders();
        return this.http.get<EmpleadoInterface[]>(address, { headers });
    }

    getPremio(): Observable<PremioInterface[]> {
        const address = this.url + 'premio';
        const headers = this.getHeaders();
        return this.http.get<PremioInterface[]>(address, { headers });
    }
    
}