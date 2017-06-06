import { sampleCode } from './sample-code';
import { Observable, Subject } from 'rxjs';
import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.css']
})
export class SwitchMapComponent implements OnInit {

  sampleCode = sampleCode;

  sliderValue: 0;
  selectedUser$: Subject<any> = new Subject();
  userPosts: { [key: number]: any[] } = {};
  loadedPosts: any[] = [];
  loading = false;

  constructor(public ds: DataService) { }

  ngOnInit() {

    this.selectedUser$
      .do(user => console.log(user))
      .map(u => u.id)
      .switchMap((id) => this.loadUserPosts(id))
      .subscribe((records) => {
        console.log(records);
        this.loading = false;
        this.loadedPosts = [...records];
      });
  }

  loadUserPosts = (userId: number): Observable<any> => {
    const self = this;
    self.sliderValue = 0;
    this.loading = true;

    return Observable.timer(0, 1000).take(10)
      .do(item => self.sliderValue++)
      .filter(item => item === 9)
      .switchMap(() => self.ds.getUserPosts(userId));
  }

}
