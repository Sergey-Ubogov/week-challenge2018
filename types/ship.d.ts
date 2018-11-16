import Vector from "../src/vector";
import {EnergyBlock} from "./blocks/energy-block";
import {GunBlock} from "./blocks/gun-block";
import {HealthBlock} from "./blocks/health-block";

export type Ship = {
    Id: number,
    Health: number,
    Energy: number,
    Position: Vector,
    Velocity: Vector,
    Equipment: (EnergyBlock | EnergyBlock | GunBlock | HealthBlock)[]
}