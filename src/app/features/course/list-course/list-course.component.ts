import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import {Table} from "primeng/table";

import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {BlocFormComponent} from "../course-form/course-form.component";
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/Course';
import { DomSanitizer } from '@angular/platform-browser';
//import app navigation 

@Component({
  selector: 'app-list-bloc',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent  implements OnInit{
  @ViewChild('dt') table!: Table;
  nom: string = "";
  Table: any[] = [];
  courseId!: number;
  imageUrl!: any;
  course: Course = {
    idCourse: 0,
    name: '',
    price: 0,
    description: '',
    image: null
  };
  constructor(
    public courseService: CourseService,
    private readonly dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
    // private config: DynamicDialogConfig,
  ) { }
  getList(){
    this.courseService.getAllBlocs().subscribe(
      (data : any)=>{
        this.Table=data;
        // let object = URL.createObjectURL(this.Table[0].image);
        // this.imageUrl= this.sanitizer.bypassSecurityTrustUrl(object);
         // Convert blob data to data URL
         
        console.log(this.Table);
      }
    )
      
  }

  convertBlobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  
  loadImage(imageName: string): void {
    console.log('loadImage called with:' );
    this.courseService.getImage(imageName).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log("IMAGE LOADED");
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(data);
      },
      error => {
        console.error('Error loading image:', error);
      }
    );
  }


  delete(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    
    if (confirmed) {
      this.courseService.delete(id).subscribe(
        () => {
          this.getList(); // Refresh the list after deletion
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'course deleted successfully' });
        },
        error => {
          console.error('Error deleting course:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete course' });
        }
      );
    }
  }
  editCourse(id: number): void {
    this.courseService.getCourseById(id)
      .subscribe(course => {
        this.course = course;
        // You can do additional processing if needed
      }, error => {
        console.error('Error getting course for edit', error);
      });
  }

  Edit(id:number) {
    this.dialogService.open(BlocFormComponent, {
      data: { id },
      header: "Modifier les informations du Course"
    });
  }


  ngOnInit(): void {
    this.getList();
  }
  
 

  

  Add(){
    this.dialogService.open(BlocFormComponent, {
      header:"Ajouter un nouveau bloc"
    })
  }

 
}
