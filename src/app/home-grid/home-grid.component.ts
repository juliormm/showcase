import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { UnitDataService, ICampaign } from '../unit-data.service';
import { LoadingService } from '../loading.service';

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
    activeFilterClass = this._uService.ALL;

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
            // console.log(this.gridData);
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

    openModalWithComponent(data: ICampaign) {

        this._uService.setActiveCampaign(data, this.activeFilterClass);
        this.bsModalRef = this.modalService.show(UnitDisplayComponent, this.modalConfig);
        // this.state = 'in';
        // this.bsModalRef.content.campaign = this._uService.getCampaignByIndex(index);
        // setTimeout(() => {
        //     list.push('PROFIT!!!');
        // }, 2000);
    }

    filterType(type) {
        if (type === this._uService.RICHMEDIA.toLowerCase()) {
            this.gridData = this._uService.getRichMedia();
        } else if (type === this._uService.STADNARD.toLowerCase()) {
            this.gridData = this._uService.getStandard();
        } else if (type === this._uService.STATIC.toLowerCase()) {
            this.gridData = this._uService.getStatic();
        } else {
            this.gridData = this._uService.getAll();
        }
        this.activeFilterClass = type.toLowerCase();
    }




}
