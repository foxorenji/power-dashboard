import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./pages/landing/landing.component";
import {MainDashboardComponent} from "./pages/main-dashboard/main-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'home',
    component: MainDashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
