import { Component, Input, OnChanges, OnInit } from '@angular/core';

import * as moment from 'moment';

import { FlickrPhoto } from '@app/models/flickr.response';
import { AppSettings } from '@app/app.settings';

@Component({
    selector: 'pg-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit, OnChanges {

    @Input() photo: FlickrPhoto;

    url: string;
    photoDate: any;
    userUrl: string;
    title: string;
    photoDescription: string;

    constructor() { }

    ngOnInit(): void {
        this.preparePhotoData();
    }

    ngOnChanges(): void {
        this.preparePhotoData();
    }

    private preparePhotoData(): void {
        const p = this.photo;
        this.url = `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}_n.jpg`;
        this.photoDate = moment.unix(+p.dateupload).format(AppSettings.momentDateTimeFormat);
        this.title = p.title;
        this.photoDescription = this.photo.description._content.trim();

        this.userUrl = `/user/${p.owner}`;
    }
}
