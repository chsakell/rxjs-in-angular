import { sampleCode } from './../create-observables/sample-code';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AsyncSubject } from 'rxjs/AsyncSubject';

import { MatFormField } from '@angular/material';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  userStatus$ = new BehaviorSubject({ user: { isLoggedIn: false, name: '' } });
  isLoggedIn$ = this.userStatus$.map((u: any) => u.user);

  sampleCode = sampleCode;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.trackUser();
  }

  trackUser() {
    this.isLoggedIn$.subscribe(status => console.log(status));
  }

  signin(username, password) {
    this.userStatus$.next({ user: { isLoggedIn: true, name: username } });
  }

  signout() {
    this.userStatus$.next({ user: { isLoggedIn: false, name: '' } });
  }

}
