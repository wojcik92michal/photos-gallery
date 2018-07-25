import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PhotoComponent } from './components/photo/photo.component';
import { PhotosGalleryComponent } from './components/photos-gallery/photos-gallery.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

import { HelperService } from '@app/services/helper/helper.service';
import { FlickrService } from '@app/services/flickr/flickr.service';
import { SettingsService } from '@app/services/settings/settings.service';
import { CustomErrorHandlerService } from '@app/services/custom-error-handler/custom-error-handler.service';
import { ErrorComponent } from './components/error/error.component';

import { UserPhotosComponent } from '@app/pages/user-photos/user-photos.component';
import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';

import { AppRoutingModule } from '@app/app-routing.module';
import { AngularMaterialModule } from '@app/other/angular-material/angular-material.module';
import { OfflineComponent } from './components/offline/offline.component';
import { environment } from '@env/environment';

@NgModule({
    declarations: [
        AppComponent,

        DashboardComponent,
        UserPhotosComponent,

        GalleryComponent,
        PhotoComponent,
        PhotosGalleryComponent,
        LoadingIndicatorComponent,
        ErrorComponent,
        OfflineComponent,

        InfiniteScrollDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,

        AgmCoreModule.forRoot({
            apiKey: environment.googleMapsApiKey
        }),

        AngularMaterialModule,
    ],
    providers: [
        HelperService,
        FlickrService,
        {
            provide: ErrorHandler,
            useClass: CustomErrorHandlerService
        },
        SettingsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
