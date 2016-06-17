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
import {InputTextComponent} from './input-text.component';
import * as _ from 'lodash';

describe('Component: InputText', () => {
    let builder:TestComponentBuilder;

    beforeEachProviders(() => [InputTextComponent]);
    beforeEach(inject([TestComponentBuilder], function (tcb:TestComponentBuilder) {
        builder = tcb;
    }));

    it('should inject the component', inject([InputTextComponent],
        (component:InputTextComponent) => {
            expect(component).toBeTruthy();
        }));

    it('should create the component', inject([], () => {
        return builder.createAsync(InputTextComponentTestController)
            .then((fixture:ComponentFixture<any>) => {
                let query = fixture.debugElement.query(By.directive(InputTextComponent));
                expect(query).toBeTruthy();
                expect(query.componentInstance).toBeTruthy();

                fixture.detectChanges();
                expect(query.componentInstance.value).toBe('tuna');
                expect(_.includes(fixture.debugElement.nativeElement.innerHTML, 'labelName'));
            });
    }));

    it('should update value of component when parent changes', inject([], () => {
        return builder.createAsync(InputTextComponentTestController)
            .then((fixture:ComponentFixture<any>) => {
                let testController = fixture.componentInstance;
                let compController = fixture.debugElement.query(By.directive(InputTextComponent)).componentInstance;

                fixture.detectChanges();
                expect(compController.value).toBe('tuna');

                testController.value1 = 'salt';
                fixture.detectChanges();
                expect(compController.value).toBe('salt');
            });
    }));

    it('should update value of parent when component changes', inject([], () => {
        return builder.createAsync(InputTextComponentTestController)
            .then((fixture:ComponentFixture<any>) => {
                let testController = fixture.componentInstance;
                let compController = fixture.debugElement.query(By.directive(InputTextComponent)).componentInstance;

                fixture.detectChanges();
                expect(compController.value).toBe('tuna');

                compController.value = 'salt';
                fixture.detectChanges();
                expect(testController.value1).toBe('salt');
            });
    }));
});

@Component({
    selector: 'test',
    template: `
    <sh-input-text [(ngModel)]="value1">labelName</sh-input-text>
  `,
    directives: [InputTextComponent]
})
class InputTextComponentTestController {
    value1 = 'tuna';
}

