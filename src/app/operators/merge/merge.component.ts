import { Observable, Subject } from 'rxjs';
import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit {

  users = [];
  enterUser$: Subject<any> = new Subject();
  leaveUser$: Subject<any> = new Subject();

  source$: Observable<any>;

  constructor(public service: DataService) { }

  ngOnInit() {
    this.source$ = Observable.merge(
      this.enterUser$.map(user => { }),
      this.leaveUser$.map(user => { })
    );

    this.source$.subscribe(this.processUser);

  }

  processUser(event) {
    console.log(event);
  }

}
