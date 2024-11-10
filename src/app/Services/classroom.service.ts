import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import customConfig from '../../customConfig.json';
import { IClassroom, IClassrooms } from '../Interfaces/IClassRoom';



@Injectable({ providedIn: 'root' })
export class ClassroomService {

  constructor(private http: HttpClient) {}

  getClassroom(classCode: string): Observable<IClassroom> {
    return this.http.get<IClassroom>(`${customConfig.backend_URL}/classroom/view/${classCode}`);
  }

  getClassrooms(
    searchKeyword: string = "%",
    searchColumn: string = null,
    filterKeyword: string = "%",
    filterColumn: string = null,
    where_Clause: string = null,
    orderBy: number = 3, 
    orderMode: number = 1,
    orderBy_Clause: string = null,

    pageNo: number = 1,
    rowsPerPage: number = 20
  ): Observable<IClassrooms> {
    let params = new HttpParams()
      .set('searchKeyword', searchKeyword)
      .set('searchColumn', searchColumn ?? '')
      .set('filterKeyword', filterKeyword)
      .set('filterColumn', filterColumn ?? '')
      .set('where_Clause', where_Clause ?? '')
      .set('orderBy', orderBy.toString())
      .set('orderMode', orderMode.toString())
      .set('orderBy_Clause', orderBy_Clause ?? '')
      .set('pageNo', pageNo.toString())
      .set('rowsPerPage', rowsPerPage.toString());

    return this.http.get<IClassrooms>(`${customConfig.backend_URL}/classroom/view`, { params });
  }

  updateClassroom(classroom: IClassroom): Observable<void> {
    return this.http.post<void>(`${customConfig.backend_URL}/classroom/edit`, classroom)
  }
}