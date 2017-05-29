import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { sampleCode } from './sample-code';

@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.css']
})
export class BufferComponent implements OnInit {

  sampleCode = sampleCode;

  sliderValue = 0;
  numbersSubject$: Subject<number> = new Subject<number>();
  latestNumbers: number[] = [];
  buttons: number[] = [];
  total = 0;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.buttons.push(i);
    }

    this.bufferCount();
  }

  addNumber(number) {
    this.sliderValue++;
    this.numbersSubject$.next(number);
  }

  bufferCount() {
    this.numbersSubject$.bufferCount(5).subscribe((array: number[]) => {
      console.log(array);
      this.total = 0;
      this.sliderValue = 0;
      this.latestNumbers = [];
      array.forEach(number => {
        this.total += number;
        this.latestNumbers.push(number);
      });
    });
  }

}
