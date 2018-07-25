import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SettingsService } from '@app/services/settings/settings.service';

@Component({
    selector: 'pg-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    showGlobalLoadingIndicator: Observable<boolean>;
    error: string;

    private unsubscribe: Subject<void>;

    constructor(private settingsService: SettingsService, private cdRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.unsubscribe = new Subject();

        this.showGlobalLoadingIndicator = this.settingsService.globalLoadingIndicator;

        this.settingsService.errorDescription
            .pipe(
                takeUntil(this.unsubscribe)
            )
            .subscribe((err) => {
                this.error = err;
                this.cdRef.detectChanges();
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
