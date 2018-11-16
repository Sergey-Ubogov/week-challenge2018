import Vector from "../src/vector";
import {Block} from "./block";

export type Ship = {
    Id: number,
    Health: number,
    Energy: number,
    Position: Vector,
    Velocity: Vector,
    Equipment: Block[]
}