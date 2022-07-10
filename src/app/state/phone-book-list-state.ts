import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { PhoneBook } from "../models";
import { exhaustMap, Observable, switchMap } from "rxjs";
import { PhonebookService } from "../services";
import { Injectable } from "@angular/core";

export interface State {
    phoneBooks: PhoneBook[];
}

@Injectable()
export class PhoneBookListState extends ComponentStore<State> {

    phoneBooks$ = this.select(state => state.phoneBooks);

    constructor(private phoneBookService: PhonebookService) {
        super({
            phoneBooks: []
        })
    }

    loadPhoneBooks: (searchText?: string) => void = this.effect(
        (origin$: Observable<string | undefined>) => origin$.pipe(
            switchMap(searchText => this.phoneBookService.getPhoneBooks(searchText)),
            tapResponse(phoneBooks => this.patchState(state => ({ ...state, phoneBooks })),
                error => {
                })));

    addPhoneBook: (phoneBook: { name: string }) => void = this.effect(
        (origin$: Observable<{ name: string }>) => origin$.pipe(
            exhaustMap(phoneBook => this.phoneBookService.addPhoneBook(phoneBook)),
            tapResponse(phoneBook => this.patchState(state => ({
                    ...state,
                    phoneBooks: [...state.phoneBooks, phoneBook]
                })),
                error => {
                })));
}
