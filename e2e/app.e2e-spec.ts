import { RxjsInAngularPage } from './app.po';

describe('rxjs-in-angular App', () => {
  let page: RxjsInAngularPage;

  beforeEach(() => {
    page = new RxjsInAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
