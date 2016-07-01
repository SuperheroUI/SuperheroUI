import {Directive,OnInit, Input, HostListener,ElementRef, EventEmitter,DynamicComponentLoader, ComponentRef,
    Provider,Injectable, forwardRef, Injector, ViewContainerRef, ReflectiveInjector
} from '@angular/core';

import {TooltipCruncher} from './tooltip.component';
import {TooltipOptions} from './tooltip.options'

// import {IAttribute} from './IAttribute';

@Directive({selector: '[shTooltip]'})
export class Tooltip implements OnInit {
    @Input('tooltip') public content:string;
    @Input('tooltipPlacement') public placement:string = 'top';
    @Input('tooltipIsOpen') public isOpen:boolean;
    @Input('tooltipEnable') public enable:boolean;
    @Input('tooltipAppendToBody') public appendToBody:boolean;

    private visible:boolean = false;
    private tooltip:Promise<ComponentRef<any>>;

    constructor(public element:ElementRef,
                public vcr:ViewContainerRef,
                public loader:DynamicComponentLoader) {
    }

    ngOnInit() {
    }

    @HostListener('focusin', ['$event', '$target'])
    @HostListener('mouseenter', ['$event', '$target'])
    show() {
        if (this.visible) {
            return;
        }
        this.visible = true;

        let options = new TooltipOptions({
            content: this.content,
            placement: this.placement
        });

        let binding = ReflectiveInjector.resolve([
            new Provider(TooltipOptions, {useValue: options})
        ]);

        this.tooltip = this.loader
            .loadNextToLocation(TooltipCruncher, this.vcr, binding)
            .then((componentRef:ComponentRef<any>) => {
                console.log(this.element)
                componentRef.instance.position(this.element);
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
            return componentRef;
        });
    }
}