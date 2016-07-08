import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {LineChart} from './line-chart.component';

describe('Component: LineChart', () => {
    beforeEachProviders(() => [LineChart]);
    it('should make a component with svg and path, ie a line chart', inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(LineChartTested)
            .then((fixture) => {
                let compCtrl = fixture.debugElement.query(By.directive(LineChart)).componentInstance;
                expect(compCtrl.runOnce).toBeFalsy();
                fixture.detectChanges();
                let compiled = fixture.elementRef.nativeElement;
                expect(compiled).toBeTruthy();
                expect(compiled.querySelector('svg')).toBeTruthy();
                expect(compiled.querySelector('path')).toBeTruthy();

                fixture.componentInstance.chartData = [...fixture.componentInstance.chartData.reverse()];
                fixture.detectChanges();
                let compCtrl1 = fixture.debugElement.query(By.directive(LineChart)).componentInstance;
                expect(compCtrl1.runOnce).toBeTruthy();

            });
    }));
    it('should make a component with svg and path, ie a line chart', inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(LineChartTested)
            .then((fixture) => {
                let compCtrl = fixture.debugElement.query(By.directive(LineChart)).componentInstance;
                fixture.detectChanges();
                compCtrl.onResize();
                let compiled = fixture.elementRef.nativeElement;
                expect(compiled.querySelector('svg')).toBeTruthy();
            });
    }));
});

describe('Component: LineChart', () => {
    it('should make a component with svg and path, ie a line chart even if there is no config', inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(LineChartNoConfig)
            .then((fixture) => {
                fixture.detectChanges();
                let compiled = fixture.elementRef.nativeElement;
                expect(compiled).toBeTruthy();
                expect(compiled.querySelector('svg')).toBeTruthy();
                expect(compiled.querySelector('path')).toBeTruthy();
            });
    }));
});

@Component({
    selector: 'test',
    template: `
    <sh-line-chart [data]="chartData" [config]="chartConfig"></sh-line-chart>
  `,
    directives: [LineChart]
})
class LineChartTested {
    chartData = [
        {
            name: 'First Series',
            series: [
                {x: new Date('2007-04-28'), y: 104.92},
                {x: new Date('2007-05-08'), y: 105.06},

            ]
        },
        {
            name: 'Second Series',
            series: [
                {x: new Date('2007-04-28'), y: 104.92},
                {x: new Date('2007-05-08'), y: 106.06},

            ]
        },
        {
            name: 'Third Series',
            series: [
                {x: new Date('2007-04-28'), y: 116},
                {x: new Date('2007-05-08'), y: 116},

            ]
        }
    ].reverse();

    chartConfig = {
        margin: {left: 10, right: 10, bottom: 30, top: 10},
        dateFormat: "%d"
    }
}
@Component({
    selector: 'test',
    template: `
    <sh-line-chart [data]="chartData" [config]="chartConfig"></sh-line-chart>
  `,
    directives: [LineChart]
})
class LineChartNoConfig {
    chartData = [
        {
            name: 'First Series',
            series: [
                {x: new Date('2007-04-28'), y: 104.92},
                {x: new Date('2007-05-08'), y: 105.06},

            ]
        },
        {
            name: 'Second Series',
            series: [
                {x: new Date('2007-04-28'), y: 104.92},
                {x: new Date('2007-05-08'), y: 106.06},

            ]
        },
        {
            name: 'Third Series',
            series: [
                {x: new Date('2007-04-28'), y: 116},
                {x: new Date('2007-05-08'), y: 116},

            ]
        }
    ].reverse();
}

