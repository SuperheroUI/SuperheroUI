import {Component, Input, forwardRef, Provider, TemplateRef, ViewContainerRef, IterableDiffers} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/common';
import * as _ from 'lodash';

const MD_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => InputSelectComponent),
    multi: true
});

@Component({
    moduleId: module.id,
    selector: 'sh-input-text',
    templateUrl: 'input-text.component.html',
    styleUrls: ['input-text.component.css'],
    providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputSelectComponent implements ControlValueAccessor {
    private _value:any = '';
    private _onChangeCallback:(_:any) => void = _.noop;
    private _onTouchedCallback:() => void = _.noop;

    //noinspection JSUnusedGlobalSymbols
    get value():any {
        return this._value;
    };

    //noinspection JSUnusedGlobalSymbols
    @Input() set value(v:any) {
        if (v !== this._value) {
            this._value = v;
            this._onChangeCallback(v);
        }
    }

    constructor(private _viewContainer:ViewContainerRef, private _templateRef:TemplateRef) {}

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
