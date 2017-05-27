export const sampleCode = `
  <pre>
    <code class="typescript highlight">
      selectedUser$: Subject<any> = new Subject();
      userPosts: { [key: number]: any[] } = {};
      loadedPosts: any[] = [];
      loading = false;

      this.selectedUser$
      .do(userId => {
        if (this.userPosts[userId]) {
          this.loadedPosts = [...this.userPosts[userId]];
        }
      })
      .filter(userId => !this.userPosts[userId])
      .subscribe((userId) => {
        this.loading = true;
        this.loadedPosts = [];
        this.ds.getUserPosts(userId).subscribe((records) => {
          this.loading = false;
          this.userPosts[userId] = records;
          this.loadedPosts = [...records];
        }
        );
      });

      getUserPosts(userId: number): Observable<any> {
        return Observable.of(_.filter(MOCK_POSTS, p => p.userId === userId)).delay(2000);
      }
    </code>
</pre>
        `;
