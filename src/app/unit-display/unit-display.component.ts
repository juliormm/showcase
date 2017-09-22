import { Component, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { IUnit, ICampaign, UnitDataService } from '../unit-data.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
// import { Ng2DeviceService } from 'ng2-device-detector';


@Component({
    selector: 'app-unit-display',
    templateUrl: './unit-display.component.html',
    styleUrls: ['./unit-display.component.scss'],
    animations: [
        trigger('slideInOut', [
            state('in', style({ opacity: 1 })),
            transition('void => false', [
                /*no transition on first load*/
            ]),
            transition('* => void', [
                style({ opacity: '*' }),
                animate('0.3s ease', style({ opacity: 0 }))
            ]),
            transition('void => *', [
                style({ opacity: 0 }),
                animate('0.3s ease', style({ opacity: '*' }))
            ])
        ])
    ]
})
export class UnitDisplayComponent implements OnInit, AfterViewInit {
    public title: string;
    public campaign: ICampaign;

    deviceInfo = null;

    currentCampaign: ICampaign;
    currIdx: number;
    prevIdx: number;
    diplayHeight: number;
    currentCrvSize: any;
    mapSubMenu: any[];
    activeCrv: IUnit[] = [];

    FADEOUT = 400;
    START_DELAY = 1000;
    CREATIVE_BORDER = 20; // match 2x the css padding
    CREATIVE_MARGIN = 40;

    combinedSpace = this.CREATIVE_BORDER + this.CREATIVE_MARGIN;
    bodyElem;
    runningTransition = false;

    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

    adView;

    activeMobileMsg = false;
    mobileBestView: string;
    mobHeight: any;
    mobWidth: any;
    adjustForMobileMsg: {};
    activeIsMobile = true;
    deviceOrientation;
    swipeChange: string;

    // recomendRotation


    constructor(public bsModalRef: BsModalRef, public _uService: UnitDataService, private elRef: ElementRef) { }


    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if ( !this._uService.isMobile() ) {
            console.log('scalling')
            this.centerCreative();
        }
    }


    ngOnInit() {

        this.currIdx = this._uService.getStartIndex();
        this.currentCampaign = this._uService.getActiveCampaign();
        this.mobHeight = (window.innerHeight);
        this.mobWidth = (window.innerWidth);

        console.log(this.mobHeight);
        this.mapSubMenu = [];
        const keys: string[] = [];
        this.currentCampaign.creatives.forEach((elm, i) => {
            const test = (elm.type === 'RichMedia') ? 'Rich Media' : elm.type;
            const kIdx = keys.indexOf(test);

            if (kIdx === -1) {
                keys.push(test);
                const obj = { type: test, items: [{ size: elm.size, index: i }] };
                this.mapSubMenu.push(obj);
            } else {
                this.mapSubMenu[kIdx].items.push({ size: elm.size, index: i });
            }
        });
    }

    ngAfterViewInit() {
        this.adView = this.elRef.nativeElement.querySelector('.ad-view');
        setTimeout(() => {
            this.activeCrv.push(this.currentCampaign.creatives[this.currIdx]);
            this.centerCreative();
            this.currentCampaign.creatives[this.currIdx].active = true;
            this.currentCampaign.creatives[this.currIdx].state = 'in';
        }, this.START_DELAY);

        // if (!HammerGesturesDirective.hammerInitialized) {
        //     co
        // }
    }

    /**
     * TOOLS
     */

    /**
    * [return proportion of missing value]
    * @param {[number]} proS1 [known size of missing side]
    * @param {[number]} s2    [oposite side of know values]
    * @param {[number]} s1    [same side know values]
    */
    getProportion(proS1, s2, s1) {
        return (proS1 * s2) / s1;
    }

    
    getCreativeSize(crv: IUnit) {
        const splitSize = crv.size.split('x');
        const nWidth: number = +splitSize[0];
        const nHeight: number = +splitSize[1];

        this.mobileBestView = (nWidth > nHeight && crv.size !== '300x250') ? 'horizontally' : 'vertically';
        this.activeIsMobile = !crv.safe_mobile;

        if (crv.sub_type === 'Social') {
            // const vertImg = (+splitSize[0] >= +splitSize[1]) ? true : false;
            // const refElm = this.elRef.nativeElement.querySelector('.ad-view');
            // const vertSpace = (refElm.offsetWidth >= refElm.offsetHeight) ? true : false;

            // if (refElm.offsetWidth < nWidth && refElm.offsetHeight >= nHeight) {
            //     console.log('image width larger');
            //     nHeight = this.getProportion(refElm.offsetWidth - this.combinedSpace, nHeight, nWidth) - this.combinedSpace;
            //     nWidth = (refElm.offsetWidth - this.combinedSpace);
            // } else if (refElm.offsetWidth >= nWidth && refElm.offsetHeight < nHeight) {
            //     console.log('image height larger');

            //     nWidth = this.getProportion(refElm.offsetHeight - this.combinedSpace, nWidth, nHeight) - this.combinedSpace;
            //     nHeight = (refElm.offsetHeight - this.combinedSpace);
            //     // console
            // } else {
            //     if (vertSpace) {
            //         nWidth = this.getProportion(refElm.offsetHeight - this.combinedSpace, nWidth, nHeight) - this.combinedSpace;
            //     } else {
            //         nHeight = this.getProportion(refElm.offsetWidth - this.combinedSpace, nHeight, nWidth) - this.combinedSpace;
            //         nWidth = (refElm.offsetWidth - this.combinedSpace);
            //     }

            // }
            const setSize = (this.adView.offsetWidth > this.adView.offsetHeight) ? { width: (this.getProportion(this.adView.offsetHeight - this.CREATIVE_BORDER, nWidth, nHeight)) + 'px' } : { width: (this.adView.offsetWidth) + 'px' };
            return setSize;

        }

        if (this._uService.isMobile() ) {

            if (this.adView.offsetWidth <= nWidth || this.adView.offsetHeight <= nHeight) {
                this.adjustForMobileMsg = { height: 'calc(100vh - 220px)' };
                this.activeMobileMsg = true;
            } else {
                this.adjustForMobileMsg = {};
                this.activeMobileMsg = false;
            }
        } else {
            this.adjustForMobileMsg = {};
            this.activeMobileMsg = false;
        }
        // return {};
        return { width: (nWidth + this.CREATIVE_BORDER) + 'px', height: (nHeight + this.CREATIVE_BORDER) + 'px' };
    }

    centerCreative() {
        this.currentCrvSize = this.getCreativeSize(this.currentCampaign.creatives[this.currIdx]);
    }


    /**
     * Navigation
     */
    changeCreative(i: number) {
        if (!this.runningTransition) {
            this.runningTransition = true;
            this.currIdx = i;
            // this.activeCrv.splice(0, 1);
            this.activeCrv = [];
        }
    }

    onRightArrow() {
        const next = (this.currIdx++ >= this.currentCampaign.creatives.length - 1) ? 0 : this.currIdx++;
        this.changeCreative(next);
    }

    onLeftArrow() {
        const next = (this.currIdx-- <= 0) ? this.currentCampaign.creatives.length - 1 : this.currIdx--;
        this.changeCreative(next);
    }

    swipe(e) {
        if (e === 'swiperight') {
            this.onLeftArrow();
        } else {
            this.onRightArrow();
        }

        this.swipeChange = e;
    }


    /**
     * SUB-MENU
     */

    activeSubMenu(crv) {
        return (crv.index === this.currIdx) ? ['active'] : [];
    }

    subDynamicClass() {
        const cls = [];

        if (this.mapSubMenu.length === 1) {
            cls.push('col-sm-12');
        } else if (this.mapSubMenu.length === 2) {
            cls.push('col-sm-6');
        } else if (this.mapSubMenu.length === 3) {
            cls.push('col-sm-4');
        }

        return cls;
    }



    /**
     * ANIMATION TRANSITIONS
     */

    animationStarted(e) {
        setTimeout(() => {
            if (this.prevIdx >= 1) {
                this.currentCampaign.creatives[this.prevIdx].active = false;
                this.currentCampaign.creatives[this.prevIdx].state = 'out';
            }

            this.currentCampaign.creatives[this.currIdx].active = true;
            this.currentCampaign.creatives[this.currIdx].state = 'in';
            this.runningTransition = false;
        }, this.FADEOUT);
    }

    animationDone(e) {
        if (this.activeCrv.length === 0) {
            this.currentCrvSize = null;
            this.centerCreative();
            this.activeCrv.push(this.currentCampaign.creatives[this.currIdx]);
        }
    }

}
