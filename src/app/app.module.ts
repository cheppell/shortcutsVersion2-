import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { ListComponent } from './list/list.component';
import { MatDividerModule } from '@angular/material/divider';

import { MatSelectModule } from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {A11yModule} from '@angular/cdk/a11y';
import { StepperComponent } from './stepper/stepper.component';




@NgModule({
  declarations: [
    AppComponent,
    DialogExampleComponent,
    ListComponent,
    StepperComponent,

  ],
  entryComponents: [DialogExampleComponent],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    A11yModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
