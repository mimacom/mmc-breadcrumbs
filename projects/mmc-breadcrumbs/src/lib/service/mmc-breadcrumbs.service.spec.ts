import { TestBed, inject } from '@angular/core/testing';

import { MmcBreadcrumbsService } from './mmc-breadcrumbs.service';

describe('MmcBreadcrumbsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MmcBreadcrumbsService]
    });
  });

  it('should be created', inject([MmcBreadcrumbsService], (service: MmcBreadcrumbsService) => {
    expect(service).toBeTruthy();
  }));
});
