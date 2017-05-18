import { DataService } from './shared/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateObservablesComponent } from './create-observables/create-observables.component';
import { BuiltInObservablesComponent } from './built-in-observables/built-in-observables.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { HotAndColdComponent } from './hot-and-cold/hot-and-cold.component';
import { OperatorsComponent } from './operators/operators.component';
import { APP_ROUTES } from 'app/app.routes';
import {
  FullscreenOverlayContainer,
  MaterialModule,
  MdNativeDateModule,
  MdSelectionModule,
  OverlayContainer
} from '@angular/material';

import 'hammerjs';
import { HomeComponent } from './home/home.component';
import { LatestComponent } from './operators/latest/latest.component';
import { MergeComponent } from './operators/merge/merge.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateObservablesComponent,
    BuiltInObservablesComponent,
    SubjectsComponent,
    HotAndColdComponent,
    OperatorsComponent,
    HomeComponent,
    LatestComponent,
    MergeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
    MaterialModule,
    MdNativeDateModule,
    MdSelectionModule
  ],
  providers: [
    DataService,
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
