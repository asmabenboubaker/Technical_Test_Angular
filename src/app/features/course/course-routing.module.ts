import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListCourseComponent} from "./list-course/list-course.component";
import { scheduled } from 'rxjs';

const routes: Routes = [
  {path:'', component:ListCourseComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
