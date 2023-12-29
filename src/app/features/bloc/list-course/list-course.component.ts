import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import {Table} from "primeng/table";

import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {BlocFormComponent} from "../course-form/course-form.component";
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-list-bloc',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListBlocComponent  implements OnInit{
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
    // private config: DynamicDialogConfig,
  ) { }
  getList(){
    this.courseService.getAllBlocs().subscribe(
      data=>{this.Table=data;
      console.log(this.Table);
     
    }
    )
      
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


  
  exportPDF(){
    this.courseService.pdfExport().subscribe(data=>{
      
      const blob = new Blob([data], {type: 'application/pdf'});
      if(window.navigator &&   (window.navigator as any).msSaveOrOpenBlob){
        (window.navigator as any).msSaveOrOpenBlob(data);

        return;
      }
      const data1 = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data1;
      link.download = "blocs.pdf";
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      setTimeout(function(){
        window.URL.revokeObjectURL(data1);
        link.remove();
      }, 100);
    
  },
  error => {
    console.error('Error during PDF export:', error);
    // Handle or log the error as needed
  }
    );
 

  }

  exportExcel(){
    this.courseService.excelExport().subscribe(data=>{
      const blob = new Blob([data], {type: 'application/pdf'});
      if(window.navigator &&   (window.navigator as any).msSaveOrOpenBlob){
        (window.navigator as any).msSaveOrOpenBlob(data);

        return;
      }
      const data1 = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data1;
      link.download = "etudiant.xlsx";
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      setTimeout(function(){
        window.URL.revokeObjectURL(data1);
        link.remove();
      }, 100);
    });

  }
}
