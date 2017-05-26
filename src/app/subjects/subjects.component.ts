import { createSubscriber } from 'app/shared/utils';
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

import { HighlightJsService } from 'angular2-highlight-js';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, AfterViewInit {

  userStatus$ = new BehaviorSubject({ user: { isLoggedIn: false, name: '' } });
  isLoggedIn$ = this.userStatus$.map((u: any) => u.user);

  sampleCode = `
  <pre>
    <code class="typescript highlight">
        userStatus$ = new BehaviorSubject({ user: { isLoggedIn: false, name: '' } });
        isLoggedIn$ = this.userStatus$.map((u: any) => u.user);

        trackUser() {
          this.isLoggedIn$.subscribe(status => console.log(status));
        }

        signin(username, password) {
          this.userStatus$.next({ user: { isLoggedIn: true, name: username } });
        }

        signout() {
          this.userStatus$.next({ user: { isLoggedIn: false, name: '' } });
        }
    </code>
</pre>
        `;

  constructor(private el: ElementRef, private service: HighlightJsService) { }

  ngOnInit() {
    this.trackUser();
  }

  ngAfterViewInit() {
    // this.service.highlight(this.el.nativeElement.querySelector('.typescript'), true);
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
