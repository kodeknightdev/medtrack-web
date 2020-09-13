import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'symptoms', pathMatch: 'full' },
  {
    path: 'symptoms',
    loadChildren: () => import('./symptoms/symptoms.module').then(m => m.SymptomsModule)
  },
  { path: '**', redirectTo: 'symptoms' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
