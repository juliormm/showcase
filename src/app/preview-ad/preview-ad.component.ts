import { Component, SimpleChanges, OnChanges, AfterViewInit, Input, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer, } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';
import { IUnit } from '../unit-data.service';
import { environment } from '../../environments/environment'
import { CreativeTypesService } from '../creative-types.service';



export 



@Component({
    selector: 'app-preview-ad',
    template: `
    <div *ngIf="showWarning" class="alert alert-warning" role="alert">The image is being scaled to fit the screen.</div>
    <div id="dynamic-preview" class="center-block tracksize" [ngStyle]="styleSet">
        <div [innerHTML]="html"></div>
    </div>
        
    `
})

export class PreviewAdComponent implements OnChanges, AfterViewInit {
    @Input('creative') creativeInfo: IUnit;
    size = {
        width: 800,
        height: 500
    };

    creativeWidth: number;
    creativeHeight: number;
    showWarning = false;
    styleSet: any = {};
    baseURL = environment.PREVIEWS_URL;
    safeURL: string;
    html: any;
    constructor(private sanitizer: DomSanitizer, private el: ElementRef, private crvService: CreativeTypesService) { }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        console.log('resizing')
        this.detectShowWarning();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['creativeInfo']) {
            let useSize = true;
            if (this.creativeInfo.type === 'Email' && this.creativeInfo.extension === '.html') {
                // email creatives
                this.size.width = 800;
                this.size.height = 600;
                this.creativeWidth = 800;
                this.creativeHeight = 600;
                this.adjustStyles();
            } else if (this.creativeInfo.type === 'Email' && this.creativeInfo.extension !== '.html') {
                // image email creatives
                this.size.width = 800;
                this.size.height = 600;
                useSize = false;
            } else if (this.creativeInfo.type !== 'Email' && this.creativeInfo.extension !== '.html' && this.creativeInfo.tag !== 'Static') {
                console.log('any other static not mobile')
                useSize = false;
                const splitSize = this.creativeInfo.size.split('x');
                this.creativeWidth = +splitSize[0];
                this.creativeHeight = +splitSize[1];
                this.detectShowWarning();
            } else {
                const splitSize = this.creativeInfo.size.split('x');
                this.creativeWidth = +splitSize[0];
                this.creativeHeight = +splitSize[1];

                this.size.width = this.creativeWidth;
                this.size.height = this. creativeHeight;
                this.adjustStyles(false);

            }

            this.safeURL = (this.creativeInfo.url_params) ? this.baseURL + this.creativeInfo.url_path + '?' + this.creativeInfo.url_params : this.baseURL + this.creativeInfo.url_path;
            this.html = this.sanitizer.bypassSecurityTrustHtml(this.getBaseHTML(this.creativeInfo.url_path, useSize));
        }
    }

    ngAfterViewInit() {
        // this.detectShowWarning();
    }

    detectShowWarning() {
        // apply only on images that are not mobile sizes
        if (this.creativeInfo.extension !== '.html' && this.creativeInfo.tag !== 'Mobile') {
            this.expandToParent();
            this.showWarning = (this.creativeWidth > this.size.width) ? true : false;
        }
    }

    adjustStyles(padding = true) {
        this.styleSet = {
            'width': (this.size.width + 2) + 'px',
            'height': (this.size.height + 2) + 'px',
            'overflow-y': 'auto',
            'overflow-x': 'hidden'
        };

        if (padding) {
            this.styleSet['padding'] = '5px';
        }


    }

    restartAd() {
        console.log('restating add');
        this.html = this.sanitizer.bypassSecurityTrustHtml(this.getBaseHTML(this.creativeInfo.url_path, true));
    }

    expandToParent() {
        const elm = this.el.nativeElement.querySelector('#dynamic-preview');
        const parent = elm.parentElement.parentElement;
        this.size.width = parent.offsetWidth;
        if (this.creativeHeight >= 500) {
            this.size.height = this.creativeHeight + 10;
        }

        this.adjustStyles();
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
