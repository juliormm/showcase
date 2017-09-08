import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing';
import { ApiService } from './api.service';
import { LoadingService } from './loading.service';
import { UnitDataService } from './unit-data.service';


import { AppComponent } from './app.component';
import { HomeGridComponent } from './home-grid/home-grid.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { UnitDisplayComponent } from './unit-display/unit-display.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { PreviewAdComponent } from './preview-ad/preview-ad.component';

import { CreativesByTypePipe } from './creatives-by-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeGridComponent,
    MenuHeaderComponent,
    UnitDisplayComponent,
    LoadingScreenComponent,
    PreviewAdComponent,
    CreativesByTypePipe
  ],
  imports: [
    CommonModule, FormsModule, HttpModule, BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  entryComponents: [UnitDisplayComponent],
  providers: [ApiService, LoadingService, UnitDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
