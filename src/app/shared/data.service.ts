import { Observable } from 'rxjs';
import { MOCK_USERS, MOCK_POSTS } from './data';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

    constructor() { }

    getUsers(): Observable<any> {

        return Observable.from(MOCK_USERS);

    }

    getPosts(size?: number): Observable<any> {
        return Observable.from(MOCK_POSTS).take(4).toArray();
    }

    // returns an observable of an array
    getAllPosts() {
        return Observable.of(MOCK_POSTS);
    }

    wsOnUser(delay, size?: number): Observable<any> {
        return Observable
            .interval(delay).take(size ? MOCK_USERS.length : size)
            .map(i => MOCK_USERS[i]);
    }
}
