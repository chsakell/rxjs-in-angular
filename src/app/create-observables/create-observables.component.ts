import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { createInterval$, createSubscriber, take$ } from 'app/shared/utils';
import { MOCK_USERS } from '../shared/data';

@Component({
  moduleId: module.id,
  selector: 'app-create-observables',
  templateUrl: './create-observables.component.html',
  styleUrls: ['./create-observables.component.css']
})
export class CreateObservablesComponent implements OnInit {
  users: any[] = [];
  icons$: Observable<any>;

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

  error$ = new Observable(observer => {
    observer.error(new Error('WHOA!'));
  });

  everySecond$ = createInterval$(1000);

  constructor() { }

  ngOnInit() {
    this.fromScratch();
    this.of();
    // this.test_01();
    // this.test_02();
    // this.test_03();
    // this.test_04();
    // this.test_05();
  }

  fromScratch() {
    this.users = [];
    const users$ = new Observable(observer => {
      for (let i = 0; i < 4; i++) {
        setTimeout(function () {
          const userId = Math.floor((Math.random() * 9) + 1);
          console.log('user', MOCK_USERS[userId]);
          observer.next(MOCK_USERS[userId]);
        }, (i + 1) * 2000);
      }
    });

    users$.subscribe(user => {
      this.users.push(user);
    });
  }

  of() {
    const mdIcons: [string] = ['home', 'donut_large', 'alarm_on', 'announcement'];
    this.icons$ = Observable.of(mdIcons);
  }

  randomize() {
    this.fromScratch();
  }

  test_01() {
    const self = this;
    self.simple$.subscribe(
      item => console.log(`one.next ${item}`),
      error => console.log(`one.error ${error}`),
      () => console.log('one.complete')
    );

    setTimeout(function () {
      self.simple$.subscribe({
        next: item => console.log(`two.next ${item}`),
        error(error) {
          console.log(`two.error ${error}`);
        },
        complete: function () {
          console.log('two.complete');
        }
      });
    }, 3000);
  }

  test_02() {
    this.error$.subscribe(
      item => console.log(`one.next ${item}`),
      error => console.log(`one.error ${error.stack}`),
      () => console.log('one.complete')
    );
  }

  test_03() {
    const self = this;
    self.everySecond$.subscribe(createSubscriber('one'));
    setTimeout(function () {
      self.everySecond$.subscribe(createSubscriber('two'));
    }, 3000);
  }

  test_04() {
    const self = this;
    const subscription = self.everySecond$.subscribe(createSubscriber('one'));

    setTimeout(function () {
      subscription.unsubscribe();
    }, 3000);
  }

  test_05() {
    const self = this;
    const firstFiveSeconds$ = take$(self.everySecond$, 5);
    const subscription = firstFiveSeconds$.subscribe(createSubscriber('one'));
  }

}
