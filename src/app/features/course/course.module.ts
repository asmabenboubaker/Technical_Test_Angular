import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { ListCourseComponent } from './list-course/list-course.component';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import { CourseFormComponent } from './course-form/course-form.component';
import {FormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
// import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    ListCourseComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    // DynamicDialogModule
  ]
})
export class CourseModule { }
