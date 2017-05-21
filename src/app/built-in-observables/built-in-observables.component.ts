import { createSubscriber } from 'app/shared/utils';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MdDialog, MdDialogConfig } from "@angular/material";

@Component({
  selector: 'app-built-in-observables',
  templateUrl: './built-in-observables.component.html',
  styleUrls: ['./built-in-observables.component.css']
})
export class BuiltInObservablesComponent implements OnInit {

  sideEffet$ = 0;

  @ViewChild(TemplateRef) template: TemplateRef<any>;
  seconds = 5;
  config: MdDialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    backdropClass: '',
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  }

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
    this.runTimer();
    this.openTemplate();
  }

  runTimer() {
    Observable.timer(0, 1000).take(5).subscribe(value => this.seconds--);
  }

  openTemplate() {
    Observable.interval(5000).take(1).subscribe(() =>
      this.dialog.open(this.template, this.config)
    );
  }

  test_03() {
    Observable.of('Hello world')
      .subscribe(createSubscriber('of'));
  }

  test_04() {
    Observable.from([43, 10, 4, 'hello world'])
      .subscribe(createSubscriber('from'));
  }

  test_06() {
    Observable.throw(new Error('Hey error!'))
      .subscribe(createSubscriber('Error'));
  }

  test_07() {
    const defer$ = Observable.defer(() => {
      this.sideEffet$++;
      return Observable.of(this.sideEffet$);
    });

    defer$.subscribe(createSubscriber('defer$.one'));
    defer$.subscribe(createSubscriber('defer$.two'));
    defer$.subscribe(createSubscriber('defer$.three'));
  }

  test_08() {
    Observable.range(10, 30)
      .subscribe(createSubscriber('range'));
  }

}
