import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { PhoneBookEntry } from "../models";
import { PhonebookEntriesService } from "../services";
import { Observable, switchMap } from "rxjs";
import { Injectable } from "@angular/core";
import { PhoneBookListState } from "./phone-book-list-state";

export interface State {
    phoneBookId: string;
    entries: PhoneBookEntry[];
}

@Injectable()
export class PhoneBookEntriesState extends ComponentStore<State> {

    entries$ = this.select(state => state.entries);

    constructor(private phoneBookEntriesService: PhonebookEntriesService,
                private phoneBooksState: PhoneBookListState) {
        super({
            phoneBookId: '',
            entries: []
        });
    }

    loadPhoneBookEntries: (request: { phoneBookId: string, searchText: string | undefined }) => void = this.effect(
        (origin$: Observable<{ phoneBookId: string, searchText: string | undefined }>) => origin$.pipe(
            switchMap(request => this.phoneBookEntriesService.getPhoneBookEntries(request.phoneBookId, request.searchText)),
            tapResponse(entries => this.patchState(state => ({ ...state, entries })),
                error => console.error(error))));

    addPhoneBookEntry: (request: { name: string, phoneNumbers: string[], phoneBookId: string }) => void = this.effect(
        (origin$: Observable<{ name: string, phoneNumbers: string[], phoneBookId: string }>) => origin$.pipe(
            switchMap(request => this.phoneBookEntriesService.addPhoneBookEntry(
                request.phoneBookId,
                request.name,
                request.phoneNumbers)),
            tapResponse(phoneBookEntry => {
                    this.patchState(state => ({
                        ...state,
                        entries: [...state.entries, phoneBookEntry]
                    }));

                    // Update number of entries in phone books list
                    this.phoneBooksState.patchState(state => ({
                        ...state,
                        phoneBooks: state.phoneBooks.map(p => p.id === phoneBookEntry.phoneBookId ? {
                            ...p,
                            numberOfEntries: p.numberOfEntries + 1
                        } : p)
                    }));
                },
                error => console.error(error))));
}
