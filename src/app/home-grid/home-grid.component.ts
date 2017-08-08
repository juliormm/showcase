import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-home-grid',
    templateUrl: './home-grid.component.html',
    styleUrls: ['./home-grid.component.scss']
})
export class HomeGridComponent implements OnInit {

    gridData;
    constructor(private _api: ApiService) { }

    ngOnInit() {
        this._api.getData('api/showcase/grid').subscribe(data => {
            this.gridData = data;
        });
    }

}
