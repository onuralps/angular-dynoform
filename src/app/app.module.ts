import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormAreaComponent} from './components/form-area/form-area.component';
import {BottomButtonsComponent} from './components/bottom-buttons/bottom-buttons.component';
import {FormComponent} from './components/form/form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import {ConfigurationService} from './services/configuration-service';
import {DateService} from './services/date.service';
import {ValidationService} from './services/validation.service';
import {CustomizationService} from './services/customization.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { DateTimeComponent } from './components/date-time/date-time.component';

@NgModule({
  declarations: [
    AppComponent,
    FormAreaComponent,
    BottomButtonsComponent,
    FormComponent,
    DateTimeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatMomentDateModule
  ],
  providers: [ConfigurationService, DateService, ValidationService, CustomizationService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
