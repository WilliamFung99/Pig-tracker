import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PigComponent } from '../pig/pig.component';
import { PigListComponent } from '../pig-list/pig-list.component';
import { PigAddComponent } from '../pig-add/pig-add.component';

const appRoutes: Routes = [
  { path: '', component: PigListComponent},

  { path: 'info/:PID', component: PigComponent },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
