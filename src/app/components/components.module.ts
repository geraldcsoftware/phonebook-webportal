import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveComponentModule } from '@ngrx/component';
import { PhoneBooksListComponent } from './phone-books-list/phone-books-list.component';
import { PhonebookEntriesListComponent } from './phonebook-entries-list/phonebook-entries-list.component';



@NgModule({
  declarations: [
    PhoneBooksListComponent,
    PhonebookEntriesListComponent
  ],
  imports: [
    CommonModule, ReactiveComponentModule
  ],
    exports: [
        PhoneBooksListComponent,
        PhonebookEntriesListComponent
    ]
})
export class ComponentsModule { }
