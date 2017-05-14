import { LatestComponent } from './operators/latest/latest.component';
import { OperatorsComponent } from './operators/operators.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { HotAndColdComponent } from './hot-and-cold/hot-and-cold.component';
import { CreateObservablesComponent } from './create-observables/create-observables.component';
import { BuiltInObservablesComponent } from './built-in-observables/built-in-observables.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create-observables', component: CreateObservablesComponent },
    { path: 'build-in-observables', component: BuiltInObservablesComponent },
    { path: 'hot-and-cold-observables', component: HotAndColdComponent },
    { path: 'subjects', component: SubjectsComponent },
    { path: 'operators', component: OperatorsComponent },
    { path: 'latest', component: LatestComponent }
];
