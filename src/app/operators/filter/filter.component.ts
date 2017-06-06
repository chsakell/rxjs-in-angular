import { sampleCode } from './sample-code';
import { Observable, Subscription, Subject } from 'rxjs';
import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  userId: number;
  selectedUser$: Subject<any> = new Subject();
  userPosts: { [key: number]: any[] } = {};
  loadedPosts: any[] = [];
  loading = false;

  sampleCode = sampleCode;

  constructor(public ds: DataService) { }

  ngOnInit() {
    this.selectedUser$
      .do(userId => {
        if (this.userPosts[userId]) {
          this.loadedPosts = [...this.userPosts[userId]];
        }
      })
      .filter(userId => !this.userPosts[userId])
      .subscribe((userId) => {
        this.loading = true;
        this.loadedPosts = [];
        this.ds.getUserPosts(userId, 2000).subscribe((records) => {
          this.loading = false;
          this.userPosts[userId] = records;
          this.loadedPosts = [...records];
        }
        );
      });
  }
}
