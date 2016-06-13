import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { SuperheroUiAppComponent } from '../app/superhero-ui.component';

beforeEachProviders(() => [SuperheroUiAppComponent]);

describe('App: SuperheroUi', () => {
  it('should create the app',
      inject([SuperheroUiAppComponent], (app: SuperheroUiAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'superhero-ui works!\'',
      inject([SuperheroUiAppComponent], (app: SuperheroUiAppComponent) => {
    expect(app.title).toEqual('superhero-ui works!');
  }));
});
