/**
 * Model object of the dynamic fields
 *
 * @export
 * @class FieldBase
 * @template T
 */

export class FieldBase<T>{
  public value: T;
  public key: string;
  public label: string;
  public required: boolean;
  public controlType: string;
  public constraints: any;
  public editable: boolean;
  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      editable?: boolean,
      order?: number,
      controlType?: string,
      constraints?: any
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = options.required;
    this.editable = options.editable;
    this.controlType = options.controlType || '';
    this.constraints = options.constraints;
  }
}
