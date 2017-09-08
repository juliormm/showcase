import { Component, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { IUnit, ICampaign, UnitDataService } from '../unit-data.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


@Component({
    selector: 'app-unit-display',
    templateUrl: './unit-display.component.html',
    styleUrls: ['./unit-display.component.scss'],
    animations: [
        trigger('slideInOut', [
            // state(':leave', style({
            //     opacity: '0'
            // })),
            // state(':enter', style({
            //     opacity: '1'
            // })),
            state('in', style({opacity: 1})),
            state('out', style({opacity: 0})),

            transition('out => in', animate('1000ms')),

            transition('void => in', [
                animate('1000ms 1000ms')
            ]),
            transition('* => void', [
                animate('1000ms', style({ opacity: 0 }))
            ])

            // transition(
            //     ':enter', [
            //       // style({opacity: 1}),
            //       animate('1000ms', style({opacity: 1}))
            //     ]),
            // transition(
            //     ':leave', [
            //       // style({opacity: 0}),
            //       animate('1000ms', style({opacity: 0}))
            //     ]),
            // transition('* <=> show', style({opacity:0, }), animate('600ms ease')),
            // transition('* => right')
            // transition('show => hide', animate('300ms ease-in')),
            // transition('hide => show', animate('300ms ease-out')),
            // transition('left => show', animate('300ms ease-out')),
            // transition('show => right', animate('300ms ease-out')),
            // transition('out => in', animate(''))
        ])

        // trigger('unitOut', [
        //     state('start')
        //     ])
    ]
})
export class UnitDisplayComponent implements OnInit, AfterViewInit {
    public title: string;
    public campaign: ICampaign;

    currentCampaign: ICampaign;
    currIdx: number;
    prevIdx: number;
    diplayHeight: number;
    currentCrvSize: any;
    mapSubMenu: any[];

    mobHeight: any;
    mobWidth: any;

    FADEOUT = 300;
    START_DELAY = 1000;
    bodyElem;

    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };


    constructor(public bsModalRef: BsModalRef, public _uService: UnitDataService, private elRef: ElementRef) { }


    // @HostListener('window:resize', ['$event'])
    // onResize(event) {
    //     // this.setNewHeight();
    //     // console.log(event);
    // }


    ngOnInit() {

        this.currIdx = this._uService.getStartIndex();
        this.currentCampaign = this._uService.getActiveCampaign();
        this.mobHeight = (window.innerHeight);
        this.mobWidth = (window.innerWidth);
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

        // setTimeout(() => {
           

        // }, this.START_DELAY);



    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.currentCampaign.creatives[this.currIdx].active = true;
            this.currentCampaign.creatives[this.currIdx].state = 'in';
            this.centerCreative();

        }, this.START_DELAY);
    }

    centerCreative() {
        setTimeout(() => {
            this.currentCrvSize = this.getCreativeSize(this.currentCampaign.creatives[this.currIdx]);
        }, 300);
    }

    changeCreative(i: number) {
        // this.currentCrvSize = null;
        this.prevIdx = this.currIdx;
        this.currIdx = i;
        this.currentCampaign.creatives[this.prevIdx].state = 'out';

        setTimeout(() => {
            this.currentCampaign.creatives[this.prevIdx].active = false;
            this.currentCampaign.creatives[this.currIdx].active = true;
            this.currentCampaign.creatives[this.currIdx].state = 'in';
            this.centerCreative();
        }, this.FADEOUT);

    }



    onNextUnit() {
        this.prevIdx = this.currIdx;
        this.currIdx = (this.currIdx++ >= this.currentCampaign.creatives.length - 1) ? 0 : this.currIdx++;
        this.currentCampaign.creatives[this.prevIdx].state = 'out';
        
        setTimeout(() => {
            this.currentCampaign.creatives[this.prevIdx].active = false;
            this.currentCampaign.creatives[this.currIdx].active = true;
            this.currentCampaign.creatives[this.currIdx].state = 'in';
            this.currentCrvSize = this.getCreativeSize(this.currentCampaign.creatives[this.currIdx]);
        }, this.FADEOUT);

    }

    onPrevUnit() {
        this.prevIdx = this.currIdx;
        this.currIdx = (this.currIdx-- <= 0) ? this.currentCampaign.creatives.length - 1 : this.currIdx--;
        this.currentCampaign.creatives[this.prevIdx].state = 'out';
      

        setTimeout(() => {
              this.currentCampaign.creatives[this.prevIdx].active = false;
            this.currentCampaign.creatives[this.currIdx].active = true;
            this.currentCampaign.creatives[this.currIdx].state = 'in';
            this.currentCrvSize = this.getCreativeSize(this.currentCampaign.creatives[this.currIdx]);
        }, this.FADEOUT);
    }


    getCreativeSize(crv: IUnit) {

        if (crv.sub_type === 'Social') {
            const refElm = this.elRef.nativeElement.querySelector('.slide-item');
            console.log(refElm.offsetWidth);
            console.log(refElm.offsetHeight);
            const _w = refElm.offsetWidth;
            const _h = refElm.offsetHeight;

            return { width: _w + 'px', height: _h + 'px' };
        }
        const splitSize = crv.size.split('x');
        return { width: (+splitSize[0] + 20) + 'px', height: (+splitSize[1] + 20) + 'px' };
    }

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



        // if ( this.mobWidth <= 768 ) {
        //  console.log('small')
        // } else if (this.mobWidth > 768 && this.mobWidth < 1200) {
        //     console.log('inside')
        // } else if ( this.mobWidth >= 1200) {
        //     console.log('lg')
        //     if (this.mapSubMenu.length === 1) {
        //         console.log('only 1 type')
        //         cls.push('col-lg-offset-3');
        //     } else {
        //         console.log('more than 1')
        //     }
        // } else {
        //     console.log('what')
        // }

        return cls;
    }

    swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
        // out of range
        console.log(currentIndex, action);
    }

    animationStarted(e) {
        console.log(e);
    }

    animationDone(e) {
        console.log(e);
    }


    randomeColor() {
        return {'background-color': "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);})};
    }

}
