import { createSubscriber } from 'app/shared/utils';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.test_01();
    // this.test_02();
    // this.test_03();
    // this.test_04();
    // this.test_05();
    // this.test_06();
  }

  test_01() {
    const simple$ = new Subject();
    simple$.subscribe(createSubscriber('simple$'));

    simple$.next('hello');
    simple$.next('world');
    simple$.complete();
  }

  test_02() {
    const interval$ = Observable.interval(1000).take(5);
    const intervalSubject$ = new Subject();
    interval$.subscribe(intervalSubject$);

    intervalSubject$.subscribe(createSubscriber('sub1'));
    intervalSubject$.subscribe(createSubscriber('sub2'));
    intervalSubject$.subscribe(createSubscriber('sub3'));

    setTimeout(function () {
      intervalSubject$.subscribe(createSubscriber('I am here too!'));
    }, 3000);
  }

  test_03() {
    const currentUser$ = new Subject();
    const isLoggedIn$ = currentUser$.map((u: any) => u.isLoggedIn);

    isLoggedIn$.subscribe(createSubscriber('isLoggedIn'));

    currentUser$.next({ isLoggedIn: false });

    setTimeout(function () {
      currentUser$.next({ isLoggedIn: true });
    }, 2000);

    setTimeout(function () {
      isLoggedIn$.subscribe(createSubscriber('delayed'));
    }, 1000);
  }

  test_04() {
    const currentUser$ = new BehaviorSubject({ isLoggedIn: false });
    const isLoggedIn$ = currentUser$.map((u: any) => u.isLoggedIn);

    isLoggedIn$.subscribe(createSubscriber('isLoggedIn'));

    currentUser$.next({ isLoggedIn: false });

    setTimeout(function () {
      currentUser$.next({ isLoggedIn: true });
    }, 2000);

    setTimeout(function () {
      isLoggedIn$.subscribe(createSubscriber('delayed'));
    }, 1000);
  }

  test_05() {
    const replay$ = new ReplaySubject(3);
    replay$.next(1);
    replay$.next(2);

    replay$.subscribe(createSubscriber('one'));

    replay$.next(3);
    replay$.next(4);
    replay$.next(5);

    replay$.subscribe(createSubscriber('two'));

    replay$.next(6);
  }

  test_06() {
    const apiCall$ = new AsyncSubject();
    apiCall$.next(1);

    apiCall$.subscribe(createSubscriber('one'));
    apiCall$.next(2);
    apiCall$.complete();

    setTimeout(function () {
      apiCall$.subscribe(createSubscriber('two'));
    }, 2000);
  }

}
