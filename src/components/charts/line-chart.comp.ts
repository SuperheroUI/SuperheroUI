import {Component, ViewContainerRef, OnInit, Input, ViewEncapsulation} from '@angular/core';
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
export class LineChart implements OnInit {
    constructor(private viewContainerRef:ViewContainerRef) { }

    @Input() data:any;
    svg;
    elem;
    margin = {top: 0, right: 0, left: 40, bottom: 40};
    width = 500;
    height = 500;
    x;
    y;
    xAxis;
    yAxis;
    line;
    getX;

    chartSetUp = function (chartData) {
        this.x = d3.time.scale()
            .range([0, this.width]);

        this.xAxis = d3.svg.axis().scale(this.x).orient("bottom").tickSize(0, 0).tickPadding(10);

        this.y = d3.scale.linear().range([this.height, 0]);

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

        this.elem = this.viewContainerRef.element.nativeElement;
        this.svg = d3.select(this.elem).append("svg").attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
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
    };

    drawChart = function (chartData, i) {

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.height + ")")
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

        this.svg.append("path")
            .datum(chartData.series)
            .attr("class", "base series-" + i)
            .attr("d", this.line)
        ;

        _.forEach(chartData, (value, key) => {
            var points2 = this.svg.selectAll('.circle')
                .data(chartData.series)
                .enter();
            points2.append('circle')
                .attr('cx', (d) => {
                    return this.getX(d.x);
                })
                .attr('cy', (d) => {
                    return this.y(d.y);
                })
                .attr('name', (d, i) => {
                    return 'line-' + key + '-data-' + i;
                })
                .attr('tx', (d) => {
                    return d.x;
                })
                .attr('ty', (d) => {
                    return d.y;
                })
                .attr('r', 4)
                .attr('class', () => {
                    return 'base series-' + i;
                });
        });
    };

    ngOnInit() {
        this.chartSetUp(this.data[1].series);
        _.forEach(this.data, (series, i)=> {
            this.drawChart(series, i);
        });
    };
}
