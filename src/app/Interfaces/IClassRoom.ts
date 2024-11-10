import { IPagination } from "./IPagination"

export interface IClassroom {
    sn?: number,
    code?: string,
    name?: string,
    isActive?: boolean
}

export interface IClassrooms {
    item1?: IClassroom[],
    item2?: IPagination
}