export const sampleCode = `
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

      getProducts() {
        return Observable.from(MOCK_PRODUCTS);
      }
    </code>
</pre>
        `;
