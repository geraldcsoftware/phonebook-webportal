import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { PhoneBookEntry } from "../models";

@Injectable({
  providedIn: 'root'
})
export class PhonebookEntriesService {

  constructor() { }

  public getPhoneBookEntries(phoneBookId: string, searchText?: string): Observable<PhoneBookEntry[]>{
    return of([
      {id: '876542345', phoneBookId: phoneBookId, name: 'Michael 1', phoneNumbers: ['0986712367321']},
      {id: 'q23493489', phoneBookId: phoneBookId, name: 'Michael 2', phoneNumbers: ['0986712367321']},
      {id: 'f0394jt90', phoneBookId: phoneBookId, name: 'Michael 3', phoneNumbers: ['0986712367321']},
      {id: '09940iy54', phoneBookId: phoneBookId, name: 'Michael 4', phoneNumbers: ['0986712367321']},
    ]);
  }
}
