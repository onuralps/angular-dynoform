import {Injectable} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MasterDataAttribute, MasterDataEntityAttribute, MasterDataEnumAttribute, MasterDataTable} from '../models/object-config-model';
import {FieldBase} from '../models/field-base';
import {TexBoxField} from '../models/field-textbox';
import {DropdownField} from '../models/field-dropdown';
import {BooleanField} from '../models/field-checkbox';
import {DatePickerField} from '../models/field-datepicker';
import {EntityField} from '../models/field-entity';
import {TableContext} from '../models/table-context';
import * as _ from 'underscore';
import {DateService} from './date.service';


/**
 * Service that has required operations to create a dynamic form
 *
 * @export
 * @class ConfigurationService
 */
@Injectable()
export class ConfigurationService {

  constructor(private dateService: DateService) {
  }

  /**
   * Generates fields that are going to be shown on maintenance mask ui
   *
   * @param table
   * @param row
   * @returns {FieldBase<any>[]}
   */
  public generateFields(table: MasterDataTable, row: any) {
    const fields: FieldBase<any>[] = [];
    for (const group of table.groups) {
      for (const attribute of group.attributes) {
        if (attribute.visible && attribute.shownOnMaintenance && !_.contains(['ignored', 'changeTime', 'releaseStatus'], attribute.name)) {
          const field: FieldBase<any> = this.createField(attribute, row, table);
          if (field) {
            fields.push(field);
          }
        }
      }
    }
    return fields;
  }

  /**
   * Generates a formGroup from given fields array row and tenant
   *
   * @param fields
   * @param row
   * @param table
   * @param tenants
   * @returns {FormGroup}
   */
  public toFormGroup(fields: FieldBase<any>[], row: any, table: MasterDataTable) {
    const group: any = {};

    fields.forEach(field => {
      if (field instanceof BooleanField) {
        group[field.key] = field.required ? new FormControl(field.value ? field.value : false, Validators.required)
          : new FormControl(field.value ? field.value : false);

      } else if (field instanceof TexBoxField && field.constraints !== undefined) {
        const validators: ValidatorFn[] = [];
        if (field.constraints.required) {
          validators.push(Validators.required);
        }
        if (field.constraints.minLength) {
          validators.push(Validators.minLength(field.constraints.minLength));
        }
        if (field.constraints.maxLength) {
          validators.push(Validators.maxLength(field.constraints.maxLength));
        }
        if (field.constraints.regex) {
          validators.push(Validators.pattern(new RegExp(field.constraints.regex)));
        }
        group[field.key] = new FormControl(field.value, validators);

      } else if (field instanceof DropdownField && field.multiple) {
        group[field.key] = field.required ? new FormControl(field.value ? field.value : [], Validators.required)
          : new FormControl(field.value);
      } else if (field instanceof DatePickerField) {
        group[field.key] = new FormControl(field.value ? new Date(field.value) : new Date());
      } else if (field.controlType === 'exclusion') {
        group[field.key] = new FormControl(field.value ? field.value : []);
      } else {
        group[field.key] = field.required ? new FormControl(field.value ? field.value : '', Validators.required)
          : new FormControl(field.value);
      }

      if (!field.editable) {
        group[field.key].disable();
      }
    });
    return new FormGroup(group);
  }

  private createField(attribute: MasterDataAttribute, row: any, table: MasterDataTable): FieldBase<any> {
    const attributeOptions = {
      key: attribute.name,
      label: attribute.label ? attribute.label : attribute.name,
      value: row[attribute.name],
      constraints: attribute.constraints,
      required: attribute.constraints.required,
      editable: attribute.editable
    };
    let field: FieldBase<any>;
    switch (attribute.type) {
      case 'text':
      case 'textarea': {
        field = new TexBoxField(Object.assign(attributeOptions, {
          type: attribute.type,
          value: (row[attribute.name] || row[attribute.name] === 0 ? row[attribute.name] : '')
        }));
        break;
      }
      case 'integer':
      case 'decimal': {
        field = new TexBoxField(Object.assign(attributeOptions, {
          type: 'number',
          value: (row[attribute.name] || row[attribute.name] === 0 ? row[attribute.name] : '')
        }));
        break;
      }
      case 'select': {
        const enumAttribute = attribute as MasterDataEnumAttribute;
        const enumOptions: { value: string, label: string }[] = [];
        if (!enumAttribute.multiple) {
          enumOptions.push({value: '', label: ''});
        }
        field = new DropdownField(Object.assign(attributeOptions, {
          options: enumOptions,
          multiple: enumAttribute.multiple
        }));
        break;
      }

      case 'boolean': {
        field = new BooleanField(Object.assign(attributeOptions, {
          value: row[attribute.name] === null ? false : row[attribute.name],
        }));
        break;
      }

      case 'date':
      case 'datetime': {
        field = new DatePickerField(Object.assign(attributeOptions, {
          value: row[attribute.name]
        }));
        break;
      }

      case 'entityField': {
        const entityAttribute = attribute as MasterDataEntityAttribute;
        let context: TableContext;
        if (entityAttribute.tableName) {
          context = new TableContext(new MasterDataTable());
           }
        field = new EntityField(Object.assign(attributeOptions, {
          type: 'entityField'
        }), context, entityAttribute.maintenanceDisplayField);
        break;
      }

      case 'vehiclePatternSelection' : {
        field = new FieldBase(Object.assign(attributeOptions, {
          type: attribute.type,
          controlType: 'vehiclePatternSelection',
          value: (row[attribute.name] ? row[attribute.name] : '')
        }));
        break;
      }

      case 'image' : {
        field = new FieldBase(Object.assign(attributeOptions, {
          type: attribute.type,
          controlType: 'imageUpload',
          value: (row[attribute.name] ? row[attribute.name] : '')
        }));
        break;
      }

      case 'exclusion' : {
        field = new FieldBase(Object.assign(attributeOptions, {
          type: attribute.type,
          controlType: 'exclusion',
          value: (row[attribute.name] ? row[attribute.name] : [])
        }));
        break;
      }

      case 'baumusterPatternList' : {
        field = new FieldBase(Object.assign(attributeOptions, {
          type: attribute.type,
          controlType: attribute.type,
          value: (row[attribute.name] ? row[attribute.name] : [])
        }));
        break;
      }

      case 'qualityStatus' : {
        return null;
      }

      default: {
        console.error('unexpected attribute type ' + attribute.type, 'attribute name: ' + attribute.name);
        break;
      }
    }

    return field;
  }

  /**
   * remove empty string values before sending to rest service
   * @param obj
   * @returns {any}
   */
  public clearEmptyValues(obj: any) {
    return _.mapObject(obj, (value, key) => {
      if (typeof value === 'number') {
        return value.toString();
      } else if (typeof value === 'boolean') {
        return value;
      } else if ((value === '') || (value && Object.keys(value).length === 0)) {
        return null;
      } else if (value && value['date']) {
        return this.dateService.myDateToUtcTimestamp(value);
      } else {
        return value;
      }
    });
  }
}
