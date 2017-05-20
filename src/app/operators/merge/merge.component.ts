import { Observable, Subject } from 'rxjs';
import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit {

  // Example 1
  users = [];
  enterUser$: Subject<any> = new Subject();
  leaveUser$: Subject<any> = new Subject();
  sliderValue = 0;
  sliderDisabled = false;
  secondSliderValue = 0;
  secondSliderDisabled = false;

  source$: Observable<any>;

  constructor(public service: DataService) { }

  ngOnInit() {
    this.source$ = Observable.merge(
      this.enterUser$.map(user => new UserEvent('Enter', user)),
      this.leaveUser$.map(user => new UserEvent('Leave', user))
    );

    this.source$.subscribe((event) => this.processUser(event));

    this.fireSubjects();
  }

  processUser(event: UserEvent) {

    if (event.type === 'Enter') {
      event.user.color = 'primary';
      console.log(event.user);
      this.users.push(event.user);
    } else {
      const user: any = _.find(this.users, (u: any) => u.id === event.user.id);
      if (user) {
        user.color = 'warn';
      }
    }
  }

  fireSubjects() {
    this.sliderValue = 0;
    this.sliderDisabled = false;
    this.secondSliderValue = 0;
    this.secondSliderDisabled = false;

    this.service.wsOnUser(1000)
      .subscribe(user => {
        this.enterUser$.next(user);
        this.sliderValue++;
      },
      error => console.log(error),
      () => this.sliderDisabled = true);

    Observable.timer(5000, 1000).take(5)
      .subscribe(() => {
        const userId = Math.floor((Math.random() * 9) + 1);
        const user = this.service.getUsersSync(userId);
        this.leaveUser$.next(user);
        this.secondSliderValue++;
      },
      error => console.log(error),
      () => this.secondSliderDisabled = true);
  }

  restart() {
    this.users = [];
    this.fireSubjects();
  }

}

class UserEvent {
  type: string;
  user: any;

  constructor(type, user) {
    this.type = type;
    this.user = user;
  }
}
