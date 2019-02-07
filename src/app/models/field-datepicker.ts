import { FieldBase } from './field-base';


/**
 * Model object for Text and numeric attribute fields. Extends FielBase
 *
 * @export
 * @class DatePickerField
 * @extends {FieldBase<string>}
 */
export class DatePickerField extends FieldBase<string> {

  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'datepicker';
  }
}
