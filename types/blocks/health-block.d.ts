import {Block} from "./block";

export type HealthBlock = Block & {
    MaxHealth: number,
    StartHealth: number
}