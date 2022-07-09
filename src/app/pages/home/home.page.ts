import { Component, OnInit } from '@angular/core';
import { PhoneBookListState } from "../../state/phone-book-list-state";
import { PhoneBookEntriesState } from "../../state/phone-book-entries-state";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  providers: [PhoneBookListState, PhoneBookEntriesState]

})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
