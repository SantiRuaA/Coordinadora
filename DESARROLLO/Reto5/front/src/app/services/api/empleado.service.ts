import { Injectable } from "@angular/core";
import { ResponseInterface } from "../../models/response.interface";
import { EmpleadoInterface } from "src/app/models/empleado.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmpleadoService {
    url: string = 'http://localhost:3030/';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return headers;
    }

    getAllEmpleados(): Observable<EmpleadoInterface[]> {
        let address = this.url + 'empleado';
        const headers = this.getHeaders();
        return this.http.get<EmpleadoInterface[]>(address, { headers });
    }

    postEmpleados(form: EmpleadoInterface): Observable<ResponseInterface> {
        let address = this.url + 'empleado';
        const headers = this.getHeaders();
        return this.http.post<ResponseInterface>(address, form, { headers });
    }

    putEmpleados(id: any): Observable<ResponseInterface> {
        let address = this.url + 'empleado/' + id;
        const headers = this.getHeaders();
        return this.http.put<ResponseInterface>(address, id, { headers });
    }

    deleteEmpleados(id: any): Observable<ResponseInterface> {
        let addres = this.url + 'empleado/' + id;
        const headers = this.getHeaders();
        return this.http.delete<ResponseInterface>(addres, { headers });
    }

}