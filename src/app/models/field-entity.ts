import {FieldBase} from './field-base';
import {TableContext} from './table-context';


/**
 * Model object for Text and numeric attribute fields. Extends FielBase
 *
 * @export
 * @class EntityField
 * @extends {FieldBase<string>}
 */
export class EntityField extends FieldBase<string> {
  public type: string;
  public tableContext: TableContext;
  public maintenanceDisplayField: string;
  public serviceUrl: string;

  constructor(options: {} = {}, tableContext: TableContext, maintenanceDisplayField: string) {
    super(options);
    this.type = options['type'] || '';
    this.controlType = 'entityField';
    this.tableContext = tableContext;
    this.maintenanceDisplayField = maintenanceDisplayField;
  }
}
