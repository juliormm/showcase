import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { UnitDataService } from '../unit-data.service';
import { LoadingService} from '../loading.service';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { UnitDisplayComponent } from '../unit-display/unit-display.component';



@Component({
    selector: 'app-home-grid',
    templateUrl: './home-grid.component.html',
    styleUrls: ['./home-grid.component.scss']
})
export class HomeGridComponent implements OnInit {

    gridData;
    bsModalRef: BsModalRef;

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
        });
    }

    openModalWithComponent() {
        const list = ['Open a modal with component', 'Pass your data', 'Do something else', '...'];
        this.bsModalRef = this.modalService.show(UnitDisplayComponent);
        this.bsModalRef.content.title = 'Modal with component';
        this.bsModalRef.content.list = list;
        setTimeout(() => {
            list.push('PROFIT!!!');
        }, 2000);
    }

}
