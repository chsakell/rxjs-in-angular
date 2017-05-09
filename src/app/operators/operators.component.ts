import { createSubscriber } from 'app/shared/utils';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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

    /*
    const array = this.arrayMap([1, 2, 4], a => a * a);
    console.log(array);

    const albums = [
      { title: 'Album 1', tracks: [{ id: 1, title: 'Track 1' }, { id: 2, title: 'Track 2' }] },
      { title: 'Album 2', tracks: [{ id: 1, title: 'Track 3' }, { id: 2, title: 'Track 4' }] }
    ];
    const tracks = this.arrayMergeMap(albums, a => a.tracks);
    console.log(tracks);
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

}
