import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'pg-loading-indicator',
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {
    @Input() showBig: boolean;

    bars = 8;
    barClasses: string[] = [];

    constructor() { }

    ngOnInit() {
        for (let index = 0; index < this.bars; index++) {
            this.barClasses.push(`rect${index + 1}`);
        }
    }
}
