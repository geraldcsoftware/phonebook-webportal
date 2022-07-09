import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { PhoneBookEntry } from "../models";
import { PhonebookEntriesService } from "../services";
import { Observable, switchMap } from "rxjs";
import { Injectable } from "@angular/core";

export interface State {
    phoneBookId: string;
    entries: PhoneBookEntry[];
}

@Injectable()
export class PhoneBookEntriesState extends ComponentStore<State> {

    entries$ = this.select(state => state.entries);

    constructor(private phoneBookEntriesService: PhonebookEntriesService) {
        super({
            phoneBookId: '',
            entries: []
        });
    }

    loadPhoneBookEntries: (request: { phoneBookId: string, searchText: string | undefined }) => void = this.effect(
        (origin$: Observable<{ phoneBookId: string, searchText: string | undefined }>) => origin$.pipe(
            switchMap(request => this.phoneBookEntriesService.getPhoneBookEntries(request.phoneBookId, request.searchText)),
            tapResponse(entries => this.patchState(state => ({ ...state, entries })),
                error => {
                })));
}
