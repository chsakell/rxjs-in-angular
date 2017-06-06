export const sampleCode = `
  <pre>
    <code class="typescript highlight">
      sliderValue: 0;
      selectedUser$: Subject<any> = new Subject();
      userPosts: { [key: number]: any[] } = {};
      loadedPosts: any[] = [];
      loading = false;

      ngOnInit() {

        this.selectedUser$
        .do(user => console.log(user))
        .map(u => u.id)
        .switchMap((id) => this.loadUserPosts(id))
        .subscribe((records) => {
            console.log(records);
            this.loading = false;
            this.loadedPosts = [...records];
            });
      }

      loadUserPosts = (userId: number): Observable<any> => {
        const self = this;
        self.sliderValue = 0;
        this.loading = true;

       return Observable.timer(0, 1000).take(10)
        .do(item => self.sliderValue++)
        .filter(item => item === 9)
        .switchMap(() => self.ds.getUserPosts(userId));
      }
    </code>
</pre>
        `;
