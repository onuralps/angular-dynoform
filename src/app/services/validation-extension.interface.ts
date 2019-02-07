import {FormGroup} from '@angular/forms';
import {ValidationObject} from './validation.service';

/**
 * Interface that used for custom validations
 */
export interface ValidationExtension {
  validate(form: FormGroup): ValidationObject[];
}
