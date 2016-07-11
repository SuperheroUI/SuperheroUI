import {Component, Input, ElementRef, TemplateRef, ContentChild, Directive, forwardRef, Provider} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/common";
import * as _ from "lodash";
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

export class InputSelectConfig {
    constructor(public type:'single' | 'multi' = 'single',
                public idField:string = null) { }
}

@Directive({selector: '[sh-input-option]'})
export class InputOptionComponent {
    //noinspection JSUnusedGlobalSymbols
    constructor(public templateRef:TemplateRef<any>) {
    }
}

@Component({
    moduleId: module.id,
    selector: 'sh-input-select',
    templateUrl: 'input-select.component.html',
    styleUrls: ['input-select.component.css'],
    host: {
        '(document:click)': 'checkDocumentEvent($event)',
        '(document:keyup)': 'checkDocumentEvent($event)'
    },
    providers: [SH_INPUT_CONTROL_VALUE_ACCESSOR, NativeService]
})
export class InputSelectComponent implements ControlValueAccessor {
    private _value:any = '';
    private _onChangeCallback:(_:any) => void = _.noop;
    private _onTouchedCallback:() => void = _.noop;
    private _popupOpen:boolean = false;
    private _classes:InputSelectClasses = new InputSelectClasses;
    private window:Window;

    @ContentChild(InputOptionComponent) itemTemplate:InputOptionComponent;

    @Input() config:InputSelectConfig = new InputSelectConfig();
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

    constructor(private _element:ElementRef, nativeService:NativeService) {
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

    showTitleTemplate():boolean {
        if (this.itemTemplate) {
            if (this.isSingleSelect()) {
                if (!_.isUndefined(this.value) && this.value !== null) {
                    return true;
                }
            } else {
                if (this.value && this.value.length === 1) {
                    return true;
                }
            }
        }
        return false;
    }

    getTitle():string {
        if (this.isSingleSelect()) {
            if (_.isUndefined(this.value) || this.value === null) {
                return 'Select';
            } else {
                if (this.config.idField) {
                    var search = {};
                    _.set(search, this.config.idField, this.value);
                    return _.find(this.options, search);
                } else {
                    return this.value;
                }
            }
        } else {
            if (_.isEmpty(this.value)) {
                return 'Select';
            } else if (this.value.length === this.options.length) {
                return 'All Selected';
            } else if (this.value.length === 1) {
                if (this.config.idField) {
                    var search = {};
                    _.set(search, this.config.idField, this.value[0]);
                    return _.find(this.options, search);
                } else {
                    return this.value[0];
                }
            } else {
                return this.value.length + ' Selected';
            }
        }
    }

    checkDocumentEvent(event):void {
        if (this._popupOpen && !_.includes(event.path, this._element.nativeElement)) {
            this.popupClose();
        }
    }

    popupToggle() {
        if (this._popupOpen) {
            this.popupClose();
        } else {
            this.popupOpen();
        }
    }

    popupOpen() {
        this._popupOpen = true;
        this._classes.opened = true;
        this._classes.closed = false;

        if (this.window.innerHeight - this._element.nativeElement.getBoundingClientRect().bottom < 200) {
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

    isSingleSelect():boolean {
        return this.config.type === 'single';
    }

    getItemValue(item:any) {
        if (this.config.idField) {
            return _.get(item, this.config.idField);
        } else {
            return item;
        }
    }

    getItemClasses(item:any) {
        let isSelected = false;

        if (this.isSingleSelect()) {
            if (this.value == this.getItemValue(item)) {
                isSelected = true;
            }
        } else {
            if (_.includes(this.value, this.getItemValue(item))) {
                isSelected = true;
            }
        }

        return {
            itemSelected: isSelected,
            itemUnselected: !isSelected
        };
    }

    itemClicked(item:any) {
        if (this.isSingleSelect()) {
            this.value = this.getItemValue(item);
            this.popupClose();
        } else {
            if (!this.value) {
                this.value = [];
            }

            if (_.includes(this.value, this.getItemValue(item))) {
                _.pull(this.value, this.getItemValue(item));
            } else {
                this.value.push(this.getItemValue(item));
            }
        }
    }

    navigate(direction:number, element:Element) {
        if (!this._popupOpen) {
            this.popupOpen();
        }

        if (!element) {
            element = this._element.nativeElement.getElementsByClassName('popup')[0].lastElementChild;
        }

        let nextElement:HTMLElement = null;
        if (direction === 1) {
            nextElement = <HTMLElement> element.nextElementSibling;
            if (!nextElement) {
                nextElement = <HTMLElement> element.parentElement.firstElementChild;
            }
        } else {
            nextElement = <HTMLElement> element.previousElementSibling;
            if (!nextElement) {
                nextElement = <HTMLElement> element.parentElement.lastElementChild;
            }
        }

        nextElement.focus();
    }
}
