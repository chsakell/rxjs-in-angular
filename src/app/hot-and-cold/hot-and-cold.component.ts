import { createSubscriber } from 'app/shared/utils';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-hot-and-cold',
  templateUrl: './hot-and-cold.component.html',
  styleUrls: ['./hot-and-cold.component.css']
})
export class HotAndColdComponent implements OnInit {

  coldInterval$ = Observable.interval(1000).skip(1).take(10);
  hotInterval$ = Observable.interval(1000).skip(1).take(20).publish();
  hotIntervalSlider: any = {
    sliderValue: 0, sliderDisabled: true, sliderVisible: true
  };

  coldSubscribers: any[] = [
    { index: 1, sliderValue: 0, sliderDisabled: true, sliderVisible: false },
    { index: 2, sliderValue: 0, sliderDisabled: true, sliderVisible: false },
    { index: 3, sliderValue: 0, sliderDisabled: true, sliderVisible: false },
    { index: 4, sliderValue: 0, sliderDisabled: true, sliderVisible: false }
  ];

  hotSubscribers: any[] = [
    { index: 1, sliderValue: 0, sliderDisabled: true, sliderVisible: false },
    { index: 2, sliderValue: 0, sliderDisabled: true, sliderVisible: false },
    { index: 3, sliderValue: 0, sliderDisabled: true, sliderVisible: false },
    { index: 4, sliderValue: 0, sliderDisabled: true, sliderVisible: false }
  ];

  constructor() { }

  ngOnInit() { }

  coldSubscribe(subscriberIndex: number) {
    const subscriber = _.find(this.coldSubscribers, s => s.index === subscriberIndex);
    subscriber.sliderDisabled = false;
    subscriber.sliderVisible = true;

    this.coldInterval$.subscribe(val => {
      subscriber.sliderValue = val;
    },
      error => console.log(error),
      () => {
        subscriber.sliderDisabled = true;
      });
  }

  connect() {
    this.hotInterval$.connect();

    this.hotInterval$.subscribe(val => {
      this.hotIntervalSlider.sliderDisabled = false;
      this.hotIntervalSlider.sliderValue = val;
    },
      error => console.log(error),
      () => this.hotIntervalSlider.sliderDisabled = true)
  }

  hotSubscribe(subscriberIndex: number) {
    const subscriber = _.find(this.hotSubscribers, s => s.index === subscriberIndex);
    subscriber.sliderDisabled = false;
    subscriber.sliderVisible = true;

    this.hotInterval$.subscribe(val => {
      subscriber.sliderValue = val;
    },
      error => console.log(error),
      () => {
        subscriber.sliderDisabled = true;
      });
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
