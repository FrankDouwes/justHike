import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { MileDetailComponent } from './component/mile-detail/mile-detail.component';
import { ElevationProfileComponent } from './component/elevation-profile/elevation-profile.component';

// resolvers
import {SequentialResolverService} from './service/sequential-resolver.service';
import {AdminComponent} from './component/admin/admin.component';


// TODO: temp, iOS navigation error...
export function handleErrors(error):void {
  console.log('app routing error');
}

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
  {
    path: 'admin',
    component: AdminComponent,
    resolve: {
      data: SequentialResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'ignore', useHash: true, enableTracing: false, errorHandler: handleErrors})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

  // STARTUP

  constructor() {}
}
