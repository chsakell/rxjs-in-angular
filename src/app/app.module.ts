import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CreateObservablesComponent } from './create-observables/create-observables.component';
import { BuiltInObservablesComponent } from './built-in-observables/built-in-observables.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { HotAndColdComponent } from './hot-and-cold/hot-and-cold.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateObservablesComponent,
    BuiltInObservablesComponent,
    SubjectsComponent,
    HotAndColdComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
