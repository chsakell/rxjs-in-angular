import { createSubscriber } from 'app/shared/utils';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.do();
    // this.finally();
    // this.filter();
    // this.startWith();
    // this.merge();
    // this.mergeMulti();
    // this.concat();
    // this.concatInterval();
    // this.concatMulti();
    // this.mergeMap();
    // this.mergeMapFrom();
    // this.reduce();
    // this.scan();
    // this.scanLast();
    // this.buffer();
    // this.bufferTime();
    // this.bufferObservable();
    // this.collectTillStop();
    // this.toArray();
    // this.firstLastTakeSkip();
    // this.skipTakeWhile();
    // this.skipTakeUntil();
    // this.arrayZipTest();

    /*
    const array = this.arrayMap([1, 2, 4], a => a * a);
    console.log(array);

    const albums = [
      { title: 'Album 1', tracks: [{ id: 1, title: 'Track 1' }, { id: 2, title: 'Track 2' }] },
      { title: 'Album 2', tracks: [{ id: 1, title: 'Track 3' }, { id: 2, title: 'Track 4' }] }
    ];
    const tracks = this.arrayMergeMap(albums, a => a.tracks);
    console.log(tracks);

    const values = [1, 2, 4, 5, 6];
    console.log(this.arrayReduce(values, (acc, i) => acc + i, 0));
    const max = this.arrayReduce(
      values,
      function (acc, value) {
        if (value > acc) {
          return value;
        }
        // return Math.max(acc, value);
      }, 0);

    console.log(max);
    */

  }

  do() {
    Observable.range(1, 10)
      .do(a => console.log(`From do ${a}`))
      .map(a => a * a)
      .subscribe(createSubscriber('do'));
  }

  finally() {
    Observable.range(1, 10)
      .finally(() => console.log(`Finally!!`))
      .subscribe(createSubscriber('finally'));
  }

  startWith() {
    Observable.interval(1000)
      .startWith(-4)
      .subscribe(createSubscriber('interval'));
  }

  filter() {
    Observable.range(1, 10)
      .filter(a => a < 5 || a > 7)
      .subscribe(createSubscriber('filter'));
  }

  merge() {
    Observable.interval(1000)
      .merge(Observable.interval(500))
      .take(15)
      .subscribe(createSubscriber('merge.one'))
  }

  mergeMulti() {
    Observable.merge(
      Observable.interval(1000).map(a => `${a} seconds`),
      Observable.interval(500).map(a => `${a} half seconds`)
    ).take(10)
      .subscribe(createSubscriber('merge-multi'));
  }

  concat() {
    Observable.range(1, 5)
      .concat(Observable.range(10, 3))
      .subscribe(createSubscriber('concat'));
  }

  concatInterval() {
    // Move on next after the previous completes..
    Observable.interval(1000).take(4)
      .concat(Observable.range(10, 3))
      .subscribe(createSubscriber('concat-interval'));
  }

  concatMulti() {
    Observable.concat(
      Observable.interval(1000).map(a => `${a} seconds`).take(3),
      Observable.interval(500).map(a => `${a} half seconds`).take(5)
    ).subscribe(createSubscriber('concat-multi'));
  }

  arrayMap(array, projection) {
    const returnArray = [];
    for (const item of array) {
      const projected = projection(item);
      returnArray.push(projected);
    }

    return returnArray;
  }

  arrayMergeMap(array, projection) {
    const returnArray = [];
    for (const item of array) {
      const projectedArray = projection(item);
      for (const projected of projectedArray) {
        returnArray.push(projected);
      }
    }

    return returnArray;
  }

  mergeMap() {
    Observable.range(2, 3)
      .mergeMap((i => Observable.timer(i * 2000).map(() => `After ${i * 2} seconds`)))
      .subscribe(createSubscriber('mergeMap'));
  }

  mergeMapFrom() {
    // mergeMap will wait for the promise to resolve
    Observable.fromPromise(this.getTracks())
      .mergeMap((tracks: any) => Observable.from(tracks))
      .subscribe(createSubscriber('tracks'));
  }

  getTracks() {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(['Track 1', 'Track 2', 'Track 3']);
      }, 1000);
    });
  }

  arrayReduce(array, accumulator, startValue) {
    let value = startValue;
    for (const item of array) {
      value = accumulator(value, item);
    }

    return value;
  }

  reduce() {
    // must complete before emit
    Observable.range(1, 10)
      .reduce((acc, value) => acc + value)
      .subscribe(createSubscriber('reduce'));
  }

  scan() {
    // produces values without waiting to complete
    Observable.range(1, 10)
      .merge(Observable.never())
      .scan<number>((acc, value) => acc + value)
      .subscribe(createSubscriber('scan'));
  }

  scanLast() {
    Observable.range(1, 10)
      .map(i => i * i)
      .scan(([last], current) => [current, last], [])
      .subscribe(createSubscriber('scan-last'));
  }

  buffer() {
    Observable.range(1, 100)
      .bufferCount(25)
      .subscribe(createSubscriber('buffer'));
  }

  bufferTime() {
    Observable.interval(200)
      .bufferTime(2000)
      .subscribe(createSubscriber('buffer-time'));
  }

  bufferObservable() {
    Observable.interval(500)
      .buffer(Observable.interval(2000))
      .subscribe(createSubscriber('buffer-observable'));
  }

  collectTillStop() {
    const stopSubject$ = new Subject();
    Observable.interval(500)
      .buffer(stopSubject$)
      .subscribe(createSubscriber('collect'));

    setTimeout(function () {
      stopSubject$.next();
      stopSubject$.complete();
    }, 3000);
  }

  toArray() {
    Observable.range(1, 10)
      .toArray()
      .subscribe(createSubscriber('to-array'));
  }

  firstLastTakeSkip() {
    const simple$ = new Observable(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.next(5);
      observer.complete();
    });

    simple$.first().subscribe(createSubscriber('first'));
    simple$.last().subscribe(createSubscriber('last'));
    simple$.take(2).subscribe(createSubscriber('take'));
    simple$.skip(2).subscribe(createSubscriber('skip'));
    simple$
      .skip(2)
      .take(3)
      .subscribe(createSubscriber('skip-take'));
  }

  skipTakeWhile() {
    Observable.interval(500)
      .skipWhile(i => i < 4)
      .takeWhile(i => i < 10)
      .subscribe(createSubscriber('skip-take-while'));
  }

  skipTakeUntil() {
    Observable.interval(500)
      .skipUntil(Observable.timer(2000))
      .takeUntil(Observable.timer(4000))
      .subscribe(createSubscriber('skip-take-until'));
  }

  

}
