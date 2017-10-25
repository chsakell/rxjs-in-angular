import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSlider } from '@angular/material'
import * as _ from 'lodash';
import { sampleCodeZip, sampleCodeCombine } from 'app/operators/latest/sample-code';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {

  // Example 1
  sliderValue = 0;
  sliderDisabled = false;
  users: any[] = [];

  // Example 2
  selectedUser$ = new Subject();
  selectedOption$ = new Subject();
  selectedUser: any;
  selectedUserPosts: any[] = [];
  operator = 'withLatestFrom';
  tooltip = this.operator + ' observable';

  sampleCodeZip = sampleCodeZip;

  sampleCodeCombine = sampleCodeCombine;

  constructor(public ds: DataService) { }

  ngOnInit() {
    this.startWithLatestFrom();
    this.startCombineLatest();
  }

  startZipping(seconds) {
    this.users = [];
    this.sliderValue = 0;
    this.sliderDisabled = false;

    const timer$ = Observable.timer(1000, 1000).take(seconds);

    this.ds.wsOnUser(1000, 10).zip(timer$, (user, sec) => {
      return { user, sec };
    }
    ).subscribe(info => {
      this.users.push(info.user);
      this.sliderValue = info.sec + 1;
    },
      error => console.log(error),
      () => this.sliderDisabled = true);

  }

  startWithLatestFrom() {
    const self = this;
    this.selectedOption$
      .withLatestFrom(this.selectedUser$)
      .subscribe(([option, user]) => {
        if (self.operator === 'withLatestFrom') {
          console.log('withLatestFrom');
          this.selectedUser = user;
          this.selectedUserPosts = _.filter(this.ds.getPostsSync(), (p: any) => p.userId === this.selectedUser.id);
        }
      });
  }

  startCombineLatest() {
    const self = this;
    this.selectedOption$
      .combineLatest(this.selectedUser$)
      .subscribe(([option, user]) => {
        if (self.operator === 'combineLatest') {
          console.log('combineLatest');
          this.selectedUser = user;
          this.selectedUserPosts = _.filter(this.ds.getPostsSync(), (p: any) => p.userId === this.selectedUser.id);
        }
      });
  }

  nextOption(option) {
    this.selectedOption$.next(option);
  }

  nextUser(user) {
    this.selectedUser$.next(user);
  }

  switchOperator(operator) {
    this.tooltip = this.operator + ' observable';
  }

}
