import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { UnitDataService } from '../unit-data.service';
import { LoadingService } from '../loading.service';

import { TweenLite } from 'gsap';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { UnitDisplayComponent } from '../unit-display/unit-display.component';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-home-grid',
    templateUrl: './home-grid.component.html',
    styleUrls: ['./home-grid.component.scss'],
    animations: [
        trigger('gridInOut', [
            state('in', style({
                transform: 'scale(1.2)',
                opacity: '0'
            })),
            state('out', style({
                transform: 'scale(1)',
                opacity: '1'
            })),

            transition('in <=> out', animate('300ms ease-in'))
        ])
    ]
})
export class HomeGridComponent implements OnInit {
    state = 'in';
    gridData;
    bsModalRef: BsModalRef;
    coverURL = environment.SHOWCASE_IMAGES;

    modalConfig = {
        class: 'class',
        keyboard: false,
        backdrop: 'static'
    };

    constructor(
        private _api: ApiService,
        public _uService: UnitDataService,
        private route: ActivatedRoute,
        private modalService: BsModalService,
        private _loading: LoadingService) { }

    ngOnInit() {
        this.route.data.subscribe((data: any) => {
            this._uService.setDataList(data['fullLoad']);
            this.gridData = this._uService.getAll();
            this._loading.hide();
            setTimeout(() => {
                this.state = 'out';
            }, 2000);

        });

        this._uService.$closeModal.subscribe(data => {
            this.bsModalRef.hide();
            this._uService.resetAll();
        });
    }

    openModalWithComponent(index) {

        this._uService.setActiveCampaign(index);
        this.bsModalRef = this.modalService.show(UnitDisplayComponent, this.modalConfig);
        // this.state = 'in';
        // this.bsModalRef.content.campaign = this._uService.getCampaignByIndex(index);
        // setTimeout(() => {
        //     list.push('PROFIT!!!');
        // }, 2000);
    }

    filterType(type) {
        if (type === 'richmedia') {
            this.gridData = this._uService.getRichMedia();
        } else if (type === 'standard') {
            this.gridData = this._uService.getStandard();
        } else if (type === 'static') {
            this.gridData = this._uService.getStatic();
        } else {
            this.gridData = this._uService.getAll();
        }
    }



}
