export const sampleCode = `
  <pre>
    <code class="typescript highlight">
    enterUser$: Subject<any> = new Subject();
    leaveUser$: Subject<any> = new Subject();

    this.source$ = Observable.merge(
      this.enterUser$.map(user => new UserEvent('Enter', user)),
      this.leaveUser$.map(user => new UserEvent('Leave', user))
    );

    this.source$.subscribe((event) => this.processUser(event));

    // process user
    processUser(event: UserEvent) {

      if (event.type === 'Enter') {
        event.user.color = 'primary';
        console.log(event.user);
        this.users.push(event.user);
      } else {
          const user: any = _.find(this.users, (u: any) => u.id === event.user.id);
          if (user) {
            user.color = 'warn';
          }
      }
    }
    </code>
</pre>
        `;
