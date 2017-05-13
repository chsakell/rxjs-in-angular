import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CreateObservablesComponent } from './create-observables/create-observables.component';
import { BuiltInObservablesComponent } from './built-in-observables/built-in-observables.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { HotAndColdComponent } from './hot-and-cold/hot-and-cold.component';
import { OperatorsComponent } from './operators/operators.component';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';

import 'hammerjs';

const MdModules = [MdButtonModule, MdCheckboxModule];

@NgModule({
  declarations: [
    AppComponent,
    CreateObservablesComponent,
    BuiltInObservablesComponent,
    SubjectsComponent,
    HotAndColdComponent,
    OperatorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ...MdModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
