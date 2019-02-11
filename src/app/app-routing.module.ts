import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { MileDetailComponent } from './component/mile-detail/mile-detail.component';
import { ElevationProfileComponent } from './component/elevation-profile/elevation-profile.component';

// resolvers
import { TrailResolverService } from './service/trail-resolver.service';

const routes: Routes = [
  {
    path: "elevation-profile",
    component: ElevationProfileComponent,
    resolve: {
      data: TrailResolverService
    }
  },
  {
    path: "detail/:id",
    component: MileDetailComponent,
    resolve: {
      data: TrailResolverService
    }
  },
  {
    path: "",
    redirectTo: "elevation-profile",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
