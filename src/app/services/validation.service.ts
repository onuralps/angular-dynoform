import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as _ from 'underscore';
import {MasterDataTable} from '../models/object-config-model';
import {ValidationExtension} from './validation-extension.interface';

/**
 * Validation object
 * has the required attributes to generate form errors
 */
export class ValidationObject {
  fieldName: string;
  errorName: string;
  message: string;
}


/**
 * Service to handle Validations.
 *
 * Custom validations implement ValidationExtension interface validate method
 * Each custom validation method takes formGroup as parameter and returns an array of ValidationObject
 * This array of validation objects are processed in maintenance mask.
 * Ex.
 * public validate(form: FormGroup){
 *    const validationObjects: ValidationObjects = [];
 *    if(validationLogic){
 *      validationObjects.push({fieldName: 'field', errorName: 'error', message: 'message'})
 *    }
 *    return validationObjects;
 * }
 *
 * In constructor, the table that has the custom validation, is added to customValidations Map
 * with the custom validation it has.
 *
 * Ex.
 * this.customValidations.set('TableName', this.taxDataCustomization.validate)
 *
 * In MaintenanceMaskComponent, it is checked if there is any custom validation for given table,
 * checkForCustomValidations method returns custom validation methods.
 *
 * Custom validation methods are executed in maintenance mask component
 *
 *
 */

@Injectable()
export class ValidationService {

  /**
   * Custom validations map
   * Holds the information that which validations will be executed fro a given table
   */
  private customValidations: Map<string, ValidationExtension>;

  /**
   * Constructor for Service
   * custom validations map is filled in constructor
   */
  constructor() {
    this.customValidations = new Map();
  }

  /**
   * method to generates form errors for form
   *
   * @param {*} table
   * @returns
   *
   * @memberOf ValidationService
   */
  public generateFormErrors(table: any) {
    const formErrors: any = {};
    for (const group of table.groups) {
      for (const attribute of group.attributes) {
        formErrors[attribute.name] = '';
      }
    }
    return formErrors;
  }

  /**
   * Method to set generic form errors
   * required, maxLength, minLength and regex
   *
   * @param formErrors
   * @param form
   * @param fields
   */
  public setGenericFormErrors(formErrors: any, form: FormGroup, fields: any[]) {
    for (const fieldName in formErrors) {
      if (true) {
        const control = form.get(fieldName);
        if (control && !control.valid) {
          for (const key in control.errors) {
            if (true) {
              switch (key) {
                case 'required':
                  formErrors[fieldName] = 'this field is mandatory';
                  break;
                case 'maxlength':
                  const fieldMax = _.find(fields, function (item) {
                    return item.key === fieldName;
                  });
                  formErrors[fieldName] = 'has a maximum text length of ' + fieldMax.constraints.maxLength + ' characters';
                  break;
                case 'minlength':
                  const fieldMin = _.find(fields, function (item) {
                    return item.key === fieldName;
                  });
                  formErrors[fieldName] = 'has a minimum text length of ' + fieldMin.constraints.minLength + ' characters';
                  break;
                case 'pattern':
                  const fieldRegex = _.find(fields, function (item) {
                    return item.key === fieldName;
                  });
                  formErrors[fieldName] = fieldRegex.constraints.regexMessage;
                  break;
                case 'number':
                  const fieldNumber = _.find(fields, function (item) {
                    return item.key === fieldName;
                  });
                  const min = fieldNumber.constraints.min === 0 || fieldNumber.constraints.min ? fieldNumber.constraints.min : '-99999999';
                  const max = fieldNumber.constraints.max === 0 || fieldNumber.constraints.max ? fieldNumber.constraints.max : '99999999';
                  formErrors[fieldName] = 'field needs to be a number between ' + min + ' and ' + max;
                  break;
              }
            }
          }
        }
      }
    }
  }

  /**
   * Method that returns custom validations if exists
   *
   * @param tableName
   * @returns {undefined|Function[]}
   */
  public checkForCustomValidation(tableName: string) {
    return this.customValidations.get(tableName);
  }

  /**
   * Sets error messages for invalid fields
   *
   * @private
   *
   * @memberOf MaintenanceMaskComponent
   */
  public setFormErrors(form: FormGroup, formErrors: any, fields: any[], table: MasterDataTable) {
    this.setGenericFormErrors(formErrors, form, fields);
    const customValidation = this.checkForCustomValidation(table.name);
    if (customValidation) {
      const validations: ValidationObject[] = customValidation.validate(form);
      for (const validation of validations) {
        form.controls[validation.fieldName].setErrors({[validation.errorName]: true});
        formErrors[validation.fieldName] = validation.message;
      }
    }

  }

}
