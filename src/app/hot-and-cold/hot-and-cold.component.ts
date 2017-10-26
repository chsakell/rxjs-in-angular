import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatSlider } from '@angular/material'
import * as _ from 'lodash';

@Component({
  selector: 'app-hot-and-cold',
  templateUrl: './hot-and-cold.component.html',
  styleUrls: ['./hot-and-cold.component.css']
})
export class HotAndColdComponent implements OnInit {

  @ViewChild('mouseEventCard', { read: ElementRef })
  mouseEventCard: ElementRef;
  mouseEventSubscription$: Subscription;
  mouseMovesEvent$: Observable<MouseEvent>;
  isListening = false;

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

}
