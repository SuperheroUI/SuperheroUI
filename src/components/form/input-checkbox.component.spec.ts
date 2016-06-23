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
import {InputCheckboxComponent} from './input-checkbox.component';
import * as _ from 'lodash';

describe('Component: InputCheckbox', () => {
    let builder:TestComponentBuilder;

    beforeEachProviders(() => [InputCheckboxComponent]);
    beforeEach(inject([TestComponentBuilder], function (tcb:TestComponentBuilder) {
        builder = tcb;
    }));

    it('should inject the component', inject([InputCheckboxComponent],
        (component:InputCheckboxComponent) => {
            expect(component).toBeTruthy();
        }));

    it('should create the component', inject([], () => {
        return builder.createAsync(InputCheckboxComponentTestController)
            .then((fixture:ComponentFixture<any>) => {
                let query = fixture.debugElement.query(By.directive(InputCheckboxComponent));
                expect(query).toBeTruthy();
                expect(query.componentInstance).toBeTruthy();

                fixture.detectChanges();
                expect(query.componentInstance.value).toBeTruthy();
                expect(_.includes(fixture.debugElement.nativeElement.innerHTML, 'labelName'));
            });
    }));

    it('should update value of component when parent changes', inject([], () => {
        return builder.createAsync(InputCheckboxComponentTestController)
            .then((fixture:ComponentFixture<any>) => {
                let testController = fixture.componentInstance;
                let compController = fixture.debugElement.query(By.directive(InputCheckboxComponent)).componentInstance;

                fixture.detectChanges();
                expect(compController.value).toBeTruthy();

                testController.value1 = false;
                fixture.detectChanges();
                expect(compController.value).toBeFalsy();
            });
    }));

    it('should update value of parent when component changes', inject([], () => {
        return builder.createAsync(InputCheckboxComponentTestController)
            .then((fixture:ComponentFixture<any>) => {
                let testController = fixture.componentInstance;
                let compController = fixture.debugElement.query(By.directive(InputCheckboxComponent)).componentInstance;

                fixture.detectChanges();
                expect(compController.value).toBeTruthy();

                compController.value = false;
                fixture.detectChanges();
                expect(testController.value1).toBeFalsy();
            });
    }));
});

@Component({
    selector: 'test',
    template: `
    <sh-input-checkbox [(ngModel)]="value1">labelName</sh-input-checkbox>
  `,
    directives: [InputCheckboxComponent]
})
class InputCheckboxComponentTestController {
    value1 = true;
}

