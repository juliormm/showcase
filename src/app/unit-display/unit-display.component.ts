import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
    selector: 'app-unit-display',
    templateUrl: './unit-display.component.html',
    styleUrls: ['./unit-display.component.scss']
})
export class UnitDisplayComponent implements OnInit {
    public title: string;
    public list: any[] = [];

    constructor(public bsModalRef: BsModalRef) { }

    ngOnInit() {
    }

}
