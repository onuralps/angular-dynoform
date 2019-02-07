import {FormGroup} from '@angular/forms';
import {TableContext} from '../models/table-context';

/**
 * Interface to customize maintenance mask
 */
export interface MaintenanceMaskCustomizationExtension {
  customize(row: any, form: FormGroup, fields: any[], tableContext: TableContext): void;
}
