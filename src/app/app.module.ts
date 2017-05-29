import { DataService } from './shared/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateObservablesComponent } from './create-observables/create-observables.component';
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

import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

import 'hammerjs';
import { HomeComponent } from './home/home.component';
import { LatestComponent } from './operators/latest/latest.component';
import { MergeComponent } from './operators/merge/merge.component';
import { FilterComponent } from './operators/filter/filter.component';
import { ScanComponent } from './operators/scan/scan.component';
import { ReduceComponent } from './operators/reduce/reduce.component';
import { BufferComponent } from './operators/buffer/buffer.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateObservablesComponent,
    SubjectsComponent,
    HotAndColdComponent,
    OperatorsComponent,
    HomeComponent,
    LatestComponent,
    MergeComponent,
    FilterComponent,
    ScanComponent,
    ReduceComponent,
    BufferComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HighlightJsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
    MaterialModule,
    MdNativeDateModule,
    MdSelectionModule
  ],
  providers: [
    DataService,
    HighlightJsService,
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
