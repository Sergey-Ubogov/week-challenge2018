import {ShipType} from "./ship";
import {FireInfo} from "./fire-info";

export type State = {
    My: ShipType[],
    Opponent: ShipType[],
    FireInfos: FireInfo[]
}