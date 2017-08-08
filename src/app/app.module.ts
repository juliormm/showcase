import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing';
import { HomeGridComponent } from './home-grid/home-grid.component';
import { ApiService } from './api.service';
import { LoadingService } from './loading.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeGridComponent
  ],
  imports: [
    CommonModule, FormsModule, HttpModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ApiService, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
