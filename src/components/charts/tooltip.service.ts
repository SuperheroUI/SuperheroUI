import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class TooltipService {

    constructor() {
    }

    getScreenBBox = function (d3, SVGPoint, direction) {
        var targetElement = d3.event.target;
        var bbox:any = {},
            matrix = targetElement.getScreenCTM(),
            tbbox = targetElement.getBBox(),
            width = tbbox.width,
            height = tbbox.height;

        SVGPoint.x = tbbox.x;
        SVGPoint.y = tbbox.y;

        bbox.data = targetElement.__data__;
        switch (direction) {
            case 'nw':
                bbox.nw = SVGPoint.matrixTransform(matrix);
                break;
            case 'n':
                SVGPoint.x += width / 2;
                bbox.n = SVGPoint.matrixTransform(matrix);
                SVGPoint.y += height;
                bbox.height = height;
                break;
            case 'ne':
                SVGPoint.x += width;
                bbox.ne = SVGPoint.matrixTransform(matrix);
                break;
            case 'e':
                SVGPoint.x += width;
                SVGPoint.y += height / 2;
                bbox.e = SVGPoint.matrixTransform(matrix);
                break;
            case 'se':
                SVGPoint.x += width;
                SVGPoint.y += height;
                bbox.se = SVGPoint.matrixTransform(matrix);
                break;
            case 's':
                SVGPoint.x += width / 2;
                SVGPoint.y += height;
                bbox.s = SVGPoint.matrixTransform(matrix);
                break;
            case 'sw':
                SVGPoint.y += height;
                bbox.sw = SVGPoint.matrixTransform(matrix);
                break;
            case 'w':
                SVGPoint.y += height / 2;
                bbox.w = SVGPoint.matrixTransform(matrix);
                break;
            case 'c':
                SVGPoint.x += width / 2;
                SVGPoint.y += height / 2;
                bbox.c = SVGPoint.matrixTransform(matrix);
                break;
            default:
                SVGPoint.x += width / 2;
                bbox.n = SVGPoint.matrixTransform(matrix);
        }

        return bbox;
    };

    getSVGNode = function (el) {
        el = el.node();
        if (el.tagName.toLowerCase() === 'svg') {
            return el;
        }
        return el.ownerSVGElement;
    };

    generateTip = function (d3, d3Node, config) {
        if (!config) {
            config = {};
        }

        var cfg = {
            position: 'n',
            offset: 5
        };
        _.defaults(config, cfg);

        var tip:any = {};
        tip.tip = '';
        tip.fadeIn = () => {
            var xx, yy, data;
            var svg = this.getSVGNode(d3Node);
            var SVGPoint = svg.createSVGPoint();
            var bBox = this.getScreenBBox(d3, SVGPoint, cfg.position);

            if (!_.isUndefined(bBox.data.tooltip)) {
                data = bBox.data.tooltip;
            } else {
                data = bBox.data.y;
            }

            var node = d3.select("body").append("div").node();

            xx = bBox[cfg.position].x;
            yy = bBox[cfg.position].y - config.offset;
            
            tip.tip = d3.select(node);

            tip.tip
                .html("<div class='superTooltip show top chart' style='left: -50%; transform: translate(0px, -100%);'><div name='tooltipText' class='tooltipText'>" + data + "</div></div>")
                .attr('class', 'toolTipWrapper')
                .attr('style', 'top:' + yy + 'px;left:' + xx + 'px;z-index:100000')
                .transition()
                .duration(500)
                .style('opacity', 1);

            d3.select(window).on('scroll', ()=>{this.removeAll(d3)})
        };

        tip.fadeOut = function () {
            tip.tip.transition().duration(500).style('opacity', 0).remove();
        };

        return tip;
    };

    removeAll = function (d3) {
        d3.selectAll('.toolTipWrapper').transition().duration(200).style('opacity', 0).remove();
    };
}
