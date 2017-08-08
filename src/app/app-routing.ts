import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGridComponent } from './home-grid/home-grid.component';


const appRoutes: Routes = [
    // { path: '', pathMatch: 'full', component: HomeGridComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
