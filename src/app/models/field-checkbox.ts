import { FieldBase } from './field-base';

/**
 * Model object for boolean atribute fields. Extends FieldBase
 *
 * @export
 * @class BooleanField
 * @extends {FieldBase<string>}
 */
export class BooleanField extends FieldBase<string> {

  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'boolean';
  }
}
