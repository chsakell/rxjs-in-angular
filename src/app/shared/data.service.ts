import { Observable } from 'rxjs';
import { MOCK_USERS, MOCK_POSTS } from './data';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

    constructor() { }

    getUsers(): Observable<any> {

        return Observable.from(MOCK_USERS);

    }

    getPosts(): Observable<any> {

        return Observable.from(MOCK_POSTS);
    }

    wsOnUser(): Observable<any> {
        return Observable
            .interval(1000).take(10)
            .map(i => MOCK_USERS[i]);
    }
}
