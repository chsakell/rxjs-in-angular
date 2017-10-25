import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  phrases: any[] = [
    [
      // tslint:disable-next-line:max-line-length
      { id: 0, letter: '' }, { id: 1, letter: '' }, { id: 2, letter: '' }, { id: 3, letter: '' }, { id: 4, letter: '' }, { id: 5, letter: '' }, { id: 6, letter: '' }, { id: 7, letter: '' }, { id: 8, letter: '' }, { id: 9, letter: '' }, { id: 10, letter: '' }, { id: 11, letter: '' }, { id: 12, letter: '' }
    ],
    [
      // tslint:disable-next-line:max-line-length
      { id: 0, letter: '' }, { id: 1, letter: '' }, { id: 2, letter: 'R' }, { id: 3, letter: 'e' }, { id: 4, letter: 'a' }, { id: 5, letter: 'c' }, { id: 6, letter: 't' }, { id: 7, letter: 'i' }, { id: 8, letter: 'v' }, { id: 9, letter: 'e' }, { id: 10, letter: 'X' }, { id: 11, letter: '' }, { id: 12, letter: '' }
    ],
    [
      // tslint:disable-next-line:max-line-length
      { id: 0, letter: '' }, { id: 1, letter: '' }, { id: 2, letter: 'O' }, { id: 3, letter: 'p' }, { id: 4, letter: 'e' }, { id: 5, letter: 'r' }, { id: 6, letter: 'a' }, { id: 7, letter: 't' }, { id: 8, letter: 'o' }, { id: 9, letter: 'r' }, { id: 10, letter: 's' }, { id: 11, letter: '' }, { id: 12, letter: '' }
    ],
    [
      // tslint:disable-next-line:max-line-length
      { id: 0, letter: '' }, { id: 1, letter: '' }, { id: 2, letter: '' }, { id: 3, letter: '' }, { id: 4, letter: '' }, { id: 5, letter: '', image: 'reactive.jpg' }, { id: 6, letter: '' }, { id: 7, letter: '', image: 'angular-2.jpg' }, { id: 8, letter: '' }, { id: 9, letter: '' }, { id: 10, letter: '' }, { id: 11, letter: '' }, { id: 12, letter: '' }
    ],
    [
      // tslint:disable-next-line:max-line-length
      { id: 0, letter: '' }, { id: 1, letter: '' }, { id: 2, letter: '' }, { id: 3, letter: 'A' }, { id: 4, letter: 'n' }, { id: 5, letter: 'g' }, { id: 6, letter: 'u' }, { id: 7, letter: 'l' }, { id: 8, letter: 'a' }, { id: 9, letter: 'r' }, { id: 10, letter: '' }, { id: 11, letter: '' }, { id: 12, letter: '' }
    ]
  ];

  constructor() { }

  ngOnInit() {
    this.start();
  }

  start() {
    let counter = 0;
    const interval$ = Observable.interval(100).take(13 * 5).map(i => i % 13);
    const indexSubject: Subject<number> = new BehaviorSubject(counter);

    interval$.withLatestFrom(indexSubject)
      .subscribe(([i, j]) => {
        this.phrases[j][i].highlighted = true;
        if (i === 12) {
          counter++;
          indexSubject.next(counter);
        }
      });

  }

}
