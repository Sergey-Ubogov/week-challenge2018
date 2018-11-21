import {MapRegion} from "./map-region";
import {DraftEquipment} from "./draft-equipment";
import {DraftCompleteShip} from "./draft-complete-ship";

export type DraftOptions = {
    PlayerId: number,
    MapSize: number,
    Money: number,
    MaxShipsCount: number,
    StartArea: MapRegion,
    Equipment: DraftEquipment[],
    CompleteShips: DraftCompleteShip[]
}