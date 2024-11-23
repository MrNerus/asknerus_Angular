import { Enum_OrderMode } from "../Enum/Enum_OrderMode";

export class EnumMapper {
    static ToOrderMode(str: string) {
        var map = {
            "ASC": Enum_OrderMode.ASC,
            "DESC": Enum_OrderMode.ASC,
            "_": Enum_OrderMode.NOT_IMPLEMENTED,
        }
        if (str in map) return map[str];
        return map._;
    }
}