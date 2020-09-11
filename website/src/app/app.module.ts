import { LazyLoadImageModule } from 'ng-lazyload-image';

import { MaterialModule } from './shared/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/header/header.component';
import { PlantCardComponent } from './modules/plant-card/plant-card.component';
import { PlantListComponent } from './modules/plant-list/plant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PlantPageComponent } from './modules/plant-page/plant-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    PlantCardComponent,
    PlantListComponent,
    PlantPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LazyLoadImageModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
