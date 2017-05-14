import { DataService } from './../../shared/data.service';
import { createSubscriber } from 'app/shared/utils';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { MOCK_USERS } from '../../shared/data';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {

  sliderValue = 0;
  sliderDisabled = false;
  users: any[] = [];

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.startZipping(10);
    // this.zip();
    // this.withLatestFrom();
    // this.withLatestFromExample();
    // this.combineLatest();
  }

  arrayZip(array1, array2, selector) {
    const count = Math.min(array1.length, array2.length);
    const results = [];
    for (let i = 0; i < count; i++) {
      const combined = selector(array1[i], array2[i]);
      results.push(combined);
    }

    return results;
  }

  arrayZipTest() {
    const array1 = [32, 2, 52, 44, 54];
    const array2 = [1, 0, 10, 4, 1, 1, 6, 2, 4];
    const results = this.arrayZip(array1, array2, (left, right) => left * right);

    console.log(results);
  }

  startZipping(seconds) {
    this.users = [];
    this.sliderValue = 0;
    this.sliderDisabled = false;

    const timer$ = Observable.timer(1000, 1000).take(seconds);

    this.ds.wsOnUser().zip(timer$, (user, sec) => {
      return { user, sec };
    }
    ).subscribe(info => {
      this.users.push(info.user);
      this.sliderValue = info.sec + 1;
    },
      error => console.log(error),
      () => this.sliderDisabled = true);

  }

  zip() {
    Observable.range(1, 10) // source
      .zip(Observable.interval(3000), (left, right) =>
        `item ${left}, at ${right * 3000}`
      )
      .subscribe(createSubscriber('zip'));
  }

  withLatestFrom() {
    Observable.interval(1000) // emits only on source emit
      .withLatestFrom(Observable.interval(500))
      .subscribe(createSubscriber('with-latest-from'));
  }

  withLatestFromExample() {
    const currentUser$ = new BehaviorSubject({ isLoggedIn: false });

    Observable.interval(1000)
      .withLatestFrom(currentUser$)
      .filter(([i, user]) => user.isLoggedIn)
      .subscribe(createSubscriber('with-latest-from-example'));

    setTimeout(function () {
      currentUser$.next({ isLoggedIn: true });
    }, 4000);
  }

  combineLatest() {
    Observable.interval(1000) // emits on both sources
      .withLatestFrom(Observable.interval(500))
      .subscribe(createSubscriber('combine-latest'));
  }

  combineLatestSelect() {
    Observable.interval(1000)
      .withLatestFrom(Observable.interval(500),
      (left, right) => left * right)
      .subscribe(createSubscriber('combine-latest-select'));
  }

}
