import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Tooltip} from "./tooltip.directive";
import {TooltipTemplate} from "./tooltip.component";

describe('Component: tip', () => {
    describe('tip', () => {
        let builder:TestComponentBuilder;

        beforeEachProviders(() => [Tooltip]);
        beforeEach(inject([TestComponentBuilder], function (tcb:TestComponentBuilder) {
            builder = tcb;
        }));

        it('should create the component', inject([], () => {
            return builder.createAsync(TestController)
                .then((fixture:ComponentFixture<any>) => {

                    let testController = fixture.componentInstance;
                    let query = fixture.debugElement.query(By.directive(Tooltip));
                    fixture.detectChanges();
                    expect(query).toBeTruthy();
                    let div = fixture.nativeElement.querySelector('span');
                    fixture.detectChanges();

                    var evObj = document.createEvent('Events');
                    evObj.initEvent('mouseenter', true, false);

                    document.getElementById('my-test').dispatchEvent(evObj);
                    fixture.detectChanges();
                    console.log(document.getElementById('my-test'));
                    console.log(document.querySelectorAll('.toolTipWrapper'));
                });
        }));
    });
});
    @Component({
        selector: 'test',
        template: `
        <span id="my-test" shTooltip="Oh The Places You'll Go" [shTooltipConfig]="toolTipConfig">labelName</span>

    `,
        directives: [TooltipTemplate, Tooltip]

    })
    class TestController {
        toolTipConfig = {
            position: 'top'
        };

    }

