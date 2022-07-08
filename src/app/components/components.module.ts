import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveComponentModule } from '@ngrx/component';
import { PhoneBooksListComponent } from './phone-books-list/phone-books-list.component';



@NgModule({
  declarations: [
    PhoneBooksListComponent
  ],
  imports: [
    CommonModule, ReactiveComponentModule
  ],
  exports: [
    PhoneBooksListComponent
  ]
})
export class ComponentsModule { }
