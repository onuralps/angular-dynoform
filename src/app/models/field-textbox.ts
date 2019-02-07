import { FieldBase } from './field-base';


/**
 * Model object for Text and numeric attribute fields. Extends FielBase
 *
 * @export
 * @class TexBoxField
 * @extends {FieldBase<string>}
 */
export class TexBoxField extends FieldBase<string> {
  public type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.controlType = 'textbox';
  }
}
