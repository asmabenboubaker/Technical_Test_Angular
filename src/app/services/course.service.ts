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
  apifoyer='http://localhost:8082/blocs'
  constructor(
    private _http: HttpClient
  ) { }

  getAllBlocs(): Observable<any[]> {
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

  formData.append('name', course.name);
  formData.append('price', course.price.toString());
  formData.append('description', course.description);

  if (course.image) {
    formData.append('imageFile', course.image);
  }

  return this._http.put(`${this.apiUrl}update/${course.idCourse}`, formData);
}





  getAllBlocs2():Observable<Course[]> {
    console.log("FETCHING ALL BLOCS service lvl");
    return this._http.get<Course[]>(this.apiUrl+"/data");
  }
  removeUnderscores(obj: any): any {
    const result: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = key.startsWith('_') ? key.slice(1) : key;
        result[newKey] = obj[key];
      }
    }
    return result;
  }
  addBloc(body: Course) {
    console.log("ADDING BLOC service lvl::: " + JSON.stringify(body, null, 2));

 
    return this._http.post(this.apiUrl, body);
  }
  updateBloc(id:number,body: Course) {
    console.log("UPDATING BLOC service lvl ::: " + body);
    return this._http.put(this.apiUrl+"/"+  id, body);
  }

 
  fetchBlocById(id: number) {
    console.log("FETCHING BLOC BY ID s lvl ::: " + this.apiUrl +"/"+ id);
    return this._http.get<Course>(this.apiUrl +"/"+ id);
  }
 //pdf 
 pdfExport():Observable<Blob>{
  return this._http.get("http://localhost:8082/export/pdf", {responseType: 'blob'});
}
//Excel
excelExport():Observable<Blob>{
  return this._http.get("http://localhost:8082/export-to-excel", {responseType: 'blob'});
}
getAllFoyers(): Observable<any[]> {
  console.log("FETCHING ALL FOYERS service lvl");
  return this._http.get<any[]>("http://localhost:8082/blocs/datafoyer");
}
addBlocWithFoyer(bloc: Course, foyerId: number): Observable<any> {
  const url = `${this.apifoyer}/${foyerId}`; 
  return this._http.post(url, bloc);
}
}
