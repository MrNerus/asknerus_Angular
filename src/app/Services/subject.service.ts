import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import customConfig from '../../customConfig.json';
import { IClassroom, IClassrooms } from '../Interfaces/IClassRoom';
import { IKeyValue } from '../Interfaces/IKeyValue';
import { ISubject, ISubject_Detail, ISubjectDetails } from '../Interfaces/ISubject';
import { IWhereClause } from '../Interfaces/IWhereClause';
import { IPaginatedRequest } from '../Interfaces/IPaginatedRequest';
import { Enum_OrderMode } from '../Enum/Enum_OrderMode';



@Injectable({ providedIn: 'root' })
export class SubjectService {

    constructor(private http: HttpClient) { }

    getSubject(subjectCode: string): Observable<ISubject_Detail> {
        return this.http.get<ISubject_Detail>(`${customConfig.backend_URL}/subject/view/${subjectCode}`);
    }

    getSubjects(): Observable<ISubjectDetails> {
        // return this.http.get<ISubjectDetails>(`${customConfig.backend_URL}/subject/view`);
        return this.getFilteredSubjects(
            {
                Search: '',
                SearchFilter: [
                    {key: "Code", value: "", isFuzzy: true},
                    {key: "Name", value: "", isFuzzy: true},
                    {key: "Status", value: "active", isFuzzy: false},
                    {key: "ClassCode", value: "", isFuzzy: true},
                    {key: "ClassStatus", value: "active", isFuzzy: false},
                ],
                Order: [
                    {Column_Name: "ClassCode", Order_Mode: Enum_OrderMode.ASC},
                    {Column_Name: "Code", Order_Mode: Enum_OrderMode.ASC}, 
                    {Column_Name: "ClassName", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED},
                    {Column_Name: "Name", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED}, 
                    {Column_Name: "ClassStatus", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED},
                    {Column_Name: "Status", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED}
                ],
                Pagination: {Page_Number: 1, Rows_Per_Page: 20}
            }
        )
    }

    getFilteredSubjects(
        requestBody: Partial<IPaginatedRequest> = {
            Search: '',
            SearchFilter: [
                {key: "Code", value: "", isFuzzy: true},
                {key: "Name", value: "", isFuzzy: true},
                {key: "Status", value: "active", isFuzzy: false},
                {key: "ClassCode", value: "", isFuzzy: true},
                {key: "ClassStatus", value: "active", isFuzzy: false},
            ],
            Order: [
                {Column_Name: "ClassCode", Order_Mode: Enum_OrderMode.ASC},
                {Column_Name: "Code", Order_Mode: Enum_OrderMode.ASC}, 
                {Column_Name: "ClassName", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED},
                {Column_Name: "Name", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED}, 
                {Column_Name: "ClassStatus", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED},
                {Column_Name: "Status", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED} 
            ],
            Pagination: {Page_Number: 1, Rows_Per_Page: 20}
        }): Observable<ISubjectDetails> {
        return this.http.post<ISubjectDetails>(`${customConfig.backend_URL}/subject/view`, requestBody);
    }

    updateSubject(subject: ISubject): Observable<void> {
        return this.http.post<void>(`${customConfig.backend_URL}/subject/edit`, subject)
    }

    addSubject(subject: ISubject): Observable<void> {
        return this.http.post<void>(`${customConfig.backend_URL}/subject/add`, subject)
    }

    requestKeyValue(classCode: string): Observable<IKeyValue[]> {
        return this.http.get<IKeyValue[]>(`${customConfig.backend_URL}/subject/KeyValue/${classCode}`);
    }
}