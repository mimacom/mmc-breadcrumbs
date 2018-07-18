import {Injectable, Injector} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterState} from '@angular/router';
import {Observable, BehaviorSubject, Subscription, of} from 'rxjs';
import {IBreadcrumb, stringFormat, wrapIntoObservable} from '../mmc-breadcrumbs.shared';
import {MmcBreadcrumbsConfig} from './mmc-breadcrumbs.config';
import {MmcBreadcrumbsResolver} from './mmc-breadcrumbs.resolver';
import {filter, flatMap, distinct, toArray, first, concat} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MmcBreadcrumbsService {

  private _breadcrumbs = new BehaviorSubject<IBreadcrumb[]>([]);
  private _defaultResolver = new MmcBreadcrumbsResolver();

  constructor(private _router: Router, route: ActivatedRoute, private _config: MmcBreadcrumbsConfig, private _injector: Injector) {

    this._router.events
      .pipe(filter((x) => x instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        const currentRoot = _router.routerState.snapshot.root;

        // Observable.of(this._config.prefixCrumbs)
        this._resolveCrumbs(currentRoot).pipe(
          flatMap((x) => x),
          distinct((x) => x.text),
          toArray(),
          flatMap((x) => {
            if (this._config.postProcess) {
              const y = this._config.postProcess(x);
              return wrapIntoObservable<IBreadcrumb[]>(y).pipe(first());
            } else {
              return of(x);
            }
          }))
          .subscribe((x) => {
            this._breadcrumbs.next(x);
          });
      });
  }

  get crumbs$(): Observable<IBreadcrumb[]> {
    return this._breadcrumbs;
  }

  private _resolveCrumbs(route: ActivatedRouteSnapshot): Observable<IBreadcrumb[]> {

    let crumbs$: Observable<IBreadcrumb[]>;

    const data = route.routeConfig &&
      route.routeConfig.data;

    if (data && data.breadcrumbs) {

      let resolver: MmcBreadcrumbsResolver;

      if (data.breadcrumbs.prototype instanceof MmcBreadcrumbsResolver) {
        resolver = this._injector.get(data.breadcrumbs);
      } else {
        resolver = this._defaultResolver;
      }

      const result = resolver.resolve(route, this._router.routerState.snapshot);
      crumbs$ = wrapIntoObservable<IBreadcrumb[]>(result).pipe(first());

    } else {
      crumbs$ = of([]);
    }

    if (route.firstChild) {
      crumbs$ = crumbs$.pipe(concat(this._resolveCrumbs(route.firstChild)));
    }

    return crumbs$;
  }
}
