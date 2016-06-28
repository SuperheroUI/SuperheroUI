import {Component, Input, forwardRef, Provider} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/common';
import * as _ from 'lodash';
import {NativeService} from "../services/native.service";

const SH_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => InputSelectComponent),
    multi: true
});

class InputSelectClasses {
    opened = false;
    closed = true;
    openUp = false;
    openDown = true;
}

@Component({
    moduleId: module.id,
    selector: 'sh-input-select',
    templateUrl: 'input-select.component.html',
    styleUrls: ['input-select.component.css'],
    providers: [SH_INPUT_CONTROL_VALUE_ACCESSOR, NativeService]
})
export class InputSelectComponent implements ControlValueAccessor {
    private _value:any = '';
    private _onChangeCallback:(_:any) => void = _.noop;
    private _onTouchedCallback:() => void = _.noop;
    private _popupOpen:boolean = false;
    private _classes:InputSelectClasses = new InputSelectClasses;

    private window:Window;

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

    constructor(nativeService: NativeService) {
        this.window = nativeService.window;
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

    popupToggle(element:Element) {
        if (this._popupOpen) {
            this.popupClose();
        } else {
            this.popupOpen(element);
        }
    }

    popupOpen(element:Element) {
        this._popupOpen = true;
        this._classes.opened = true;
        this._classes.closed = false;

        console.log(this.window.innerHeight);
        console.log(element.getBoundingClientRect().bottom);
        console.log(this.window.innerHeight - element.getBoundingClientRect().bottom);

        if (this.window.innerHeight - element.getBoundingClientRect().bottom < 200) {
            this._classes.openUp = true;
            this._classes.openDown = false;
        } else {
            this._classes.openUp = false;
            this._classes.openDown = true;
        }
    }

    popupClose() {
        this._popupOpen = false;
        this._classes.opened = false;
        this._classes.closed = true;
    }

    itemClicked(item:any) {
        this.value = item;
        this.popupClose();
    }


}
