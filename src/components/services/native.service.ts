import {Injectable} from '@angular/core'

@Injectable()
export class NativeService {
    constructor() {}

    get window():Window {
        return window;
    }
}
