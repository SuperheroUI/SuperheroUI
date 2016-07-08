import {
    Directive, Input, HostListener, ElementRef, DynamicComponentLoader, ComponentRef, ViewContainerRef
} from '@angular/core';

import {TooltipTemplate} from './tooltip.component';
import * as _ from 'lodash';

@Directive({selector: '[shTooltip]'})
export class Tooltip {
    tooltip:any;
    visible = false;
    tooltipContent:any = {};

    cfg = {
        position: 'top',
        mouseShowTimeout: 1000
    };

    @Input('shTooltip') public content;
    @Input('shTooltipConfig') public config;

    constructor(public element:ElementRef,
                public vcr:ViewContainerRef,
                public loader:DynamicComponentLoader) {
    }

    ngAfterViewInit() {
        if (!this.config) {
            this.config = {};
        }
        _.defaults(this.config, this.cfg);
    }

    @HostListener('focusin', ['$event', '$target'])
    @HostListener('mouseenter', ['$event', '$target'])
    show() {
        this.tooltipContent.text = this.content;
        this.tooltipContent.config = this.config;

        if (this.visible) {
            return;
        }
        this.visible = true;

        this.tooltip = this.loader
            .loadNextToLocation(TooltipTemplate, this.vcr)
            .then((componentRef:any) => {
                componentRef.instance.prepAndShow(this.element, this.tooltipContent);
                return componentRef;
            });
    }

    @HostListener('focusout', ['$event', '$target'])
    @HostListener('mouseleave', ['$event', '$target'])
    hide() {
        if (!this.visible) {
            return;
        }
        this.visible = false;
        this.tooltip.then((componentRef:ComponentRef<any>) => {
            setTimeout(()=> {
                componentRef.instance.fadeOut();
            }, this.config.mouseShowTimeout);

            setTimeout(()=> {
                //wait for css transition to complete then remove the element
                componentRef.destroy();
            }, 501 + this.config.mouseShowTimeout);
            return componentRef;
        });
    }
}