export const sampleCode = `
    <pre>
      <code class="typescript highlight">
      // Observer
      const users$ = new Observable(observer => {
        for (let i = 0; i < 4; i++) {
          setTimeout(function () {
            const userId = Math.floor((Math.random() * 9) + 1);
            observer.next(self.ds.getUsersSync(userId));
          }, (i + 1) * 2000);
        }
      });

      users$.subscribe(user => {
        this.users.push(user);
      });

      // Observable.Of
      const mdIcons: [string] = ['home', 'donut_large', 'alarm_on', 'announcement', '3d_rotation', 'copyright',
        'check_circle', 'language'];
      this.icons$ = Observable.of(mdIcons);

      // Observable.timer
      Observable.timer(0, 1000).take(5).subscribe(value => this.seconds--);

      // Observable.Of(array)
      this.ds.getAllPosts().subscribe(val => {
        this.ofEmittedVal = _.cloneDeep(val);
        this.ofEmittedIsArray = val instanceof Array;
      });

      getAllPosts() {
        return Observable.of(MOCK_POSTS);
      }

      // Observable.from(array)
      this.ds.getUsers().subscribe(val => {
        this.fromEmittedVal = val;
        this.fromEmittedIsArray = val instanceof Array;
        this.fromEmittedIsObject = val instanceof Object;
      });

      getUsers(): Observable<any> {
        return Observable.from(MOCK_USERS);
      }

      </code>
  </pre>
        `;