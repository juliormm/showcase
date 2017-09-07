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

            transition('void => *', [
              animate(300, style({opacity: '1'}))
            ]),
            transition('* => void', [
              animate(300, style({opacity: '0'}))
            ])
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

    // animState = 'in';

    currentCampaign: ICampaign;
    // displayCampaigns: ICampaign[];
    // curretnUnit: IUnit;
    currIdx: number;
    prevIdx: number;
    diplayHeight: number;
    currentCrvSize: any;

    constructor(public bsModalRef: BsModalRef, public _uService: UnitDataService, private elm: ElementRef) { }


    // @HostListener('window:resize', ['$event'])
    // onResize(event) {
    //     // this.setNewHeight();
    //     // console.log(event);
    // }


    ngOnInit() {
        // this.allCampaigns = this._uService.getAll();
        this.currentCampaign = this._uService.getActiveCampaign();
        this.currIdx = 0;
        this.currentCampaign.creatives[0].active = true;
        this.currentCrvSize = this.getCreativeSize(this.currentCampaign.creatives[0]);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.currentCampaign.creatives[0].state = 'show';
        }, 500);
    }

    onNextUnit() {
        this.prevIdx = this.currIdx;
        this.currIdx = (this.currIdx++ >= this.currentCampaign.creatives.length - 1) ? 0 : this.currIdx++;
        // this.currentCampaign.creatives[this.prevIdx].state = 'hide';
         this.currentCampaign.creatives[this.prevIdx].active = false;
        setTimeout(() => {
            // this.currentCampaign.creatives[this.prevIdx].active = false;
            this.currentCampaign.creatives[this.currIdx].active = true;
            // this.currentCampaign.creatives[this.currIdx].state = 'show';
            this.currentCrvSize = this.getCreativeSize(this.currentCampaign.creatives[this.currIdx]);
        }, 300);

    }

    onPrevUnit() {
        this.prevIdx = this.currIdx;
        this.currIdx = (this.currIdx-- <= 0) ? this.currentCampaign.creatives.length - 1 : this.currIdx--;
        // this.currentCampaign.creatives[this.prevIdx].state = 'hide';
          this.currentCampaign.creatives[this.prevIdx].active = false;

        setTimeout(() => {
          
            this.currentCampaign.creatives[this.currIdx].active = true;
            // this.currentCampaign.creatives[this.currIdx].state = 'show';
            this.currentCrvSize = this.getCreativeSize(this.currentCampaign.creatives[this.currIdx]);
        }, 300);
    }

    animationStarted(event) {
        console.log(event);
    }

    animationDone(event) {
        console.log(event);
    }

    getCreativeSize(crv: IUnit) {
          const splitSize = crv.size.split('x');
          return {width: (+splitSize[0] + 20) + 'px', height: (+splitSize[1] + 20) +  'px'};
    }

}
