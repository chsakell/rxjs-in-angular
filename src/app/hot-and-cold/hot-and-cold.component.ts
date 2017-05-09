import { createSubscriber } from 'app/shared/utils';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hot-and-cold',
  templateUrl: './hot-and-cold.component.html',
  styleUrls: ['./hot-and-cold.component.css']
})
export class HotAndColdComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.test_01();
    // this.test_02();
    // this.test_03();
    // this.test_04();
    // this.test_05();
  }

  test_01() {
    const interval$ = Observable.interval(1000)
      .take(10)
      .publish();

    // start executing..
    interval$.connect();

    setTimeout(function () {
      interval$.subscribe(createSubscriber('one'));
    }, 500);

    setTimeout(function () {
      interval$.subscribe(createSubscriber('two'));
    }, 4000);
  }

  test_02() {
    const socket = { on: () => { } };

    const chatMessages$ = new Observable(observer => {
      console.log('subscribed');
      observer.next('hello world');
    }).publish();

    chatMessages$.connect();

    chatMessages$.subscribe(createSubscriber('one'));
    chatMessages$.subscribe(createSubscriber('two'));
  }

  test_03() {
    const simple$ = new Observable(observer => {
      observer.next('one');
      observer.next('two');
      observer.complete();
    });

    const published$ = simple$.publishLast();

    published$.subscribe(createSubscriber('one'));
    published$.connect();
    published$.subscribe(createSubscriber('two'));
  }

  test_04() {
    const simple$ = new Observable(observer => {
      observer.next('one');
      observer.next('two');
      observer.next('three');

      return () => console.log('Disposed');
    });

    const published$ = simple$.publishReplay(2);

    const sub1 = published$.subscribe(createSubscriber('one'));
    const connection = published$.connect();
    const sub2 = published$.subscribe(createSubscriber('two'));

    sub1.unsubscribe();
    sub2.unsubscribe();
    connection.unsubscribe();
  }

  test_05() {
    const simple$ = new Observable(observer => {
      observer.next('one');
      observer.next('two');
      observer.next('three');

      return () => console.log('Disposed');
    });

    // connect on the first subscribe
    // disconnect on the last unsubscribe
    const published$ = simple$.publishReplay(2).refCount();

    const sub1 = published$.subscribe(createSubscriber('one'));

    const sub2 = published$.subscribe(createSubscriber('two'));

    sub1.unsubscribe();
    sub2.unsubscribe();

  }

}
