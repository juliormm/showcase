import { Injectable } from '@angular/core';

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
}


export interface ICampaign {
    campaign_id: number;
    campaign_name: string;
    client_name: string;
    cover: string;
    creatives: IUnit[];
    description: string;
    showcase_rev: number;
}

@Injectable()
export class UnitDataService {

    dataList: ICampaign[];
    rmCache: ICampaign[];
    stdCache: ICampaign[];
    statCache: ICampaign[];


    constructor() { }

    setDataList(data: ICampaign[]) {
        this.dataList = data;
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

    private getType(type: string): ICampaign[]  {
        const newList: ICampaign[] = this.dataList.filter(elm => {
            const crvList = elm.creatives.filter(crv => {
                return crv.type === type;
            });

            return crvList.length > 0;
        });

        return newList;
    }


}
