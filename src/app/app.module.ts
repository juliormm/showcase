import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing';
import { ApiService } from './api.service';
import { LoadingService } from './loading.service';
import { UnitDataService } from './unit-data.service';


import { AppComponent } from './app.component';
import { HomeGridComponent } from './home-grid/home-grid.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { UnitDisplayComponent } from './unit-display/unit-display.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeGridComponent,
    MenuHeaderComponent,
    UnitDisplayComponent,
    LoadingScreenComponent
  ],
  imports: [
    CommonModule, FormsModule, HttpModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  entryComponents: [UnitDisplayComponent],
  providers: [ApiService, LoadingService, UnitDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
