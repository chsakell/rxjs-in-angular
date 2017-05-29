export const sampleCode = `
  <pre>
    <code class="typescript highlight">
    sliderValue = 0;
    numbersSubject$: Subject<number> = new Subject<number>();
    latestNumbers: number[] = [];
    buttons: number[] = [];
    total = 0;

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
    </code>
</pre>
        `;
