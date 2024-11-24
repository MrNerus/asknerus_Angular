import { IPagination } from "./IPagination"

export interface IChapter_Detail {
    sn?: number;
    code?: string;
    class_Code?: string;
    class_Name?: string;
    subject_Code?: string;
    subject_Name?: string;
    name?: string;
    isActive?: boolean;
}

export interface IChapter {
    sn?: number;
    code?: string;
    subject_Code?: string;
    name?: string;
    isActive?: boolean;
}

export interface IChapters {
    item1?: IChapter[],
    item2?: IPagination
}

export interface IChapterDetails {
    item1?: IChapter_Detail[],
    item2?: IPagination
}
