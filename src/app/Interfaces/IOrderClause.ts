import { Enum_OrderMode } from "../Enum/Enum_OrderMode";

export interface IOrderClause {
    Column_Name?: string;
    Order_Mode?: Enum_OrderMode;
    Miscelleneous?: string;
}