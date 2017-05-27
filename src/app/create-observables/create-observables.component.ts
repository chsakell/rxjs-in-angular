import { MdDialogConfig, MdDialog } from '@angular/material';
import { DataService } from './../shared/data.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { createInterval$, createSubscriber, take$ } from 'app/shared/utils';
import * as _ from 'lodash';

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

  sideEffet$ = 0;

  @ViewChild('dialog') template: TemplateRef<any>;
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
  };

  ofEmittedVal: any;
  ofEmittedIsArray: boolean;
  fromEmittedVal: any;
  fromEmittedIsArray: boolean;
  fromEmittedIsObject: boolean;

  sampleCode = `
    <pre>
      <code class="typescript highlight">
      // Observer
      const users$ = new Observable(observer => {
        for (let i = 0; i < 4; i++) {
          setTimeout(function () {
            const userId = Math.floor((Math.random() * 9) + 1);
            observer.next(self.ds.getUsersSync(userId));
          }, (i + 1) * 2000);
        }
      });

      users$.subscribe(user => {
        this.users.push(user);
      });

      // Observable.Of
      const mdIcons: [string] = ['home', 'donut_large', 'alarm_on', 'announcement', '3d_rotation', 'copyright',
        'check_circle', 'language'];
      this.icons$ = Observable.of(mdIcons);

      // Observable.timer
      Observable.timer(0, 1000).take(5).subscribe(value => this.seconds--);

      // Observable.Of(array)
      this.ds.getAllPosts().subscribe(val => {
        this.ofEmittedVal = _.cloneDeep(val);
        this.ofEmittedIsArray = val instanceof Array;
      });

      getAllPosts() {
        return Observable.of(MOCK_POSTS);
      }

      // Observable.from(array)
      this.ds.getUsers().subscribe(val => {
        this.fromEmittedVal = val;
        this.fromEmittedIsArray = val instanceof Array;
        this.fromEmittedIsObject = val instanceof Object;
      });

      getUsers(): Observable<any> {
        return Observable.from(MOCK_USERS);
      }

      </code>
  </pre>
        `;
  constructor(public dialog: MdDialog, private ds: DataService) { }

  ngOnInit() {
    this.fromScratch();
    this.of();
    this.runTimer();
    this.openTemplate();
    this.ofArray();
    this.from();
  }

  fromScratch() {
    const self = this;
    this.users = [];
    const users$ = new Observable(observer => {
      for (let i = 0; i < 4; i++) {
        setTimeout(function () {
          const userId = Math.floor((Math.random() * 9) + 1);
          observer.next(self.ds.getUsersSync(userId));
        }, (i + 1) * 2000);
      }
    });

    users$.subscribe(user => {
      this.users.push(user);
    });
  }

  of() {
    const mdIcons: [string] = ['home', 'donut_large', 'alarm_on', 'announcement', '3d_rotation', 'copyright', 'check_circle', 'language'];
    this.icons$ = Observable.of(mdIcons);
  }

  ofArray() {
    this.ds.getAllPosts().subscribe(val => {
      this.ofEmittedVal = _.cloneDeep(val);
      this.ofEmittedIsArray = val instanceof Array;
    });
  }

  from() {
    this.ds.getUsers().subscribe(val => {
      this.fromEmittedVal = val;
      this.fromEmittedIsArray = val instanceof Array;
      this.fromEmittedIsObject = val instanceof Object;
    });
  }

  runTimer() {
    Observable.timer(0, 1000).take(5).subscribe(value => this.seconds--);
  }

  openTemplate() {
    Observable.interval(5000).take(1).subscribe(() =>
      this.dialog.open(this.template, this.config)
    );
  }

  randomize() {
    this.fromScratch();
  }
}
