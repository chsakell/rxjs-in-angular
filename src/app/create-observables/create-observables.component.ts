import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-observables',
  templateUrl: './create-observables.component.html',
  styleUrls: ['./create-observables.component.css']
})
export class CreateObservablesComponent implements OnInit {

  simple$ = new Observable(observer => {
    console.log('Generating observable..');
    setTimeout(function () {
      observer.next('An item!');
      setTimeout(function () {
        observer.next('Another item!');
        observer.complete();
      }, 1000);
    }, 1000);
  });

  constructor() { }

  ngOnInit() {
    this.test_01();
  }

  test_01() {
    this.simple$.subscribe(
      item => console.log(`one.next ${item}`),
      error => console.log(`one.error ${error}`),
      () => console.log('one.complete')
    );
  }

}
