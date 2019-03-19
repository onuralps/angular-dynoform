/* tslint:disable:no-access-missing-member */

import * as _ from 'underscore';
import {ConfigurationService} from '../../services/configuration-service';
import {CustomizationService} from '../../services/customization.service';
import {ValidationService} from '../../services/validation.service';
import {Component, Input, OnInit} from '@angular/core';
import {TableContext} from '../../models/table-context';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MasterDataTable} from '../../models/object-config-model';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

const moment = _rollupMoment || _moment;


/**
 * Component that creates and controls mainenance mask area.
 *
 * @export
 * @class FormComponent
 * @implements {OnInit}
 * @implements {CanComponentDeactivate}
 */
@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss'],
  providers: [ConfigurationService, ValidationService, CustomizationService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class FormComponent implements OnInit {

  @Input() object: any;

  @Input() config: MasterDataTable;


  /**
   * Fields of the Form
   *
   * @type {any[]}
   * @memberOf FormComponent
   */
  public fields: any[] = [];

  /**
   * TableContext attribute
   * Required to form fields
   * @type {*}
   * @memberOf FormComponent
   */
  public tableContext: TableContext;


  /**
   * disable form fields
   *
   * @memberOf FormComponent
   */
  public readonly = false;

  protected deleteButtonVisible = false;

  /**
   * selected row or empty row
   *
   * @type {*}
   * @memberOf FormComponent
   */
  public row: any = {};

  /**
   *
   * The Reactive form
   *
   * @type {FormGroup}
   * @memberOf FormComponent
   */
  public form: FormGroup;

  /**
   * Attribute form errors.
   * Holds the invalid fields' errors
   *
   * @type {*}
   * @memberOf FormComponent
   */
  public formErrors: any;

  /**
   * Attribute  validation messages.
   * Holds the messages that are going to be shown on fields when invalid
   *
   * @type {*}
   * @memberOf FormComponent
   */
  public validationMessages: any;

  public isNamedMasterData = false;


  /**
   * selected tenant, used for designation
   *
   * @type {string}
   * @memberOf FormComponent
   */
  public selectedTenant: string;

  /**
   * Show or hide tenant selection for tenant specific or tenant non specific objects
   *
   * @type {boolean}
   * @memberOf FormComponent
   */
  public showTenantSelection: boolean;

  /**
   * Creates an instance of FormComponent.
   *
   * @param route
   * @param fieldControlService
   * @param sessionService
   * @param simpleTableService
   * @param httpService
   * @param tenantsService
   * @param toastr
   * @param fb
   * @param router
   * @param validationService
   * @param customizationService
   * @param confirmationService
   */
  constructor(protected route: ActivatedRoute,
              protected fieldControlService: ConfigurationService,
              public fb: FormBuilder,
              private router: Router,
              protected validationService: ValidationService,
              protected customizationService: CustomizationService) {
    this.form = this.fb.group({});
  }


  public isDirty(): boolean {
    return this.form.dirty;
  }

  /**
   * Initiates component. subscribes to row selection and loads new selected row every time
   *
   * @memberOf FormComponent
   */
  ngOnInit() {
    this.loadForm(this.object);
  }

  /**
   * Loads the form with given rows values
   *
   * @private
   * @param {*} row
   *
   * @memberOf FormComponent
   */
  protected loadForm(row: any) {
    this.row = row;
    this.tableContext = new TableContext(this.config);
    this.formOperations();
  }

  /**
   * Validates date formats
   *
   * @param value
   */
  public validateDate(value: any) {
    const field = value.field;
    const event = value.event;
    field.constraints.regexMessage = 'date should be in YYYY-MM-DD format';
    if (event.valid) {
      this.form.controls[field.key].setErrors(null);
    } else {
      this.form.controls[field.key].setErrors({['pattern']: true});
    }
  }

  /**
   * Validates number
   *
   * @param value
   */
  public validateNumber(value: any) {
    const field = value.field;
    const event = value.event;
    if (field.type === 'number') {
      const max = field.constraints.max ? field.constraints.max : 999999999;
      const min = field.constraints.min || field.constraints.min === 0 ? field.constraints.min : -999999999;
      if (event.target.value > max || event.target.value < min) {
        this.form.controls[field.key].setErrors({['number']: true});
      } else {
        if (this.form.controls[field.key].hasError('required')) {
          this.form.controls[field.key].setErrors({['required']: true});
        } else {
          this.form.controls[field.key].setErrors(null);
        }
      }
    }
  }

  /**
   * Form operations
   * Generates form, fields, form errors and runs customizations. Disables form if table is readonly.
   * @param tenants
   */
  protected formOperations() {
    this.fields = this.fieldControlService.generateFields(this.tableContext.table, this.row);
    this.formErrors = this.validationService.generateFormErrors(this.tableContext.table);
    this.form = this.fieldControlService.toFormGroup(this.fields, this.row, this.tableContext.table);
    if (this.tableContext.table && this.tableContext.table.readonly) {
      this.form.disable();
    }
    // @ts-ignore
    this.form.addControl('date', new FormControl(new Date()));
    const extension = this.customizationService.getExtensionPoint(this.tableContext.table.name);
    if (extension) {
      extension.customize(this.row, this.form, this.fields, this.tableContext);
    }
  }

  /**
   * Loads the form again with initial values
   *
   * @memberOf FormComponent
   */
  public onCancel() {
    this.loadForm(this.row);
  }

  /**
   * On submit, adds or updates and object that is constructed
   *
   * @returns
   *
   * @memberOf FormComponent
   */
  public onSubmit() {
    if (!this.form) {
      return;
    }
    this.formErrors = this.validationService.generateFormErrors(this.tableContext.table);
    this.validationService.setFormErrors(this.form, this.formErrors, this.fields, this.tableContext.table);

    if (this.form.valid) {
      const objToSubmit = this.readyObject();
    }
  }

  protected readyObject() {
    let objToSubmit = Object.assign({}, this.row, this.form.getRawValue());

    const beforeSubmitCustomization = this.customizationService.getBeforeSubmitExtensionPoint(this.tableContext.table.name);
    if (beforeSubmitCustomization) {
      objToSubmit = beforeSubmitCustomization.beforeSubmit(objToSubmit, this.tableContext);
    }

    // remove empty designations so they do not inserted to database
    if (objToSubmit.designation) {
      objToSubmit.designation = _.filter(objToSubmit.designation, function (item: any) {
        return item.text !== '';
      });
    }

    // remove empty designations so they do not inserted to database
    if (objToSubmit.subCategoryDesignation) {
      objToSubmit.subCategoryDesignation = _.filter(objToSubmit.subCategoryDesignation, function (item: any) {
        return item.text !== '';
      });
    }

    delete objToSubmit.$$index;

    objToSubmit = this.fieldControlService.clearEmptyValues(objToSubmit);

    return objToSubmit;
  }

  protected onUpdated(data: any) {
    this.loadForm(data);
  }

  /**
   * Callback method for delete button.
   */
  public onDelete(): void {
  }

}
