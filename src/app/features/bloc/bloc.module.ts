import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocRoutingModule } from './bloc-routing.module';
import { ListBlocComponent } from './list-course/list-course.component';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import { BlocFormComponent } from './course-form/course-form.component';
import {FormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
// import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    ListBlocComponent,
    BlocFormComponent
  ],
  imports: [
    CommonModule,
    BlocRoutingModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    // DynamicDialogModule
  ]
})
export class BlocModule { }
