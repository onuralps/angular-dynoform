import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAreaComponent } from './form-area.component';
import {
  TenantSelectWithoutHeadquarterComponent
} from '../../../tenant-select-without-headquarter/tenant-select-without-headquarter.component';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {MaterialModule} from '@angular/material';
import {SharedModule} from '../../../../shared/modules/shared.module';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ModalModule} from '../../../shared/modal/modal.module';
import {SelectModule} from 'angular2-select';
import {EntitySelectionComponent} from '../../../entity-selection/entity-selection.component';
import {AppModule} from '../../../../app.module';

describe('FormAreaComponent', () => {
  let component: FormAreaComponent;
  let fixture: ComponentFixture<FormAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAreaComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      test: new FormControl('')
    });
    component.row = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
