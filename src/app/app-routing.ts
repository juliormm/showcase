import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGridComponent } from './home-grid/home-grid.component';
import { IntroResolver } from './intro-resolver';


const appRoutes: Routes = [
    { path: 'grid', component: HomeGridComponent, resolve: { fullLoad: IntroResolver } },
    { path: '', pathMatch: 'full', redirectTo: '/grid' }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    providers: [IntroResolver],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
