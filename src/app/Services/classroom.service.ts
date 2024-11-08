import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import customConfig from '../../customConfig.json';
import { IClassroom } from '../Interfaces/IClassRoom';



@Injectable({ providedIn: 'root' })
export class ClassroomService {

  constructor(private http: HttpClient) {}

  getClassroom(classCode: string): Observable<IClassroom> {
    return this.http.get<IClassroom>(`${customConfig.backend_URL}/classroom/view/${classCode}`);
  }
}