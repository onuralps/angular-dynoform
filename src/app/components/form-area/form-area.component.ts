import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TableContext} from '../../models/table-context';

/**
 * Component to wrap maintenance mask form area
 * Does not do anything just passes along information
 * Look at MaintenanceMaskComponent for functuality
 */
@Component({
  selector: 'app-form-area',
  templateUrl: './form-area.component.html',
  styleUrls: ['./form-area.component.scss']
})
export class FormAreaComponent implements OnInit {


  @Input() form: FormGroup;

  @Input() fields: any[];

  @Input() row: any;

  @Input() formErrors: any;

  @Input() dateOptions: any;

  @Input() isNamedMasterData: boolean;

  @Input() showTenantSelection: boolean;

  @Input() selectedTenant: string;

  @Input() tableContex: TableContext;

  @Output() numberValidation: EventEmitter<any> = new EventEmitter<any>();
  @Output() dateValidation: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectTenant: EventEmitter<any> = new EventEmitter<any>();
  @Output() ignore: EventEmitter<any> = new EventEmitter<any>();

  public date = new FormControl(new Date());

  constructor() { }

  ngOnInit() {
  }

  public onSubmit() {
  }

  public validateNumber(event: any, field: any) {
    const value = {event: event, field: field};
    this.numberValidation.emit(value);
  }

  public validateDate(event: any, field: any) {
    const value = {event: event, field: field};
    this.dateValidation.emit(value);
  }

  public ignored(event: any) {
    this.ignore.emit(event.checked);
  }

}
