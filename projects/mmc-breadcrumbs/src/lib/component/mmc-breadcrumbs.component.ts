import {Observable, Subscription} from 'rxjs';
import {MmcBreadcrumbsService} from '../service/mmc-breadcrumbs.service';

import {Component, OnDestroy, OnInit} from '@angular/core';
import {IBreadcrumb} from '../mmc-breadcrumbs.shared';

@Component({
  selector: 'mmc-breadcrumbs',
  templateUrl: './mmc-breadcrumbs.component.html'
})
export class MmcBreadcrumbsComponent implements OnInit, OnDestroy {
  constructor(public service: MmcBreadcrumbsService) {
  }

  crumbs: IBreadcrumb[];

  subscriptions = new Array<Subscription>();

  public ngOnInit(): void {

    const s = this.service.crumbs$.subscribe((x) => {
      this.crumbs = x;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

}
