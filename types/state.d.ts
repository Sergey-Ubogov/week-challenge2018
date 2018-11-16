import {Ship} from "./ship";
import {FireInfo} from "./fire-info";

export type State = {
    My: Ship[],
    Opponent: Ship[],
    FireInfos: FireInfo[]
}