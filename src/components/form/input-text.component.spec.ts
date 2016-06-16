import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { InputTextComponent } from './input-text.component';

describe('Component: InputText', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [InputTextComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([InputTextComponent],
      (component: InputTextComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(InputTextComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(InputTextComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
        console.log('query.componentInstance', query.componentInstance);
      });
  }));
});


@Component({
  selector: 'test',
  template: `
    <sh-input-text></sh-input-text>
  `,
  directives: [InputTextComponent]
})
class InputTextComponentTestController {
}

