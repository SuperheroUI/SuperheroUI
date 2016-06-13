export class SuperheroUiPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('superhero-ui-app h1')).getText();
  }
}
