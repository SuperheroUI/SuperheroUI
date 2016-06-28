import {Component, Input, forwardRef, Provider} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/common';
import * as _ from 'lodash';

const SH_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => InputSelectComponent),
    multi: true
});

@Component({
    moduleId: module.id,
    selector: 'sh-input-select',
    templateUrl: 'input-select.component.html',
    styleUrls: ['input-select.component.css'],
    providers: [SH_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputSelectComponent implements ControlValueAccessor {
    private _value:any = '';
    private _onChangeCallback:(_:any) => void = _.noop;
    private _onTouchedCallback:() => void = _.noop;
    private _popupOpen:boolean = false;

    @Input() options:Array<any>;

    get value():any {
        return this._value;
    };

    @Input() set value(v:any) {
        if (v !== this._value) {
            this._value = v;
            this._onChangeCallback(v);
        }
    }

    constructor() {}

    writeValue(value:any):void {
        this._value = value;
    }

    registerOnChange(fn:any):void {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn:any):void {
        this._onTouchedCallback = fn;
    }

    toggle() {
        this._popupOpen = !this._popupOpen;
    }

    itemClicked(item:any) {
        this.value = item;
        this._popupOpen = false;
    }

}
