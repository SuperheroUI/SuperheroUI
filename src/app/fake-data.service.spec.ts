import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { FakeDataService } from './fake-data.service';

describe('FakeData Service', () => {
  beforeEachProviders(() => [FakeDataService]);

  it('should ...',
      inject([FakeDataService], (service: FakeDataService) => {
    expect(service).toBeTruthy();
  }));
});
