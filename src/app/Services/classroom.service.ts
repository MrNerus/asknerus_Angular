import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import customConfig from '../../customConfig.json';
import { IClassroom, IClassrooms } from '../Interfaces/IClassRoom';
import { IKeyValue } from '../Interfaces/IKeyValue';
import { IPaginatedRequest } from '../Interfaces/IPaginatedRequest';
import { Enum_OrderMode } from '../Enum/Enum_OrderMode';



@Injectable({ providedIn: 'root' })
export class ClassroomService {

    constructor(private http: HttpClient) { }

    getClassroom(classCode: string): Observable<IClassroom> {
        return this.http.get<IClassroom>(`${customConfig.backend_URL}/classroom/view/${classCode}`);
    }

    getClassrooms(): Observable<IClassrooms> {
        return this.getFilteredSubjects(
            {
                Search: '',
                SearchFilter: [
                    { key: "Code", value: "", isFuzzy: true },
                    { key: "Name", value: "", isFuzzy: true },
                    { key: "Status", value: "active", isFuzzy: false }
                ],
                Order: [
                    { Column_Name: "Code", Order_Mode: Enum_OrderMode.ASC },
                    { Column_Name: "Name", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED },
                    { Column_Name: "Status", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED }
                ],
                Pagination: { Page_Number: 1, Rows_Per_Page: 20 }
            }
        )
    }

    getFilteredSubjects(
        requestBody: Partial<IPaginatedRequest> = {
            Search: '',
            SearchFilter: [
                { key: "Code", value: "", isFuzzy: true },
                { key: "Name", value: "", isFuzzy: true },
                { key: "Status", value: "active", isFuzzy: false }
            ],
            Order: [
                { Column_Name: "Code", Order_Mode: Enum_OrderMode.ASC },
                { Column_Name: "Name", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED },
                { Column_Name: "Status", Order_Mode: Enum_OrderMode.NOT_IMPLEMENTED }
            ],
            Pagination: { Page_Number: 1, Rows_Per_Page: 20 }
        }): Observable<IClassrooms> {
        return this.http.post<IClassrooms>(`${customConfig.backend_URL}/classroom/view`, requestBody);
    }

    updateClassroom(classroom: IClassroom): Observable<void> {
        return this.http.post<void>(`${customConfig.backend_URL}/classroom/edit`, classroom)
    }

    addClassroom(classroom: IClassroom): Observable<void> {
        return this.http.post<void>(`${customConfig.backend_URL}/classroom/add`, classroom)
    }

    requestKeyValue(): Observable<IKeyValue[]> {
        return this.http.get<IKeyValue[]>(`${customConfig.backend_URL}/classroom/KeyValue`);
    }
}