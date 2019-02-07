import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormAreaComponent } from './components/form-area/form-area.component';
import { BottomButtonsComponent } from './components/bottom-buttons/bottom-buttons.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormAreaComponent,
    BottomButtonsComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
