import Vector from "../src/classes/Vector";
import {EnergyBlock} from "./blocks/energy-block";
import {BlasterBlock} from "./blocks/gun-block";
import {HealthBlock} from "./blocks/health-block";

export type ShipType = {
    Id: number,
    Health: number,
    Energy: number,
    Position: string,
    Velocity: string,
    Equipment: (EnergyBlock | EnergyBlock | BlasterBlock | HealthBlock)[]
}