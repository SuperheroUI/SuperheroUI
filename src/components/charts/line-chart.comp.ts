import {Component, ViewContainerRef, AfterViewInit, Input, ViewEncapsulation, ElementRef} from '@angular/core';
import * as _ from 'lodash';
import * as d3 from 'd3';

@Component({
    moduleId: module.id,
    selector: 'sh-line-chart',
    directives: [],
    template: '<div></div>',
    styleUrls: ['line-chart.comp.css'],
    encapsulation: ViewEncapsulation.None
})
export class LineChart implements AfterViewInit {
    constructor(private el:ElementRef) {
    }

    @Input() data:any;
    svg;
    elem;
    margin = {top: 10, right: 10, left: 10, bottom: 30};
    width = 100;
    height = 100;
    x;
    y;
    xAxis;
    yAxis;
    line;
    getX;
    runOnce = false;
    path;
    dots;
    graphHeight;

    chartSetUp = function (chartData) {
        this.elem = this.el.nativeElement;
        this.width = this.elem.offsetWidth;
        this.height = this.elem.offsetHeight;
        this.graphHeight = this.elem.offsetHeight - this.margin.top - this.margin.bottom;
        this.graphWidth = this.elem.offsetHeight - this.margin.left - this.margin.right;

        this.x = d3.time.scale().range([0, this.graphWidth]);
        this.y = d3.scale.linear().range([this.graphHeight, 0]);

        this.xAxis = d3.svg.axis().scale(this.x).orient("bottom").tickSize(0, 0).tickPadding(10);
        this.yAxis = d3.svg.axis().scale(this.y).orient("left");

        this.line = d3.svg.line()
            .x((d) => {
                var data:any = d;
                return this.x(data.x);
            })
            .y((d) => {
                var data:any = d;
                return this.y(data.y);
            });

        this.getX = function (d) {
            return Math.round(this.x(d));
        };

        this.svg = d3.select(this.elem)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        this.x.domain(d3.extent(chartData, (d) => {
            var data:any = d;
            return data.x;
        }));
        this.y.domain(d3.extent(chartData, (d) => {
            var data:any = d;
            return data.y;
        }));

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
                        return this.y(d.y);
                    })
                    .attr('r', 4)
                    .attr('class', () => {
                        return 'base series-' + i;
                    });
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
                        return this.y(d.y);
                    })
            }
        });
    };

    ngAfterViewInit() {
        this.chartSetUp(this.data[1].series);
        _.forEach(this.data, (chartData, i)=> {
            this.drawChart(chartData, i);
            this.updateChart(chartData, i);
        });
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
}
