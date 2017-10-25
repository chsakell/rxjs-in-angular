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
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatDialogModule,
  MatCommonModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatDialog,
  MatGridListModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatProgressBarModule,
  MatSliderModule,
  MatTabsModule
} from '@angular/material';
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';

import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

import 'hammerjs';
import { HomeComponent } from './home/home.component';
import { LatestComponent } from './operators/latest/latest.component';
import { MergeComponent } from './operators/merge/merge.component';
import { FilterComponent } from './operators/filter/filter.component';
import { ScanComponent } from './operators/scan/scan.component';
import { ReduceComponent } from './operators/reduce/reduce.component';
import { BufferComponent } from './operators/buffer/buffer.component';
import { MergeMapComponent } from './operators/merge-map/merge-map.component';
import { SwitchMapComponent } from './operators/switch-map/switch-map.component';

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
    BufferComponent,
    MergeMapComponent,
    SwitchMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HighlightJsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatCommonModule,
    MatInputModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatGridListModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatProgressBarModule,
    MatSliderModule,
    MatTabsModule
  ],
  providers: [
    DataService,
    MatDialog,
    HighlightJsService,
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
