import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Time} from '@angular/common';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeComponent),
      multi: true
    }
  ]
})
export class DateTimeComponent implements ControlValueAccessor {

  public date: Date;

  public time: Time = {hours: 0, minutes: 0};

  public times: Time[] = [];

  public disabled: boolean;

  constructor() { }

  setTimes() {
    for (let i = 0; i < 24; i++) {
      this.times.push({hours: i, minutes: 0});
      this.times.push({hours: i, minutes: 15});
      this.times.push({hours: i, minutes: 30});
      this.times.push({hours: i, minutes: 45});
    }
  }

  public onTimeChange(event: any) {
    this.date.setMinutes(this.time.minutes);
    this.date.setHours(this.time.hours);
    this.propagateChange(this.date);
  }

  public onDateChange(event: any) {
    this.date.setMinutes(this.time.minutes);
    this.date.setHours(this.time.hours);
    this.propagateChange(this.date);
  }

  /**
   * propagates value to form
   * @param _
   */
  private propagateChange = (_: any) => {
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: Date): void {
    this.setTimes();
    this.date = obj;
    this.time.hours = obj.getHours();
    this.time.minutes = obj.getMinutes();
  }

}
