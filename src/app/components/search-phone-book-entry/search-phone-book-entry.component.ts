import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil } from "rxjs";
import { PhoneBookEntriesState } from "../../state/phone-book-entries-state";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-search-phone-book-entry',
    templateUrl: './search-phone-book-entry.component.html',
    styles: []
})
export class SearchPhoneBookEntryComponent implements OnInit, OnDestroy {

    private _destroyed = new Subject<void>();

    searchControl = new FormControl();

    constructor(private phoneBookEntriesState: PhoneBookEntriesState,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.searchControl.valueChanges.pipe(takeUntil(this._destroyed), debounceTime(500))
            .subscribe(value => {
                if (value === undefined) return;
                const phoneBookId = this.activatedRoute.snapshot.queryParams['phoneBookId'];
                this.phoneBookEntriesState.loadPhoneBookEntries({ phoneBookId, searchText: value });
            });

        // Clear search text when different phone book is selected
        this.activatedRoute.queryParams.pipe(
            takeUntil(this._destroyed),
            map(p => p['phoneBookId']),
            distinctUntilChanged()).subscribe(() => {
            this.clear(false);
        });
    }


    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    clear(reload: boolean): void {
        this.searchControl.patchValue(undefined);
        if (reload) {
            const phoneBookId = this.activatedRoute.snapshot.queryParams['phoneBookId'];
            this.phoneBookEntriesState.loadPhoneBookEntries({ phoneBookId, searchText: undefined });
        }
    }

}
