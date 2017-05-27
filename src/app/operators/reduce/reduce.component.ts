import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reduce',
  templateUrl: './reduce.component.html',
  styleUrls: ['./reduce.component.css']
})
export class ReduceComponent implements OnInit {

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.ds.getProducts()
      .reduce((acc, value) => {
        if (acc.price < value.price) {
          return acc;
        } else {
          return value;
        }
      }).subscribe(product => console.log(product));
  }

}
