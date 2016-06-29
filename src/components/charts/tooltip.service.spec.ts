import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { TooltipService } from './tooltip.service';

describe('Tooltip Service', () => {
  beforeEachProviders(() => [TooltipService]);

  it('should ...',
      inject([TooltipService], (service: TooltipService) => {
    expect(service).toBeTruthy();
  }));
});
