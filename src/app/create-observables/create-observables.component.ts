import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { createInterval$, createSubscriber, take$ } from 'app/shared/utils';
import { MOCK_USERS } from '../shared/data';

@Component({
  moduleId: module.id,
  selector: 'app-create-observables',
  templateUrl: './create-observables.component.html',
  styleUrls: ['./create-observables.component.css']
})
export class CreateObservablesComponent implements OnInit {
  users: any[] = [];
  icons$: Observable<any>;

  @ViewChild('mouseEventCard', { read: ElementRef })
  mouseEventCard: ElementRef;
  mouseEventSubscription$: Subscription;
  mouseMovesEvent$: Observable<MouseEvent>;
  isListening = false;

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

  constructor() { }

  ngOnInit() {
    this.fromScratch();
    this.of();
    // this.test_01();
    // this.test_02();
    // this.test_03();
    // this.test_04();
    // this.test_05();
  }

  fromScratch() {
    this.users = [];
    const users$ = new Observable(observer => {
      for (let i = 0; i < 4; i++) {
        setTimeout(function () {
          const userId = Math.floor((Math.random() * 9) + 1);
          console.log('user', MOCK_USERS[userId]);
          observer.next(MOCK_USERS[userId]);
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

  randomize() {
    this.fromScratch();
  }

  toggleMouseMoveEvent() {
    this.isListening = !this.isListening;
    if (!this.isListening) {
      this.mouseEventSubscription$.unsubscribe();
      return;
    }
    // The hot observable
    const self = this;
    this.mouseMovesEvent$ = Observable.fromEvent(this.mouseEventCard.nativeElement, 'mousemove');
    const context: CanvasRenderingContext2D = this.mouseEventCard.nativeElement.getContext('2d');
    self.mouseEventSubscription$ = this.mouseMovesEvent$.subscribe(event => {
      const pos = this.getMousePos(this.mouseEventCard.nativeElement, event);
      const posx = pos.x;
      const posy = pos.y;
      console.log(context);
      context.fillStyle = '#3f51b5';
      context.fillRect(posx - 2, posy - 2, 2, 2);

      setTimeout(function () {
        context.fillStyle = 'white';
        context.fillRect(posx - 2, posy - 2, 2, 2);
      }, 2000);
    });
  }


  getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    };
  }

  unsubscribeFromMouseMoveEvent() {
    if (this.mouseEventSubscription$) {

    }
  }

  test_01() {
    const self = this;
    self.simple$.subscribe(
      item => console.log(`one.next ${item}`),
      error => console.log(`one.error ${error}`),
      () => console.log('one.complete')
    );

    setTimeout(function () {
      self.simple$.subscribe({
        next: item => console.log(`two.next ${item}`),
        error(error) {
          console.log(`two.error ${error}`);
        },
        complete: function () {
          console.log('two.complete');
        }
      });
    }, 3000);
  }

  test_02() {
    this.error$.subscribe(
      item => console.log(`one.next ${item}`),
      error => console.log(`one.error ${error.stack}`),
      () => console.log('one.complete')
    );
  }

  test_03() {
    const self = this;
    self.everySecond$.subscribe(createSubscriber('one'));
    setTimeout(function () {
      self.everySecond$.subscribe(createSubscriber('two'));
    }, 3000);
  }

  test_04() {
    const self = this;
    const subscription = self.everySecond$.subscribe(createSubscriber('one'));

    setTimeout(function () {
      subscription.unsubscribe();
    }, 3000);
  }

  test_05() {
    const self = this;
    const firstFiveSeconds$ = take$(self.everySecond$, 5);
    const subscription = firstFiveSeconds$.subscribe(createSubscriber('one'));
  }

}
