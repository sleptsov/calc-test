import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'calc', loadChildren: 'app/calc/calc.module#CalcModule' },
  { path: '', redirectTo: 'calc', pathMatch: 'full' },
  { path: '**', redirectTo: 'calc', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
