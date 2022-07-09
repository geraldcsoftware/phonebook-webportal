import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { PhoneBook } from "../models";

@Injectable({
    providedIn: 'root'
})
export class PhonebookService {

    constructor(private httpClient: HttpClient) {
    }

    public getPhoneBooks(searchText?: string): Observable<PhoneBook[]> {
        return of([
            {
                id: '12345',
                name: 'My Phone Book',
                numberOfEntries: 3
            },
            {
                id: '45678',
                name: 'Work Contacts',
                numberOfEntries: 5
            },
            {
                id: '3243920',
                name: 'Miscellaneous',
                numberOfEntries: 12
            }
        ])
    }
}
