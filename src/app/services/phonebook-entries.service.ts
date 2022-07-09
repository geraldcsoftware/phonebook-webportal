import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { PhoneBookEntry } from "../models";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PhonebookEntriesService {

    constructor(private httpClient: HttpClient) {
    }

    public getPhoneBookEntries(phoneBookId: string, searchText?: string): Observable<PhoneBookEntry[]> {
        const params = new HttpParams({
            fromObject: searchText ? { searchText } : {}
        });
        return this.httpClient.get<PhoneBookEntry[]>(`/api/phonebooks/${ phoneBookId }/entries`, { params });
    }
}
