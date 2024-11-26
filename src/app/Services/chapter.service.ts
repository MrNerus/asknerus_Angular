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
import { IChapter, IChapter_Detail, IChapterDetails } from '../Interfaces/IChapter';



@Injectable({ providedIn: 'root' })
export class ChapterService {

    constructor(private http: HttpClient) { }

    getChapter(chapterCode: string): Observable<IChapter_Detail> {
        return this.http.get<IChapter_Detail>(`${customConfig.backend_URL}/chapter/view/${chapterCode}`);
    }

    getChapters(): Observable<IChapterDetails> {
        return this.getFilteredChapters(
            {
                Search: '',
                SearchFilter: [
                    {key: "ClassCode", value: "", isFuzzy: true},
                    {key: "ClassName", value: "", isFuzzy: true},
                    {key: "ClassStatus", value: "active", isFuzzy: false},
                    {key: "SubjectCode", value: "", isFuzzy: true},
                    {key: "SubjectName", value: "", isFuzzy: true},
                    {key: "SubjectStatus", value: "active", isFuzzy: false},
                    {key: "Code", value: "", isFuzzy: true},
                    {key: "Name", value: "", isFuzzy: true},
                    {key: "Status", value: "active", isFuzzy: false},
                ],
                Order: [
                    {Column_Name: "ClassCode", Order_Mode: Enum_OrderMode.ASC},
                    {Column_Name: "SubjectCode", Order_Mode: Enum_OrderMode.ASC},
                    {Column_Name: "Code", Order_Mode: Enum_OrderMode.ASC}, 
                    {Column_Name: "ClassName", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED},
                    {Column_Name: "SubjectName", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED},
                    {Column_Name: "Name", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED}, 
                    {Column_Name: "ClassStatus", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED},
                    {Column_Name: "SubjectStatus", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED},
                    {Column_Name: "Status", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED} 
                ],
                Pagination: {Page_Number: 1, Rows_Per_Page: 20}
            }
        )
    }

    getFilteredChapters(
        requestBody: Partial<IPaginatedRequest> = {
            Search: '',
            SearchFilter: [
                {key: "ClassCode", value: "", isFuzzy: true},
                {key: "ClassName", value: "", isFuzzy: true},
                {key: "ClassStatus", value: "active", isFuzzy: false},
                {key: "SubjectCode", value: "", isFuzzy: true},
                {key: "SubjectName", value: "", isFuzzy: true},
                {key: "SubjectStatus", value: "active", isFuzzy: false},
                {key: "Code", value: "", isFuzzy: true},
                {key: "Name", value: "", isFuzzy: true},
                {key: "Status", value: "active", isFuzzy: false},
            ],
            Order: [
                {Column_Name: "ClassCode", Order_Mode: Enum_OrderMode.ASC},
                {Column_Name: "SubjectCode", Order_Mode: Enum_OrderMode.ASC},
                {Column_Name: "Code", Order_Mode: Enum_OrderMode.ASC}, 
                {Column_Name: "ClassName", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED},
                {Column_Name: "SubjectName", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED},
                {Column_Name: "Name", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED}, 
                {Column_Name: "ClassStatus", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED},
                {Column_Name: "SubjectStatus", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED},
                {Column_Name: "Status", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED} 
            ],
            Pagination: {Page_Number: 1, Rows_Per_Page: 20}
        }): Observable<IChapterDetails> {
        return this.http.post<IChapterDetails>(`${customConfig.backend_URL}/chapter/view`, requestBody);
    }

    updateChapter(chapter: IChapter): Observable<void> {
        return this.http.post<void>(`${customConfig.backend_URL}/chapter/edit`, chapter)
    }

    addChapter(chapter: IChapter): Observable<void> {
        return this.http.post<void>(`${customConfig.backend_URL}/chapter/add`, chapter)
    }

    requestKeyValue(chapterCode: string): Observable<IKeyValue[]> {
        return this.http.get<IKeyValue[]>(`${customConfig.backend_URL}/chapter/KeyValue/${chapterCode}`);
    }
}