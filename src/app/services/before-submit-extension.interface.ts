/**
 * Interface for customizations before submitting an object on maintenance mask
 */
import {TableContext} from '../models/table-context';


export interface BeforeSubmitCustomizations {

  /**
   * implement this method to customize objectToSubmit before it is submitted
   * @param objectToSubmit
   * @param tableContext
   */
  beforeSubmit(objectToSubmit: any, tableContext: TableContext): any;
}
