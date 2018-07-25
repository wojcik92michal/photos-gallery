import { Component, Input } from '@angular/core';
import { FlickrPhoto } from '@app/models/flickr.response';

@Component({
    selector: 'pg-gallery-presenter',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
    @Input()  photos: FlickrPhoto[];
}
