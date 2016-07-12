import {
    beforeEachProviders,
    it,
    describe,
    expect,
    inject
} from '@angular/core/testing';
import {TooltipService} from './tooltip.service';

describe('Tooltip Service', () => {
    var fakeOffset, append, fakeD3, fakeD3Node, fakeSVGPoint, fakeSVG;
    beforeEachProviders(() => [TooltipService]);

    beforeEach(function () {
        fakeOffset = 5;

        append = {
            attr: function () {
                return append;
            },
            style: function () {
                return append;
            },
            append: function () {
                return append;
            },
            text: function () {
                return append;
            },
            transition: function () {
                return append;
            },
            duration: function () {
                return append;
            },
            remove: function () {
                return append;
            },
            node: function () {
                return append;
            },
            html: function () {
                return append;
            },
            parentNode: function () {
                return append;
            },
            on: function () {
                return append;
            }
        };

        fakeSVG = {
            tagName: 'svg',
            ownerSVGElement: 'svg',
            __data__: {
                axis: 'emails',
                tooltip: 'ToolTips'
            },
            getScreenCTM: function () {
                return {
                    a: 1,
                    b: 0,
                    c: 0,
                    d: 1,
                    e: 265,
                    f: 171
                };
            },
            getBBox: function () {
                return {
                    height: 10,
                    width: 10,
                    x: -5,
                    y: 215
                };
            },
            createSVGPoint: function () {
                return {
                    x: 0,
                    y: 0,
                    matrixTransform: function () {
                        return {
                            x: 280,
                            y: 165
                        };
                    }
                };
            }
        };


        fakeSVGPoint = fakeSVG.createSVGPoint();

        fakeD3 = {
            event: {
                target: fakeSVG
            },
            select: function () {
                return append;
            },
            selectAll: function () {
                return append;
            }
        };

        fakeD3Node = {
            node: function () {
                return fakeSVG;
            }
        };
    });

    it('should have functions that are used by charts...',
        inject([TooltipService], (service:TooltipService) => {
            var tooltip = service.generateTip(fakeD3, fakeD3Node, 5);
            expect(service.generateTip).toBeTruthy();
            expect(tooltip.fadeIn).toBeTruthy();
            expect(tooltip.fadeOut).toBeTruthy();
            tooltip.fadeIn();
            tooltip.fadeOut();
        }));
    it('should have a function to remove tool tips on scroll so they do not get left behind',
        inject([TooltipService], (service:TooltipService) => {
            expect(service.removeAll).toBeTruthy();
            service.removeAll(fakeD3);
        }));

    it('should set data to y value if a tooltip is not found',
        inject([TooltipService], (service:TooltipService) => {
            expect(service.setTooltipData({y:'one'})).toBe('one');
            expect(service.setTooltipData({tooltip:'tip'})).toBe('tip');
        }));
});
