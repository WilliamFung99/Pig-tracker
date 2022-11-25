import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PigAddComponent } from './pig-add/pig-add.component';
import { PigListComponent } from './pig-list/pig-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PigAddComponent,
    PigListComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
