import { SuperheroUiPage } from './app.po';

describe('superhero-ui App', function() {
  let page: SuperheroUiPage;

  beforeEach(() => {
    page = new SuperheroUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('superhero-ui works!');
  });
});
