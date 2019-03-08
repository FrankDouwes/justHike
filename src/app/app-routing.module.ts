import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { MileDetailComponent } from './component/mile-detail/mile-detail.component';
import { ElevationProfileComponent } from './component/elevation-profile/elevation-profile.component';
import {PlaygroundComponent} from './component/playground/playground.component';

// resolvers
import {SequentialResolverService} from './service/sequential-resolver.service';

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
  }
  // todo: temp playground component
  // {
  //   path: '',
  //   component: PlaygroundComponent,
  //   resolve: {
  //     data: TrailResolverService
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {

  // STARTUP

  constructor() {}
}
