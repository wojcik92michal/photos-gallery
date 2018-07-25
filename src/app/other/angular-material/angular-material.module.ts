import { NgModule } from '@angular/core';
import {
    MatDatepickerModule,
    MatNativeDateModule,
    DateAdapter,
    MatIconModule,
} from '@angular/material';

import { CustomDateAdapter } from '@app/other/custom-date-adapter/custom-date.adapter';
@NgModule({
    exports: [
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule
    ],
    providers: [
        { provide: DateAdapter, useClass: CustomDateAdapter },
    ]
})
export class AngularMaterialModule { }
