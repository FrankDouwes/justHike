import { NgModule } from '@angular/core';
import {Routes, RouterModule, NavigationError, Router, NavigationStart, NavigationEnd} from '@angular/router';

// component
import { MileDetailComponent } from './component/mile-detail/mile-detail.component';
import { ElevationProfileComponent } from './component/elevation-profile/elevation-profile.component';

// resolvers
import {SequentialResolverService} from './service/sequential-resolver.service';
import {AdminComponent} from './component/admin/admin.component';


// export function handleErrors(error: NavigationError):void {
//   console.log('app routing error');
// }

const routes: Routes = [
  {
    path: 'elevation-profile',
    component: ElevationProfileComponent,
    resolve: {
      data: SequentialResolverService
    }
  },
  {
    path: 'detail/:id',
    component: MileDetailComponent,
    resolve: {
      data: SequentialResolverService
    }
  },
  {
    path: '',
    redirectTo: 'elevation-profile',
    pathMatch: 'full'
  },
  // {
  //   path: '*',
  //   redirectTo: 'elevation-profile',
  // },
  {
    path: 'admin',
    component: AdminComponent,
    resolve: {
      data: SequentialResolverService
    }
  }
];


// , errorHandler: handleErrors
@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'ignore', useHash: false, enableTracing: false})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

  // STARTUP

  constructor(private _router: Router) {

    // iOS router error testing
    _router.events.subscribe( (event: any) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }
}
