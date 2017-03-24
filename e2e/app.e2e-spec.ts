import { MultiplePage } from './app.po';

describe('multiple App', () => {
  let page: MultiplePage;

  beforeEach(() => {
    page = new MultiplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
