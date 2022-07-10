import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveComponentModule } from '@ngrx/component';
import { PhoneBooksListComponent } from './phone-books-list/phone-books-list.component';
import { PhonebookEntriesListComponent } from './phonebook-entries-list/phonebook-entries-list.component';
import { AddPhoneBookComponent } from './add-phone-book/add-phone-book.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AddPhoneBookEntryComponent } from './add-phone-book-entry/add-phone-book-entry.component';



@NgModule({
  declarations: [
    PhoneBooksListComponent,
    PhonebookEntriesListComponent,
    AddPhoneBookComponent,
    AddPhoneBookEntryComponent
  ],
  imports: [
    CommonModule,
    ReactiveComponentModule,
    ReactiveFormsModule
  ],
    exports: [
        PhoneBooksListComponent,
        PhonebookEntriesListComponent
    ]
})
export class ComponentsModule { }
