import { Injectable } from '@angular/core';
import {Course} from "../models/Course";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  data: any[] = [];
 
  apiUrl = environment.CourseUri + '/course/';
  private baseUrl = 'http://localhost:8081';
  
  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<any[]> {
    const url = this.apiUrl + 'all';
    console.log("FETCHING ALL BLOCS service lvl: ", url);
    return this._http.get<any[]>(url);
  }


  
  addCourse(course: Course): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('name', course.name);
    formData.append('price', course.price.toString());
    formData.append('description', course.description);

    if (course.image) {
      formData.append('imageFile', course.image);
    }

    return this._http.post(`${this.apiUrl}add`, formData );
  }


  // get image
  getImage(imageName: string): Observable<Blob> {
    const url = `${this.baseUrl}/${imageName}`;
    return this._http.get(url, { responseType: 'blob' });
  }
//delete 
delete(id: number) {
  console.log("DELETING  s lvl ::: " + this.apiUrl+"/remove"+  id);
  return this._http.delete(this.apiUrl+"remove/"+  id);
}

getCourseById(id: number): Observable<Course> {
  const url = `${this.apiUrl}get/${id}`;
  return this._http.get<Course>(url);
}

updateCourse(course: Course): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('idCourse', course.idCourse.toString());
  formData.append('name', course.name);
  formData.append('price', course.price.toString());
  formData.append('description', course.description);

  if (course.image) {
    formData.append('imageFile', course.image);
  }
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  return this._http.put(`${this.apiUrl}update`, formData, {headers});
}

// updateCourse(course: Course): Observable<any> {
//   // Assuming that `course.idCourse` is the identifier for the course

//   const headers = new HttpHeaders().set('Content-Type', 'application/json');

//   return this._http.put(`${this.apiUrl}update/`, course, { headers });
// }


}
