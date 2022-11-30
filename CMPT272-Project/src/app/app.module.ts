import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module'

import { AppComponent } from './app.component';
import { PigAddComponent } from './pig-add/pig-add.component';
import { PigListComponent } from './pig-list/pig-list.component';
import { PigComponent } from './pig/pig.component';

@NgModule({
  declarations: [
    AppComponent,
    PigAddComponent,
    PigListComponent,
    PigComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
