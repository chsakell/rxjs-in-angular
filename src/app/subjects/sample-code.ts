export const sampleCode = `
  <pre>
    <code class="typescript highlight">
        userStatus$ = new BehaviorSubject({ user: { isLoggedIn: false, name: '' } });
        isLoggedIn$ = this.userStatus$.map((u: any) => u.user);

        trackUser() {
          this.isLoggedIn$.subscribe(status => console.log(status));
        }

        signin(username, password) {
          this.userStatus$.next({ user: { isLoggedIn: true, name: username } });
        }

        signout() {
          this.userStatus$.next({ user: { isLoggedIn: false, name: '' } });
        }
    </code>
</pre>
        `;
