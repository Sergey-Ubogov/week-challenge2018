import {Block} from "./block";

export type GunBlock = Block & {
    Damage: number,
    EnergyPrice: number,
    Radius: number,
    EffectType: 0
}