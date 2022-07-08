import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home/home.page';
import { ComponentsModule } from "../components/components.module";



@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    CommonModule,
      ComponentsModule
  ]
})
export class PagesModule { }
