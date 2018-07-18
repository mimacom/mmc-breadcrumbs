import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmcBreadcrumbsComponent } from './mmc-breadcrumbs.component';

describe('MmcBreadcrumbsComponent', () => {
  let component: MmcBreadcrumbsComponent;
  let fixture: ComponentFixture<MmcBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmcBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmcBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
