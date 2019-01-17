import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { MileDetailComponent } from './component/mile-detail/mile-detail.component';
import { ElevationProfileComponent } from './component/elevation-profile/elevation-profile.component';
import { SettingsComponent } from './component/settings/settings.component';

// resolvers
import { TrailResolverService } from './service/trail-resolver.service';

const routes: Routes = [
  // {
  //   path: "settings",
  //   component: SettingsComponent
  // },
  {
    path: "elevation-profile",
    component: ElevationProfileComponent,
    resolve: {
      trailData: TrailResolverService
    }
  },
  {
    path: "detail/:id",
    component: MileDetailComponent,
    resolve: {
      trailData: TrailResolverService
    }
  },
  {
    path: "",
    redirectTo: "elevation-profile",
    pathMatch: "full"
  }
  // { path: '**', component: 'pageNotFoundComponent' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
