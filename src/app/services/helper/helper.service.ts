import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor() { }

    prepareHttpParams(values: Object): HttpParams {
        let params = new HttpParams();
        for (const key of Object.keys(values)) {
            const value = values[key];
            if (value) {
                params = params.append(key, value.toString());
            }
        }

        return params;
    }
}
