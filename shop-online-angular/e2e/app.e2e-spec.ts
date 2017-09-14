import { ShopOnlineAngularPage } from './app.po';

describe('shop-online-angular App', () => {
  let page: ShopOnlineAngularPage;

  beforeEach(() => {
    page = new ShopOnlineAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
