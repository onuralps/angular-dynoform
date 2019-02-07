import { FieldBase } from './field-base';

/**
 * Model object for enum attribute fields. Extends FieldBase
 *
 * @export
 * @class DropdownField
 * @extends {FieldBase<string>}
 */
export class DropdownField extends FieldBase<string> {
  public options: {value: string, label: string}[] = [];
  public multiple: boolean;

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
    this.multiple = options['multiple'] || false;
    this.controlType = 'dropdown';
  }
}
