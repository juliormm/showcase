import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
	<router-outlet></router-outlet>
	<app-loading></app-loading>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
