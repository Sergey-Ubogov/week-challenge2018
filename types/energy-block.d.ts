import {Block} from "./block";

export type EnergyBlock = Block & {
    IncrementPerTurn: number,
    MaxEnergy: number,
    StartEnergy: number
}