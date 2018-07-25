import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { finalize, takeUntil } from 'rxjs/operators';

import * as moment from 'moment';

import { FlickrPhoto, FlickrResponse } from '@app/models/flickr.response';
import { FlickrService } from '@app/services/flickr/flickr.service';
import { SettingsService } from '@app/services/settings/settings.service';
import { Observable, Subject } from 'rxjs';
import { PhotoGalleryForm } from '@app/models/photos-gallery-form.model';
import { GeoData } from '@app/models/geo-data.model';

@Component({
    selector: 'pg-photos-gallery',
    templateUrl: './photos-gallery.component.html',
    styleUrls: ['./photos-gallery.component.scss']
})
export class PhotosGalleryComponent implements OnInit, OnDestroy {

    @Input() userId?: string;

    photos: FlickrPhoto[] = [];
    geoData: Array<GeoData>;

    page = 0;
    totalPages: number;
    isLoading: boolean;
    form: PhotoGalleryForm = {};
    additionalRequestParams: { [s: string]: string | number; } = {};

    private unsubscribe: Subject<void>;

    constructor(private flickrService: FlickrService, private settingsService: SettingsService) { }

    ngOnInit(): void {
        this.unsubscribe = new Subject();

        this.getPhotos(true);
    }

    getPhotos(isFirstLoading: boolean): void {
        if (this.areAllPhotosLoaded()) {
            return;
        }

        if (this.isLoading) {
            return;
        }

        this.startLoading(isFirstLoading);
        this.getPhotosMethod()
            .pipe(
                finalize(() => this.stopLoading(isFirstLoading)),
                takeUntil(this.unsubscribe)
            )
            .subscribe(res => {
                this.photos.push(...res.photos.photo);
                this.page = res.photos.page;
                this.totalPages = res.photos.pages;
                this.prepareGeoData();
                this.stopLoading(isFirstLoading);
            });
    }

    onPageEnd(): void {
        this.getPhotos(false);
    }

    onFilterSubmit(): void {
        this.photos = [];
        this.geoData = [];
        this.page = 0;
        this.prepareRequestParams();
        this.getPhotos(true);
    }

    areAllPhotosLoaded(): boolean {
        return this.page === this.totalPages && this.totalPages > 0;
    }

    private getPhotosMethod(): Observable<FlickrResponse> {
        if (this.userId) {
            return this.flickrService.getPhotos({
                page: this.page + 1,
                user_id: this.userId,
                ...this.additionalRequestParams
            });
        }

        return this.flickrService.getDogs({
            page: this.page + 1,
            ...this.additionalRequestParams
        });
    }

    private startLoading(isFirstLoading: boolean): void {
        if (isFirstLoading) {
            this.settingsService.showlobalLoadingIndicator();
        } else {
            this.isLoading = true;
        }
    }

    private stopLoading(isFirstLoading: boolean): void {
        if (isFirstLoading) {
            this.settingsService.hideGlobalLoadingIndicator();
        } else {
            this.isLoading = false;
        }
    }

    private prepareGeoData(): void {
        this.geoData = this.photos.map((photo) => {
            return { lat: +photo.latitude, lng: +photo.longitude, title: photo.title, owner: photo.ownername };
        });
    }

    private prepareRequestParams(): void {
        this.additionalRequestParams = { ...this.form };
        if (this.additionalRequestParams.min_upload_date) {
            this.additionalRequestParams.min_upload_date = moment(this.form.min_upload_date).unix();
        }

        if (this.additionalRequestParams.max_upload_date) {
            this.additionalRequestParams.max_upload_date = moment(this.form.max_upload_date).unix();
        }

    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
