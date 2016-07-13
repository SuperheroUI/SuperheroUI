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
import {GaugeChart} from './gauge-chart.component';

describe('Component: GaugeChart', () => {
    beforeEachProviders(() => [GaugeChart]);
    it('should make a component with svg and path, ie a gauge chart', inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(GaugeChartTested)
            .then((fixture) => {
                let compCtrl = fixture.debugElement.query(By.directive(GaugeChart)).componentInstance;
                expect(compCtrl.runOnce).toBeFalsy();
                fixture.detectChanges();
                let compiled = fixture.elementRef.nativeElement;
                setTimeout(function () {
                    expect(compiled).toBeTruthy();
                    expect(compiled.querySelector('svg')).toBeTruthy();
                    expect(compiled.querySelector('rect')).toBeTruthy();
                });
            });
    }));
    it('should make a component redraw after resize', inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(GaugeChartTested)
            .then((fixture) => {
                let compCtrl = fixture.debugElement.query(By.directive(GaugeChart)).componentInstance;
                fixture.detectChanges();
                compCtrl.onResize();
                let compiled = fixture.elementRef.nativeElement;
                setTimeout(function(){
                    expect(compiled.querySelector('svg')).toBeTruthy();
                })
            });
    }));
});

describe('Component: Gauge test', () => {
    it('should make a component with svg and path, ie a gauge chart even if there is no config', inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(GaugeChartNoConfig)
            .then((fixture) => {
                fixture.detectChanges();
                let compiled = fixture.elementRef.nativeElement;
                setTimeout(function () {
                    expect(compiled).toBeTruthy();
                    expect(compiled.querySelector('svg')).toBeTruthy();
                    expect(compiled.querySelector('rect')).toBeTruthy();
                })

            });
    }));
});

@Component({
    selector: 'test',
    template: `<sh-gauge-chart [data]="chartData" [config]="chartConfig"></sh-gauge-chart>`,
    directives: [GaugeChart]
})
class GaugeChartTested {
    chartData = .7;
    chartConfig:any = {};
}

@Component({
    selector: 'test',
    template: `<sh-gauge-chart [data]="chartData"></sh-gauge-chart>`,
    directives: [GaugeChart]
})
class GaugeChartNoConfig {
    chartData = .7;
}

