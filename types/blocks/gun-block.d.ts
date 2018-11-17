import {Block} from "./block";

export type BlasterBlock = Block & {
    Damage: number,
    EnergyPrice: number,
    Radius: number,
    EffectType: 0
}