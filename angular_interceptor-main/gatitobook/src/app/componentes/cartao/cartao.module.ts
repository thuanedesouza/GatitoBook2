import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaoComponent } from './cartao.component';
import { HomeComponent } from 'src/app/home/home.component';



@NgModule({
  declarations: [CartaoComponent],
  imports: [
    CommonModule
  ],
  exports: [CartaoComponent]
})
export class CartaoModule { }
