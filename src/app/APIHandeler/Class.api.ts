import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import customConfig from '../../customConfig.json';
// import { Observable } from "rxjs";
import { IClassroom } from "../Interfaces/IClassRoom";
import { IServerResponse } from "../Interfaces/IServerResponse";


@Injectable({providedIn: 'root'})
export class Classes {
    // _http: HttpClient;
    
    // constructor(private http: HttpClient) {
    //     this._http = http;
    // }

    classList: IClassroom[] = [
        { Name:"First Semester", Code: "BCAS1", IsActive: true},
        { Name:"Second Semester", Code: "BCAS2", IsActive: true},
        { Name:"Third Semester", Code: "BCAS3", IsActive: true},
        { Name:"Fourth Semester", Code: "BCAS4", IsActive: true},
        { Name:"Fifth Semester", Code: "BCAS5", IsActive: true},
        { Name:"Sixth Semester", Code: "BCAS6", IsActive: true},
        { Name:"Seventh Semester", Code: "BCAS7", IsActive: true},
        { Name:"Eighth Semester", Code: "BCAS8", IsActive: true}
    ];

    async getClassList(): Promise<IClassroom[]> {
        try {
            const response = await fetch(`${customConfig.backend_URL}/getClassList`);
            if (!response.ok) { throw new Error("Network response was not ok"); }
            return await JSON.parse(await response.json()) as IClassroom[];
        } catch (error) { return []; }
    }

    
    async getClass(classCode: string): Promise<IClassroom> {
        try {
            const response = await fetch(`${customConfig.backend_URL}/getClass/${classCode}`);
            if (!response.ok) { throw new Error("Network response was not ok"); }
            return await JSON.parse(await response.json()) as IClassroom;
        } catch (error) { 
            return JSON.parse(`{ Name:"Error on fetching Name", Code: "Error on fetching Code", IsActive: false}`) as IClassroom }
    }

    async AddClass(classroom: IClassroom): Promise<IServerResponse> {
        try {
            const response = await fetch(`${customConfig.backend_URL}/AddClass/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Name: classroom.Name , Code: classroom.Code, IsActive: classroom.IsActive }),
            });
            if (!response.ok) { 
                return JSON.parse(
                    `{ 
                        Message: "${response.body}",
                        IsGoodStatus?: false,
                        Title?: Error,
                        Icon?: error,
                    }`
                ) as IServerResponse;
            }
            

            return JSON.parse(
                `{ 
                    Message: "${response.body}",
                    IsGoodStatus?: false,
                    Title?: Error,
                    Icon?: Error,
                }`
            ) as IServerResponse;
        } catch (error) { 
            return JSON.parse(
                `{ 
                    Message: "${error}",
                    IsGoodStatus?: false,
                    Title?: Error,
                    Icon?: Error,
                }`
            ) as IServerResponse;;
        }
    }
}