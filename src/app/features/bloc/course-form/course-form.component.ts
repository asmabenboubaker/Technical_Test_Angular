import { Component } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import {ActivatedRoute, Router} from "@angular/router";
import {  DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {Course} from "../../../models/Course";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-bloc-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class BlocFormComponent {
  id: number = 0;
  foyers: any[] = [];
  selectedFoyerId!: number;
  selectedFile!: File;
  course: Course = {
    idCourse: 0,
    name: '',
    price: 0,
    description: '',
    image: null
  };
  constructor(
    private courseservice: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly dialogService: DynamicDialogRef,
    
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.course.image = inputElement.files[0];
    }
  }
   
  addCourse(): void {
    this.courseservice.addCourse(this.course)
      .subscribe(response => {
        // Handle success
        console.log('Course added successfully', response);
      }, error => {
        // Handle error
        console.error('Error adding course', error);
      });
  }
  
  ngOnInit(): void {
     

  }
   
  
  
}
