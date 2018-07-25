import { NativeDateAdapter } from '@angular/material';

import * as moment from 'moment';

import { AppSettings } from '@app/app.settings';

export class CustomDateAdapter extends NativeDateAdapter {

   format(date: Date, displayFormat: any): string {
       return moment(date).format(AppSettings.momentDateFormat);
   }
}
