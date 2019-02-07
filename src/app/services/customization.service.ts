import {Injectable} from '@angular/core';
import {MaintenanceMaskCustomizationExtension} from './customization-extension.interface';
import {BeforeSubmitCustomizations} from './before-submit-extension.interface';

/**
 * Customization service for MaintenanceMaskComponent
 *
 * 1. MaintenanceMaskCustomizationExtension interface is implemented.
 * 2. add customize function for table to 'customMethods' map
 * Ex.
 *
 * export TableCustomization implements MaintenanceMaskCustomizationExtension {
 *  public customize(form: FormGroup) {
 *     do something special with form
 *  }
 * }
 * after that, here in constructor:
 * this.customMethods.set("TableName", this.tableCustomization.customize);
 *
 * !!! Important: custom function needs to take FormGroup as parameter
 *
 */

@Injectable()
export class CustomizationService {


  /**
   * customMethods map that holds the information that which table
   * is going to run which custom maintenance method
   */
  private customMethods: Map<string, MaintenanceMaskCustomizationExtension>;

  private beforeSubmitCustomMethods: Map<string, BeforeSubmitCustomizations>;

  /**
   * Constructor of CustomizzationService
   * customMethods map is set here for different tables
   */
  constructor() {
    this.customMethods = new Map();
    this.beforeSubmitCustomMethods = new Map();
  }

  /**
   * Gets custom maintenance methods for a given table
   *
   * @param table
   * @returns {undefined|Function}
   */
  public getExtensionPoint(table: string) {
    return this.customMethods.get(table);
  }

  /**
   *
   * @param tableName
   * @returns {undefined|MaintenanceMaskCustomizationExtension}
   */
  public getBeforeSubmitExtensionPoint(tableName: string) {
    return this.beforeSubmitCustomMethods.get(tableName);
  }

}
