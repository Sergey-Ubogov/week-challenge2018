import {ShipType} from "../../types/ship";
import Vector from "./Vector";
import {BlasterBlock} from "../../types/blocks/gun-block";

export default class Ship {
    Id: number;
    Health: number;
    Position: Vector;
    Velocity: Vector;
    BestBlaster: BlasterBlock

    constructor(ship: ShipType) {
        this.Id = ship.Id;
        this.Health = ship.Health;
        this.Position = new Vector(ship.Position);
        this.Velocity = new Vector(ship.Velocity);
    }

    getPosition() {
        return this.Position;
    }
}