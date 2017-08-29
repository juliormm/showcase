import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface IUnit {
    creatives_id: number;
    custom_name: string;
    name: string;
    size: string;
    type: string;
    url_params: string;
    url_path: string;
    sub_type: string;
    safe_mobile: string;
    extension?: string;
    active: boolean;
    state: string;
}


export interface ICampaign {
    campaign_id: number;
    campaign_name: string;
    client_name: string;
    cover: string;
    creatives: IUnit[];
    description: string;
    showcase_rev: number;
    active: boolean;
}

@Injectable()
export class UnitDataService {

    private dataList: ICampaign[];
    private rmCache: ICampaign[];
    private stdCache: ICampaign[];
    private statCache: ICampaign[];
    private activeCampaign: ICampaign;

    private closeModalSub = new Subject();
    $closeModal = this.closeModalSub.asObservable();

    started: Date;

    constructor() {
        this.started = new Date();
        console.log(this.started);
    }

    closeModal() {
        this.closeModalSub.next({});
        // this.
    }

    resetAll() {
        this.dataList = this.dataList.map(elm => {
            elm.active = false;
            elm.creatives.forEach(crv => {
                crv.active = false;
                crv.state = 'right';
            });
            return elm;
        });
    }

    setDataList(data: ICampaign[]) {
        this.dataList = data.map(elm => {
            elm.active = false;
            elm.creatives.forEach(crv => {
                crv.active = false;
                crv.state = 'right';
            });
            return elm;
        });
        this.dataList = data;
        console.log(this.dataList);
    }

    setActiveCampaign(index) {
        this.activeCampaign = this.dataList[index];
    }

    getActiveCampaign() {
        return this.activeCampaign;
    }

    getAll() {
        return this.dataList;
    }

    getRichMedia() {
        if (!this.rmCache) {
            this.rmCache = this.getType('RichMedia');
        }
        return this.rmCache;
    }

    getStandard() {
        if (!this.stdCache) {
            this.stdCache = this.getType('Standard');
        }
        return this.stdCache;
    }

    getStatic() {
        if (!this.statCache) {
            this.statCache = this.getType('Static');
        }
        return this.statCache;
    }

    getCampaignByIndex(idx) {
        return this.dataList[idx];
    }

    private getType(type: string): ICampaign[] {
        const newList: ICampaign[] = this.dataList.filter(elm => {
            const crvList = elm.creatives.filter(crv => {
                return crv.type === type;
            });

            return crvList.length > 0;
        });

        return newList;
    }


}
