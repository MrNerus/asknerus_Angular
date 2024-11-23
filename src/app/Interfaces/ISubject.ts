import { IPagination } from "./IPagination"

export interface ISubject_Detail {
    sn?: number;
    code?: string;
    class_Code?: string;
    class_Name?: string;
    name?: string;
    isActive?: boolean;
}

export interface ISubject {
    sn?: number;
    code?: string;
    class_Code?: string;
    name?: string;
    isActive?: boolean;
}

export interface ISubjects {
    item1?: ISubject[],
    item2?: IPagination
}

export interface ISubjectDetails {
    item1?: ISubject_Detail[],
    item2?: IPagination
}
