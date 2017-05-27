import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-reduce',
  templateUrl: './reduce.component.html',
  styleUrls: ['./reduce.component.css']
})
export class ReduceComponent implements OnInit {

  products: any[] = [];

  sampleCode = `
  <pre>
    <code class="typescript highlight">
      this.ds.getProducts()
        .reduce((acc, value) => {
          if (acc.price < value.price) {
            return acc;
          } else {
            return value;
          }
        }).subscribe(selected =>
          _.find(this.products, p => p.id === selected.id).selected = true
        );
    </code>
</pre>
        `;

  constructor(private ds: DataService) { }

  ngOnInit() {
    this.initProducts();
    this.getBestPrice();
  }

  initProducts() {
    this.ds.getProducts().subscribe(product => this.products.push(product));
  }

  getBestPrice() {
    this.ds.getProducts()
      .reduce((acc, value) => {
        if (acc.price < value.price) {
          return acc;
        } else {
          return value;
        }
      }).subscribe(selected =>
        _.find(this.products, p => p.id === selected.id).selected = true
      );
  }

}
