import { Observable } from 'rxjs';

export function createInterval$(time) {
    return new Observable(observer => {
        let index = 0;
        const interval = setInterval(() => {
            console.log(`Generating ${index}`);
            observer.next(index++);
        }, time);

        return () => {
            clearInterval(interval);
        };
    });
}

export function createSubscriber(tag) {
    return {
        next(item) { console.log(`${tag}.next ${item}`); },
        error(error) { console.log(`${tag}.error ${error.stack || error}`); },
        complete() { console.log(`${tag}.complete`); }
    };
}

export function take$(sourceObservable$, amount) {
    return new Observable(observer => {
        let count = 0;

        const subscription = sourceObservable$.subscribe({
            next(item) {
                observer.next(item);
                if (++count >= amount) {
                    observer.complete();
                }
            },
            error(error) { observer.error(error); },
            complete() { observer.complete(); }
        });

        return () => subscription.unsubscribe();
    });
}
