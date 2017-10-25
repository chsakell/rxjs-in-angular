import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from './../../shared/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { sampleCode } from './sample-code';
import * as _ from 'lodash';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit, OnDestroy {

  album: any = {
    title: 'RxJS Album',
    likes: 0,
    dislikes: 0,
    images: []
  };

  likesSubject: Subject<number> = new Subject();
  likesSubscription: Subscription;

  dislikesSubject: Subject<number> = new Subject();
  dislikesSubscription: Subscription;

  sampleCode = sampleCode;

  constructor(private ds: DataService) { }

  ngOnInit() {

    _.cloneDeep(this.ds.getImagesSync()).forEach(image => this.album.images.push(image));

    this.likesSubscription = this.likesSubject
      .scan((acc, value) => acc + value)
      .subscribe(totalLikes => this.album.likes = totalLikes);

    this.dislikesSubscription = this.dislikesSubject
      .scan((acc, value) => acc + value)
      .subscribe(totalDislikes => this.album.dislikes = totalDislikes);

    this.start();
  }

  start() {
    const interval$ = Observable.interval(1000).take(10);

    interval$.subscribe(i => {
      const like: boolean = Math.floor((Math.random() * 2) + 1) === 1;
      const imageId = Math.floor((Math.random() * 3) + 1);
      const rate = Math.floor((Math.random() * 5) + 1);
      const image = _.find(this.album.images, (img: any) => img.id === imageId);

      if (like) {
        image.likes += rate;
        this.likesSubject.next(rate);
      } else {
        image.dislikes += rate;
        this.dislikesSubject.next(rate);
      }
    });
  }

  ngOnDestroy() {
    this.likesSubscription.unsubscribe();
    this.dislikesSubscription.unsubscribe();
  }

}
