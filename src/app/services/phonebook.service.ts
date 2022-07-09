import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { PhoneBook } from "../models";

@Injectable({
    providedIn: 'root'
})
export class PhonebookService {

    constructor(private httpClient: HttpClient) {
    }

    public getPhoneBooks(searchText?: string): Observable<PhoneBook[]> {
        const params = new HttpParams({
            fromObject: searchText ? { searchText } : {}
        });
        return this.httpClient.get<PhoneBook[]>('/api/phonebooks', { params });
    }
}
