import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class TooltipService {

    constructor() {
    }

    getScreenBBox = function (d3, SVGPoint) {
        var targetElement = d3.event.target;
        var bbox:any = {},
            matrix = targetElement.getScreenCTM(),
            tbbox = targetElement.getBBox(),
            width = tbbox.width,
            height = tbbox.height;

        SVGPoint.x = tbbox.x;
        SVGPoint.y = tbbox.y;

        bbox.data = targetElement.__data__;

        SVGPoint.x += width / 2;
        bbox.n = SVGPoint.matrixTransform(matrix);
        SVGPoint.y += height;
        bbox.height = height;

        return bbox;
    };

    getSVGNode = function (el) {
        el = el.node();
        if (el.tagName.toLowerCase() === 'svg') {
            return el;
        }
        return el.ownerSVGElement;
    };

    setTooltipData = function (dataFromSvg) {
        var data;
        if (!_.isUndefined(dataFromSvg.tooltip)) {
            data = dataFromSvg.tooltip;
        } else {
            data = dataFromSvg.y;
        }
        return data;
    };

    generateTip = function (d3, d3Node, radiusOffset) {
        var tip:any = {};
        tip.tip = '';
        tip.fadeIn = () => {
            var xx, yy, data;
            var svg = this.getSVGNode(d3Node);
            var SVGPoint = svg.createSVGPoint();
            var bBox = this.getScreenBBox(d3, SVGPoint);

            data = this.setTooltipData(bBox.data);

            var node = d3.select("body").append("div").node();

            xx = bBox['n'].x;
            yy = bBox['n'].y - radiusOffset;

            tip.tip = d3.select(node);

            tip.tip
                .html("<div class='superTooltip show top chart' style='left: -50%; transform: translate(0px, -100%);'><div name='tooltipText' class='tooltipText'>" + data + "</div></div>")
                .attr('class', 'toolTipWrapper')
                .attr('style', 'top:' + yy + 'px;left:' + xx + 'px;z-index:100000')
                .transition()
                .duration(500)
                .style('opacity', 1);

            d3.select(window).on('scroll', ()=> {
                this.removeAll(d3)
            })
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
