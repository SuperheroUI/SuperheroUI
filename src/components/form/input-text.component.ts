import {Component, Input, forwardRef, Provider} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/common";

const noop = (a?, b?, c?) => {};
const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => InputTextComponent),
  multi: true
});

@Component({
  moduleId: module.id,
  selector: 'sh-input-text',
  templateUrl: 'input-text.component.html',
  styleUrls: ['input-text.component.css'],
  providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputTextComponent implements ControlValueAccessor {
  private _value:any = '';
  private _onChangeCallback:(_:any) => void = noop;
  private _onTouchedCallback:() => void = noop;

  get value():any {
    return this._value;
  };

  @Input() set value(v:any) {
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
  }

  constructor() {
  }

  writeValue(value:any):void {
    this._value = value;
  }

  registerOnChange(fn:any):void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn:any):void {
    this._onTouchedCallback = fn;
  }

}
