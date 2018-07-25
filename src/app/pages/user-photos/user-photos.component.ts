import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'pg-user-photos-page',
    templateUrl: './user-photos.component.html',
    styleUrls: ['./user-photos.component.scss']
})
export class UserPhotosComponent implements OnInit, OnDestroy {

    userId: string;

    private unsubscribe: Subject<void>;

    constructor(private activeRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.unsubscribe = new Subject();

        this.activeRoute.params
            .pipe(
                takeUntil(this.unsubscribe)
            )
            .subscribe(routeParams => {
                this.userId = routeParams.id;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
