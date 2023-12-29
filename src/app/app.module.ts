import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { StepsModule } from 'primeng/steps';
import { DialogModule } from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { ReactiveFormsModule } from "@angular/forms";
import {  HttpClientModule } from '@angular/common/http';

import { LayoutComponent } from './features/shared/layout/layout.component';

import { NavigationComponent } from './features/shared/navigation/navigation.component';
import { FooterComponent } from './features/shared/footer/footer.component';
import { HeaderComponent } from './features/shared/header/header.component';


import { DxSchedulerModule, DxTagBoxModule } from 'devextreme-angular'; 
@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    NavigationComponent, 
    LayoutComponent,
   
    AppComponent,
  

  ],
  imports: [
    DxTagBoxModule,
    DxSchedulerModule,

    TagModule,
    TableModule,
    ReactiveFormsModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    InputTextModule,
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    ButtonModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    StepsModule,
    DialogModule,
    FormsModule,
    DividerModule,


  ],
  providers: [DialogService,ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
