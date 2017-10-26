import { Observable } from 'rxjs/Observable';
import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { sampleCode } from './sample-code';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.css']
})
export class MergeMapComponent implements OnInit {

  companies: any[] = [];
  sampleCode = sampleCode;

  constructor(public ds: DataService) { }

  ngOnInit() {
    this.ds.getUsers()
      .mergeMap(user => Observable.of(user.company))
      .subscribe(company => this.companies.push(company));
  }

}
