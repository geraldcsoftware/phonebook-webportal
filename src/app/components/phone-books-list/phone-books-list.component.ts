import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { PhoneBookListState } from "../../state/phone-book-list-state";

@Component({
    selector: 'app-phone-books-list',
    templateUrl: './phone-books-list.component.html',
})
export class PhoneBooksListComponent implements OnInit {
    phoneBookId$?: Observable<string>;

    phoneBooks$ = this.phoneBooksState.phoneBooks$;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private phoneBooksState: PhoneBookListState) {
    }

    ngOnInit(): void {
        this.phoneBookId$ = this.activatedRoute.queryParams.pipe(map(params => params['phoneBookId']));
        this.phoneBooksState.loadPhoneBooks();
    }

    selectPhoneBook(id: string) {
        this.router.navigate([], {
            queryParams: {
                phoneBookId: id
            }
        });
    }
}
