export const sampleCodeZip = `
  <pre>
    <code class="typescript highlight">
    startZipping(seconds) {
      this.users = [];
      this.sliderValue = 0;
      this.sliderDisabled = false;

      const timer$ = Observable.timer(1000, 1000).take(seconds);

      this.ds.wsOnUser(1000, 10).zip(timer$, (user, sec) => {
        return { user, sec };
      }).subscribe(info => {
          this.users.push(info.user);
          this.sliderValue = info.sec + 1;
        },
        error => console.log(error),
        () => this.sliderDisabled = true);
     }

     // onUser
     wsOnUser(delay, size?: number): Observable<any> {
        return Observable
            .interval(delay).take(size === undefined ? MOCK_USERS.length : size)
            .map(i => MOCK_USERS[i]);
    }
    </code>
</pre>
        `;

export const sampleCodeCombine = `
  <pre>
    <code class="typescript highlight">
    startWithLatestFrom() {
      const self = this;
      this.selectedOption$
        .withLatestFrom(this.selectedUser$)
        .subscribe(([option, user]) => {
          if (self.operator === 'withLatestFrom') {
            console.log('withLatestFrom');
            this.selectedUser = user;
            this.selectedUserPosts = _.filter(this.ds.getPostsSync(), (p: any) => p.userId === this.selectedUser.id);
          }
        });
    }

    startCombineLatest() {
      const self = this;
      this.selectedOption$
        .combineLatest(this.selectedUser$)
        .subscribe(([option, user]) => {
          if (self.operator === 'combineLatest') {
            console.log('combineLatest');
            this.selectedUser = user;
            this.selectedUserPosts = _.filter(this.ds.getPostsSync(), (p: any) => p.userId === this.selectedUser.id);
          }
        });
    }
    </code>
</pre>
        `;