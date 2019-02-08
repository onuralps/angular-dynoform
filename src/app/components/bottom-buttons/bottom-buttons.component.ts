import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

/**
 * Component to wrap maintenance mask buttons
 * Does not do anything, just passes along information
 *  * Look at MaintenanceMaskComponent for functuality

 */
@Component({
  selector: 'app-bottom-buttons',
  templateUrl: './bottom-buttons.component.html',
  styleUrls: ['./bottom-buttons.component.scss']
})
export class BottomButtonsComponent implements OnInit {

  @Input() form: FormGroup;

  @Input() saveButton: boolean;

  @Input() cancelButton: boolean;

  @Input() deleteButton = false;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() del: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.submit.emit();
  }

  public onCancel() {
    this.cancel.emit();
  }

  public onDelete() {
    this.del.emit();
  }

}
