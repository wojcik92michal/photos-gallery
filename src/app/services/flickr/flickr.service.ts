import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HelperService } from '@app/services/helper/helper.service';
import { FlickrResponse } from '@app/models/flickr.response';
import { FlickrSettings } from '@app/services/flickr/flickr.settings';
import { FlickrStatus, FlickrPrivacyFilter } from '@app/consts/flickr.const';
import { SettingsService } from '@app/services/settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class FlickrService {

    constructor(private http: HttpClient, private helper: HelperService, private settingsService: SettingsService) { }

    getDogs(callParams: Object): Observable<FlickrResponse> {
        return this.getPhotos({
            ...callParams,
            tags: 'dog,dogs',
        });
    }

    getPhotos(callParams: Object): Observable<FlickrResponse> {
        const baseParams = {
            ...callParams,
            method: 'flickr.photos.search',
            extras: 'description,date_upload,geo,owner_name,url_n',
            per_page: 100,
            nojsoncallback: 1,
            privacy_filter: FlickrPrivacyFilter.public,
            tag_mode: 'any',
            has_geo: 1
        };

        const params = this.getParams(baseParams);
        return this.http.get<FlickrResponse>(FlickrSettings.apiUrl, { params })
            .pipe((
                map(data => {
                    if (data.status !== FlickrStatus.ok) {
                        throwError(data);
                    }
                    return data;
                })
            ));
    }

    private getParams(additionalParams: Object): HttpParams {
        const flickrParams = {
            api_key: environment.flickrApiKey,
            format: 'json'
        };

        const finalParams = { ...flickrParams, ...additionalParams };

        return this.helper.prepareHttpParams(finalParams);
    }
}
