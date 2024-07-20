import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {DashboardEffects} from "./store/dashboard.effects";
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { ChartComponent } from './components/chart/chart.component';
import { GridComponent } from './components/grid/grid.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LandingComponent } from './pages/landing/landing.component';
import {ReactiveFormsModule} from "@angular/forms";
import {dataReducer} from "./store/dashboard.reducer";
import {HttpClientModule} from "@angular/common/http";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { MillionPipe } from './pipes/million.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainDashboardComponent,
    ChartComponent,
    GridComponent,
    ToolbarComponent,
    LandingComponent,
    MillionPipe
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ coins: dataReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([DashboardEffects]),
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
