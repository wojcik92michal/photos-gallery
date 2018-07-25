import { Component, Input } from '@angular/core';

@Component({
    selector: 'pg-error-bar',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
    @Input() error: string;
}
