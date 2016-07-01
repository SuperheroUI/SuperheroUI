import {
    Component, OnInit, ViewEncapsulation, ElementRef

} from '@angular/core';

@Component({
    selector:'tooltip-cruncher',
    moduleId: module.id,
    templateUrl: 'tooltip.component.html',
    styleUrls: ['tooltip.css'],
    encapsulation: ViewEncapsulation.None
})

export class TooltipCruncher implements OnInit {
    height;
    width;
    tip;
    wrapper;

    text = 'the text';
    arrow = 10;
    directionClass = [];

    config = {
        position: 'top',
        showOnClick: false,
        showOnMouse: true,
        mouseShowTimeout: 1000
    };

    constructor(
        private elementRef:ElementRef) {
    }

    // @Input('shTooltip') toolTipText;

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
                this.directionClass.push('bottom');
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
                // toolTip.addClass('left');
                this.directionClass.push('left');
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
                // toolTip.addClass('right');
                this.directionClass.push('right');
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
                // toolTip.addClass('top');
                this.directionClass.push('top');
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

    ngOnInit() {
    }

    position(e){
        let parentElement = e.nativeElement;
        this.height = parentElement.offsetHeight;
        this.width = parentElement.offsetWidth;

        this.show(parentElement)
    }

}
