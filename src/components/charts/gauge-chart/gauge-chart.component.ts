import {Component, AfterViewInit, Input, ViewEncapsulation, ElementRef, OnInit} from '@angular/core';
import {TooltipService} from '../tooltip.service'
import * as _ from 'lodash';
import * as d3 from 'd3';

@Component({
    moduleId: module.id,
    selector: 'sh-gauge-chart',
    template: `
                <div (window:resize)="onResize($event)">
                    <div [ngStyle]="imgContainer" class="imageInGauge"><img [ngClass]="imgClass" [ngStyle]="positionImg" style="border-radius: 3000px" *ngIf="config.img" [src]="config.img"></div>
                    <i *ngIf="!config.img" class="icon-plus addPlus" (click)="config.callback"></i>
                </div>`,
    styleUrls: ['gauge-chart.component.css'],
    providers: [TooltipService],
    encapsulation: ViewEncapsulation.None
})

export class GaugeChart implements AfterViewInit, OnInit {
    @Input() config:any;
    @Input() data:any;

    constructor(private el:ElementRef, private toolTipService:TooltipService) {
        _.defaults(this.config, this.cfg);
    }

    svg;
    elem;
    path;
    graphHeight;
    graphWidth;
    tooltip;
    baseWidth;
    barsData;
    maxWidthHeight;
    imgContainer;
    positionImg;

    imgClass = '';
    format = null;
    runOnce = false;
    width = 100;
    height = 100;
    radius = 5;
    cfg:any = {
        margin: {top: 0, right: 0, left: 10, bottom: 0},
        barHeight: 10,
        barColorEmpty: '#FFFFFF',
        barColorFull: '#74DEFA',
        barWidth: 2,
        img: 'app/images/avatar.png',
        imgPadding: 5,
        animate: true,
        callback: _.noop
    };

    chartSetUp = function () {
        this.elem = this.el.nativeElement;
        this.baseWidth = this.elem.offsetWidth;
        this.width = this.elem.offsetWidth + this.config.margin.left + this.config.margin.right;
        this.height = this.elem.offsetHeight;
        this.graphHeight = this.elem.offsetHeight - this.config.margin.top - this.config.margin.bottom;
        this.graphWidth = this.elem.offsetWidth - this.config.margin.left - this.config.margin.right;
        this.maxWidthHeight = Math.min(this.width, this.height);


        this.imgContainer = {
            left: (this.cfg.barHeight + this.cfg.imgPadding) + 'px',
            top: (this.cfg.barHeight + this.cfg.imgPadding) + 'px'
        };
        this.positionImg = {
            height: this.maxWidthHeight - ((this.cfg.barHeight + this.cfg.imgPadding) * 2) + 'px',
            width: this.maxWidthHeight - ((this.cfg.barHeight + this.cfg.imgPadding) * 2) + 'px'
        };


        this.svg = d3.select(this.elem)
            .append("svg")
            .attr("width", this.maxWidthHeight)
            .attr("height", this.maxWidthHeight)
            .append("g")
            .attr('transform', 'translate(' + this.maxWidthHeight / 2 + ',' + this.maxWidthHeight / 2 + ') rotate(180)');

        this.barsData = _.map(_.range(360), (i)=> {
            if (i % 6 == 0) {
                return this.cfg.barHeight;
            } else {
                return 0
            }
        });
    };

    ngOnInit() {
        if (!this.config) {
            this.config = {};
        }
        _.defaults(this.config, this.cfg);
    }

    ngAfterViewInit() {
        this.initChart();
    }

    initChart() {
        setTimeout(()=> {
            this.chartSetUp();
            this.drawChart();
            this.updateChart();
        })
    }

    drawChart = function () {
        setTimeout(()=> {
            this.imgClass = 'imageIn';
        });

        var tooltip = this.toolTipService.generateTip(d3, this.svg, this.radius);
        //draw the chart
        this.svg.selectAll('rect')
            .data(this.barsData)
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', this.maxWidthHeight / 2 - this.cfg.barHeight)
            .attr('width', ()=> {
                return this.cfg.barWidth;
            })
            .attr('height', (d)=> {
                return d
            })
            .attr('transform', (d, i)=> {
                return 'rotate(' + i + ')'
            })
            .attr('fill', this.cfg.barColorEmpty)
            .attr('fill-opacity', '.2')
        ;
    };

    updateChart = function () {
        var ele = this.svg.selectAll('rect');

        ele.attr('fill', (d, i)=> {
            return this.cfg.barColorEmpty;
        })
            .attr('fill-opacity', (d, i)=> {
                return .2;
            });

        if (this.cfg.animate) {
            ele = ele
                .transition()
                .delay((d, i)=> {
                    return i * 2;
                });
        }
        ele.attr('class', (d, i)=> {
            if (i > 360 * this.data) {
                return 'empty';
            }
            return 'full';
        })
            .attr('fill', (d, i)=> {
                if (i > 360 * this.data) {
                    return this.cfg.barColorEmpty;
                }
                return this.cfg.barColorFull
            })
            .attr('fill-opacity', (d, i)=> {
                if (i > 360 * this.data) {
                    return .2;
                }
                return 1;
            })
        ;
    };

    ngOnChanges() {
        if (this.runOnce === false) {
            this.runOnce = true
        } else {
            this.updateChart()
        }
    };

    onResize() {
        d3.select(this.elem).select('svg').remove();
        this.initChart();
    }
}
