import { IOrderClause } from "./IOrderClause";
import { IPageRequest } from "./IPageRequest";
import { IWhereClause } from "./IWhereClause";

export interface IPaginatedRequest {
    Search?: string,
    SearchFilter?: IWhereClause[],
    Order?: IOrderClause[],
    Pagination?: IPageRequest
}