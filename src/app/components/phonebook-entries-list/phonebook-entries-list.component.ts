import { Component, OnDestroy, OnInit } from '@angular/core';
import { PhoneBookListState } from "../../state/phone-book-list-state";
import { PhoneBookEntriesState } from "../../state/phone-book-entries-state";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, map, Observable, Subject, takeUntil } from "rxjs";
import { PhoneBook } from "../../models";

@Component({
    selector: 'app-phonebook-entries-list',
    templateUrl: './phonebook-entries-list.component.html',
})
export class PhonebookEntriesListComponent implements OnInit, OnDestroy {
    private _destroyed: Subject<void> = new Subject<void>();

    phoneBook$?: Observable<PhoneBook | undefined> = combineLatest([
        this.phoneBooksState.phoneBooks$,
        this.activatedRoute.queryParams.pipe(map(params => params['phoneBookId']))
    ]).pipe(
        map(([phoneBooks, phoneBookId]) => phoneBooks.find(p => p.id === phoneBookId))
    );
    entries$ = this.phoneBookEntriesState.entries$;

    constructor(private phoneBooksState: PhoneBookListState,
                private phoneBookEntriesState: PhoneBookEntriesState,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.pipe(map(params => params['phoneBookId']),
                takeUntil(this._destroyed))
            .subscribe({
                next: phoneBookId => this.onPhoneBookChanged(phoneBookId)
            })
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }

    private onPhoneBookChanged(phoneBookId: string) {
        if (phoneBookId)
            this.phoneBookEntriesState.loadPhoneBookEntries({ phoneBookId, searchText: '' });
    }

}
