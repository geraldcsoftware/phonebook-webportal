import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";

@Component({
    selector: 'app-phone-books-list',
    templateUrl: './phone-books-list.component.html',
    styles: []
})
export class PhoneBooksListComponent implements OnInit {
    phoneBookId?: Observable<string>;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.phoneBookId = this.activatedRoute.queryParams.pipe(map(params => params['phoneBookId']));
    }

    selectPhoneBook(id: string) {
        this.router.navigate([], {
            queryParams: {
                phoneBookId: id
            }
        });
    }
}
