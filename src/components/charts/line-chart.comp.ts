import {Component, AfterViewInit, Input, ViewEncapsulation, ElementRef} from '@angular/core';
import {TooltipService} from './tooltip.service'
import * as _ from 'lodash';
import * as d3 from 'd3';

@Component({
    moduleId: module.id,
    selector: 'sh-line-chart',
    directives: [],
    providers: [TooltipService],
    template: '<div (window:resize)="onResize($event)"></div>',
    styleUrls: ['line-chart.comp.css'],
    encapsulation: ViewEncapsulation.None
})
export class LineChart implements AfterViewInit {
    @Input() config:any;
    @Input() data:any;

    constructor(private el:ElementRef, private toolTipService:TooltipService) {
    }

    svg;
    elem;
    xScale;
    yScale;
    xAxis;
    yAxis;
    line;
    getX;
    path;
    graphHeight;
    tooltip;

    format = null;
    runOnce = false;
    width = 100;
    height = 100;
    cfg = {
        margin: {top: 10, right: 10, left: 10, bottom: 30}
    };

    chartSetUp = function (chartData) {
        this.elem = this.el.nativeElement;
        this.width = this.elem.offsetWidth;
        this.height = this.elem.offsetHeight;
        this.graphHeight = this.elem.offsetHeight - this.config.margin.top - this.config.margin.bottom;
        this.graphWidth = this.elem.offsetWidth - this.config.margin.left - this.config.margin.right;


        this.xScale = d3.scale.ordinal()
            .rangeBands([0, this.graphWidth])
            .domain(chartData.map((d)=> {
                return d.x;
            }));

        this.yScale = d3.scale.linear()
            .range([this.graphHeight, 0])
            .domain(d3.extent(chartData, (d) => {
                var data:any = d;
                return data.y;
            }));

        if (this.config.dateFormat) {
            this.format = d3.time.format(this.config.dateFormat);
        }

        this.xAxis = d3.svg.axis().scale(this.xScale).orient("bottom").tickSize(0, 0).tickPadding(10).tickFormat(this.format);
        this.yAxis = d3.svg.axis().scale(this.yScale).orient("left");

        this.line = d3.svg.line()
            .x((d) => {
                var data:any = d;
                return this.xScale(data.x);
            })
            .y((d) => {
                var data:any = d;
                return this.yScale(data.y);
            });

        this.getX = function (d) {
            return Math.round(this.xScale(d));
        };

        this.svg = d3.select(this.elem)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("transform", "translate(" + this.config.margin.left + "," + this.config.margin.top + ")");

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.graphHeight + ")")
            .call(this.xAxis);

        this.svg.append("g")
            .attr("class", "y axis")
            .call(this.yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("the words");
    };

    drawChart = function (chartData, i) {
        var tooltip = this.toolTipService.generateTip(d3, this.svg, {});
        this.path = this.svg.append("path");

        _.forEach(chartData, (value, key) => {
            if (key === 'series') {
                this.svg.selectAll('.circles')
                    .data(value).enter()
                    .append('svg:circle')
                    .attr('cx', (d) => {
                        return this.getX(d.x);
                    })
                    .attr('cy', (d)=> {
                        return this.yScale(d.y);
                    })
                    .attr('r', 4)
                    .attr('class', () => {
                        return 'base series-' + i;
                    })
                    .on('mouseover', tooltip.fadeIn)
                    .on('mouseout', tooltip.fadeOut);
            }
        })
    };

    updateChart = function (chartData, i) {
        this.path.datum(chartData.series)
            .attr("class", "base line-" + i)
            .transition()
            .duration(1000)
            .attr("d", this.line)
        ;

        _.forEach(chartData, (value, key) => {
            if (key === 'series') {
                this.svg.selectAll('.series-' + i)
                    .data(value)
                    .transition()
                    .duration(1000)
                    .attr('cx', (d) => {
                        return this.getX(d.x);
                    })
                    .attr('cy', (d)=> {
                        return this.yScale(d.y);
                    })
            }
        });
    };

    ngAfterViewInit() {
        this.initChart();
    }

    ngOnChanges() {
        if (this.runOnce === false) {
            this.runOnce = true
        } else {
            _.forEach(this.data, (series, i)=> {
                this.updateChart(series, i);
            });
        }
    };

    initChart() {
        if (!this.config) {
            this.config = {};
        }
        _.defaults(this.config, this.cfg);

        if (this.data) {
            this.chartSetUp(this.data[1].series);

            _.forEach(this.data, (chartData, i)=> {
                this.drawChart(chartData, i);
                this.updateChart(chartData, i);
            });
        }
    }

    onResize() {
        d3.select(this.elem).select('svg').remove();
        this.initChart();
    }
}
