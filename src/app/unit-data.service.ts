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

export interface IUnitTypes {
    type: string;
    items:  IUnit[];
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
    types: string[];
}

export interface ICampaignGallery {
    campaign_id: number;
    campaign_name: string;
    client_name: string;
    cover: string;
    creatives: IUnit[];
    description: string;
    showcase_rev: number;
    active: boolean;
    types: string[];
}

@Injectable()
export class UnitDataService {

    readonly RICHMEDIA = 'RichMedia';
    readonly STADNARD = 'Standard';
    readonly STATIC = 'Static';
    readonly ALL = 'all';

    private dataList: ICampaign[];
    private rmCache: ICampaign[];
    private stdCache: ICampaign[];
    private statCache: ICampaign[];
    private activeCampaign: ICampaign;
    private startCreative = 0;

    private closeModalSub = new Subject();
    $closeModal = this.closeModalSub.asObservable();


    started: Date;

    constructor() {
        this.started = new Date();
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
                crv.state = 'out';
            });
            return elm;
        });
    }

    setDataList(data: ICampaign[]) {
        this.dataList = data.filter(elm => {
            if (elm.cover) {
                elm.active = false;
                elm.creatives.forEach(crv => {
                    // tGroup.items.forEach(crv => {
                        crv.active = false;
                        crv.state = 'out';
                    // });
                });
                return elm;
            } else {
                return false;
            }
        });
        // this.dataList = data;
        console.log(this.dataList);
    }

    setActiveCampaign(data: ICampaign, startKey = 'all') {

        const temp = data;
        this.startCreative = 0;
        if (startKey !== this.ALL.toLowerCase()) {
            this.startCreative = data.creatives.findIndex(elm => {
                return elm.type.toLowerCase() === startKey.toLowerCase();
            });
        }
        this.activeCampaign = data;
        // this.activeCampaign.creatives = this.sortByKey(this.activeCampaign.creatives, 'type');
    }

    private sortByKey(array, key) {
        return array.sort(function(a, b) {
            const x = a[key];
            const y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    getActiveCampaign() {
        return this.activeCampaign;
    }

    getStartIndex() {
        return this.startCreative;
    }

    getAll() {
        return this.dataList;
    }

    getRichMedia() {
        if (!this.rmCache) {
            this.rmCache = this.getType(this.RICHMEDIA);
        }
        return this.rmCache;
    }

    getStandard() {
        if (!this.stdCache) {
            this.stdCache = this.getType(this.STADNARD);
        }
        return this.stdCache;
    }

    getStatic() {
        if (!this.statCache) {
            this.statCache = this.getType(this.STATIC);
        }
        return this.statCache;
    }

    getCampaignByIndex(idx) {
        return this.dataList[idx];
    }

    private getType(type: string): ICampaign[] {
        const newList: ICampaign[] = this.dataList.filter(elm => {
            return elm.types.some(list => {
                return list === type;
            });
        });

        // if (type !== 'all') {
        //     newList.map(elm => {
        //         elm.creatives.sort((a, b) => {
        //             if (a.type === type) {
        //                 return -1;
        //             } else {
        //                 return 1;
        //             }
        //         });
        //     });
        // }

        return newList;
    }


}
