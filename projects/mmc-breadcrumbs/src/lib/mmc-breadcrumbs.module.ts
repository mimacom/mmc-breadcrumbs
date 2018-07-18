import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MmcBreadcrumbsService} from './service/mmc-breadcrumbs.service';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {MmcBreadcrumbsComponent} from './component/mmc-breadcrumbs.component';
import {McBreadcrumbsConfig} from './service/mmc-breadcrumbs.config';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [MmcBreadcrumbsComponent],
  exports: [MmcBreadcrumbsComponent]
})
export class MmcBreadcrumbsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MmcBreadcrumbsModule,
      providers: [
        MmcBreadcrumbsService,
        McBreadcrumbsConfig
      ]
    };
  }
}
