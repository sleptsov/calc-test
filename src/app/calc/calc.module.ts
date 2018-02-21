import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalcRoutingModule } from './calc-routing.module';
import { CalcComponent } from './calc.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalcRoutingModule
  ],
  declarations: [
    CalcComponent
  ]
})
export class CalcModule { }
