import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateService {

  constructor() { }

  /**
   * Converts IMyDate to utc timestamp
   */
  public myDateToUtcTimestamp(value: any): any {
    const date = {
      year: value.date.year,
      month: value.date.month - 1,
      day: value.date.day
    };
    const momentValue = moment.utc(date);
    return momentValue.valueOf();
  }

  /**
   * Converts timestamp to IMyDate
   */
  public utcTimestampToMyDate(value: any) {
    if (value === 0 || value) {
      const momentDate = moment.utc(value);
      const model: Object = {
        date: {
          year: momentDate.year(),
          month: momentDate.month() + 1,
          day: momentDate.date()
        }
      };
      return model;
    }
    return value;
  }
}
