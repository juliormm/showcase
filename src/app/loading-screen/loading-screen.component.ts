import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-loading',
    template: `
    <div id="loader-wrapper" *ngIf="active" [ngClass]="{'fading':transition}">
      <span class="loader"><span class="loader-inner"></span></span>  
    </div>
  `,
    styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent {

    active = true;
    transition = false;
    constructor(private loading: LoadingService) {
        loading.obs$
            .switchMap(value => {
                return Observable.of(value);
            })
            .subscribe(data => {
                if (data.display) {
                    this.transition = data.fade;
                    this.active = data.display;
                } else {
                    this.transition = data.fade;
                    if (this.transition) {
                        setTimeout(() => {
                            this.active = data.display;
                        }, 1000);
                    }

                }

            });
    }
}
