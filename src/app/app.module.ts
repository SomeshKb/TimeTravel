import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeTravelPlayerComponent } from './time-travel-player/time-travel-player.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { MediaPlayerComponent } from './media-player/media-player.component';
import { PastPlayerComponent } from './past-player/past-player.component';
import { FuturePlayerComponent } from './future-player/future-player.component';
import { PresentPlayerComponent } from './present-player/present-player.component';
import { HomeComponent } from './home/home.component';
import { SceneService } from './scene.service';


@NgModule({
  declarations: [
    AppComponent,
    TimeTravelPlayerComponent,
    MediaPlayerComponent,
    PastPlayerComponent,
    FuturePlayerComponent,
    PresentPlayerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [SceneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
