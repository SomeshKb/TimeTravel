import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PastPlayerComponent } from './past-player/past-player.component';
import { PresentPlayerComponent } from './present-player/present-player.component';
import { FuturePlayerComponent } from './future-player/future-player.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "past", component: PastPlayerComponent },
  { path: "present", component: PresentPlayerComponent },
  { path: "future", component: FuturePlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
