import { Component, SimpleChanges, OnChanges, AfterViewInit, Input, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer, } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';
import { IUnit } from '../unit-data.service';
import { environment } from '../../environments/environment';
// import { CreativeTypesService } from '../creative-types.service';



@Component({
    selector: 'app-preview-ad',
    template: `<div id="dynamic-preview" class="" [ngStyle]="styleSet">
            <div *ngIf="render" [innerHTML]="html"></div>
        </div>
    `
})

export class PreviewAdComponent implements OnChanges, AfterViewInit {
    @Input() creative: any;
    @Input() render = false;
    size = {
        width: 800,
        height: 500
    };

    creativeWidth: number;
    creativeHeight: number;
    showWarning = false;
    styleSet: any = {};
    baseURL:string;
    safeURL: string;
    html: any;
    constructor(private sanitizer: DomSanitizer, private el: ElementRef) { }

    // @HostListener('window:resize', ['$event'])
    // onResize(event) {
    //     this.detectShowWarning();
    // }

    ngOnChanges(changes: SimpleChanges) {

        if (changes['creative']) {
            // console.log(this.creative)
            let useSize = true;
            if (this.creative.type === 'Email' && this.creative.extension === '.html') {
                // email creatives
                this.size.width = 800;
                this.size.height = 600;
                this.creativeWidth = 800;
                this.creativeHeight = 600;
                this.adjustStyles();
            } else if (this.creative.type === 'Email' && this.creative.extension !== '.html') {
                // image email creatives
                this.size.width = 800;
                this.size.height = 600;
                useSize = false;
            } else if (this.creative.type === 'Static' && this.creative.sub_type === 'Social') {
                // console.log('social');
                useSize = false;
                const splitSize = this.creative.size.split('x');
                this.creativeWidth = +splitSize[0];
                this.creativeHeight = +splitSize[1];
                // this.detectShowWarning();
            } else {
                // console.log('no social here');
                const splitSize = this.creative.size.split('x');
                this.creativeWidth = +splitSize[0];
                this.creativeHeight = +splitSize[1];

                this.size.width = this.creativeWidth;
                this.size.height = this.creativeHeight;
                this.adjustStyles(false);

            }

            this.baseURL = (this.creative.server === 'QT') ? environment.ASSETS_QT_URL : environment.ASSETS_PREVIEW_URL;


            this.safeURL = (this.creative.url_params) ? this.baseURL + this.creative.url_path + '?' + this.creative.url_params : this.baseURL + this.creative.url_path;
            this.html = this.sanitizer.bypassSecurityTrustHtml(this.getBaseHTML(this.creative.url_path, useSize));
        }
    }

    ngAfterViewInit() {
        // this.detectShowWarning();
    }

    adjustStyles(padding = true) {
        this.styleSet = {
            'width': (this.size.width) + 'px',
            'height': (this.size.height) + 'px'
            // 'overflow-y': 'hidden',
            // 'overflow-x': 'hidden'
        };

        if (padding) {
            this.styleSet['padding'] = '5px';
        }


    }

    restartAd() {
        console.log('restating add');
        this.html = this.sanitizer.bypassSecurityTrustHtml(this.getBaseHTML(this.creative.url_path, true));
    }

    
    getBaseHTML(url: string, useSize = true) {
        if (url.indexOf('.htm') >= 0) {
            return `<iframe class="active-frame center-block" src="${this.safeURL}" height="${this.creativeHeight}" width="${this.creativeWidth}" frameBorder="0"></iframe>`;
        } else {
            if (useSize) {
                return `<img class="active-frame center-block img-responsive" src="${this.safeURL}" height="${this.creativeHeight}" width="${this.creativeWidth}" />`;
            } else {
                return `<img class="active-frame center-block img-responsive" src="${this.safeURL}" />`;
            }
        }
    }

}
