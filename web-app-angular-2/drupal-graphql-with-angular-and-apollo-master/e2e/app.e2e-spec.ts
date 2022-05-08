import { VetkeyfrontPage } from './app.po';

describe('vetkeyfront App', () => {
  let page: VetkeyfrontPage;

  beforeEach(() => {
    page = new VetkeyfrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
