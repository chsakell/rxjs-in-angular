export const sampleCode = `
  <pre>
    <code class="typescript highlight">
    this.ds.getUsers()
      .mergeMap(user => Observable.of(user.company))
      .subscribe(company => this.companies.push(company));

    // getUsers()
    getUsers(): Observable<any> {
        return Observable.from(MOCK_USERS);
    }

    // MOCK_USERS
    const MOCK_USERS = [
    {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
                lat: '-37.3159',
                lng: '81.1496'
            }
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets'
        }
    },
    //...
    </code>
</pre>
        `;
