import {
    Component, ViewEncapsulation, ElementRef

} from '@angular/core';

import * as _ from 'lodash';

@Component({
    selector: 'tooltip-template',
    moduleId: module.id,
    templateUrl: 'tooltip.component.html',
    styleUrls: ['tooltip.css'],
    encapsulation: ViewEncapsulation.None
})

export class TooltipTemplate {
    height;
    width;
    tip;
    wrapper;
    text;
    arrow = 10;
    classList = [];
    config = {};

    constructor(private elementRef:ElementRef) {
    }

    calcPosition = function (e) {
        var top, left;
        var box = e.getBoundingClientRect();
        top = box.top + window.pageYOffset - e.clientTop;
        left = box.left - window.pageXOffset - e.clientLeft;
        return {
            top: top,
            left: left
        };
    };

    show = function (e) {
        this.tip = this.setPosition(e).tip;
        this.wrapper = this.setPosition(e).wrapper;
    };

    setPosition = function (e) {
        var positionStyle:any = {};
        var top = this.calcPosition(e).top;
        var left = this.calcPosition(e).left;
        switch (this.config.position) {
            case 'bottom':
                top = this.calcPosition(e).top + this.height + this.arrow;
                this.classList.push('bottom');
                this.classList.push('show');
                positionStyle.wrapper = {
                    top: top + 'px',
                    left: left + this.width / 2 + 'px'
                };
                positionStyle.tip = {
                    left: '-50%'
                };
                break;

            case 'left':
                left = window.innerWidth - left + this.arrow;
                this.classList.push('left');
                this.classList.push('show');
                top = this.calcPosition(e).top;
                positionStyle.wrapper = {
                    top: top + this.height / 2 + 'px',
                    right: left + 'px'
                };
                positionStyle.tip = {
                    'transform': 'translate(0,-50%)'
                };
                break;

            case 'right':
                left = left + this.width + this.arrow;
                this.classList.push('right');
                this.classList.push('show');
                positionStyle.wrapper = {
                    top: top + this.height / 2 + 'px',
                    left: left + 'px'
                };
                positionStyle.tip = {
                    'transform': 'translate(0,-50%)'
                };
                break;

            case 'top':
            default:
                top = this.calcPosition(e).top - this.arrow;
                this.classList.push('top');
                this.classList.push('show');
                positionStyle.wrapper = {
                    top: top + 'px',
                    left: left + this.width / 2 + 'px'
                };
                positionStyle.tip = {
                    left: '-50%',
                    'transform': 'translate(0,-100%)'
                };
                break;
        }
        return positionStyle;
    };

    fadeOut() {
        _.remove(this.classList, (className)=> {
            return className === 'show';
        });
    }

    prepAndShow(element, content) {
        this.text = content.text;
        this.config = content.config;
        let parentElement = element.nativeElement;
        this.height = parentElement.offsetHeight;
        this.width = parentElement.offsetWidth;
        this.show(parentElement)
    }
}
