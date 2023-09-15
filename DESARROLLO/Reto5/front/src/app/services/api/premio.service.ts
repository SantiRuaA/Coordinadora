import { Injectable } from "@angular/core";
import { ResponseInterface } from "../../models/response.interface";
import { PremioInterface } from "src/app/models/premio.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PremioService {
    url: string = 'http://localhost:3030/';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return headers;
    }

    getAllPremios(): Observable<PremioInterface[]> {
        let address = this.url + 'premio';
        const headers = this.getHeaders();
        return this.http.get<PremioInterface[]>(address, { headers });
    }

    getOnePremios(id: any): Observable<PremioInterface> {
        let address = this.url + 'premio/' + id;
        const headers = this.getHeaders();
        return this.http.get<PremioInterface>(address, { headers });
    }

    postPremios(form: PremioInterface): Observable<ResponseInterface> {
        let address = this.url + 'premio';
        const headers = this.getHeaders();
        return this.http.post<ResponseInterface>(address, form, { headers });
    }

    putPremios(id: any): Observable<ResponseInterface> {
        let address = this.url + 'premio/' + id;
        const headers = this.getHeaders();
        return this.http.put<ResponseInterface>(address, id, { headers });
    }

    deletePremios(id: any): Observable<ResponseInterface> {
        let addres = this.url + 'premio/' + id;
        const headers = this.getHeaders();
        return this.http.delete<ResponseInterface>(addres, { headers });
    }
}