import {ShipType} from "../../types/ship";
import {EnergyBlock} from "../../types/blocks/energy-block";
import {BlasterBlock} from "../../types/blocks/gun-block";
import {HealthBlock} from "../../types/blocks/health-block";
import {BlockEnum} from "../../enums/block";
import BaseShip from './BaseShip';
import {Attack} from "../../types/commands/attack";
import {FireInfo} from "../../types/fire-info";
import {Move} from "../../types/commands/move";
import Vector from "./Vector";
import {Accelerate} from "../../types/commands/accelerate";

export default class Ship extends BaseShip {
    Energy: number;
    Equipment: (EnergyBlock | EnergyBlock | BlasterBlock | HealthBlock)[];
    BestBlaster: BlasterBlock;

    constructor(ship: ShipType) {
        super(ship);

        this.Energy = Number(ship.Energy);
        this.Equipment = ship.Equipment

        const blasters = this.Equipment.filter(block => block.Type === BlockEnum.blasterBlock).map(blaster => blaster as BlasterBlock);
        this.BestBlaster = this.getBestBlaster(blasters);
    }

    getWeightBlaster(blaster: BlasterBlock) {
        return /*blaster.Damage **/ blaster.Radius / blaster.EnergyPrice;
    }

    getBestBlaster(blasters: BlasterBlock[]): BlasterBlock {
        let bestBlaster = blasters[0];
        let maxWeight = this.getWeightBlaster(bestBlaster);

        blasters.forEach(blaster => {
            const weightBlaster = this.getWeightBlaster(blaster);
            if (weightBlaster < maxWeight) return;

            bestBlaster = blaster;
            maxWeight = weightBlaster;
        });

        return bestBlaster;
    }

    getBestBlasterName() {
        return this.BestBlaster.Name;
    }

    getNearestEnemy(enemies: BaseShip[]) {
        let nearestEnemy = enemies[0];
        let minDistance = 10000000;

        enemies.forEach(enemy => {
            const distanceToEnemy = this.Position.chebyshevDistance(enemy.Position);
            if (distanceToEnemy > minDistance) return;

            minDistance = distanceToEnemy;
            nearestEnemy = enemy;
        });

        if (!nearestEnemy) nearestEnemy = enemies[0];

        return nearestEnemy;
    }

    getBestTarget(myShips: Ship[], enemies: BaseShip[]) {
        return this.getNearestEnemy(enemies); //первая стратегия - просто стрелять в ближайшего

    }

    isShipWillLeave() {
        const nextPosition = this.Position.add(this.Velocity);
        const nextX = nextPosition.x;
        const nextY = nextPosition.y;
        const nextZ = nextPosition.z;
        const maxCoordinate = 30;
        const minCoordinate = 0;

        return nextX < minCoordinate || nextY < minCoordinate || nextZ < minCoordinate ||
               nextX > maxCoordinate || nextY > maxCoordinate || nextZ > maxCoordinate;
    }

    getBestAction(myShips: Ship[], enemies: BaseShip[], fireInfos: FireInfo[], nearestForAll: BaseShip) {
        /* здесь корабль анализирует ситуацию и выбирает лучшее для него действие */
        const nearestEnemy = this.getNearestEnemy(enemies);

        if (this.isShipWillLeave()) {
            return this.getMoveAction(nearestEnemy.Position);
        }

        if (this.isCanReach(nearestForAll))
            return this.getAttackAction(nearestForAll);
        else if (this.isCanReach(nearestEnemy)) {
            return this.getAttackAction(nearestEnemy);
        }
        else {
            return this.getMoveAction(nearestEnemy.Position);
        }
    }

    isCanReach(enemy: BaseShip): boolean {
        return this.Position.chebyshevDistance(enemy.Position) <= this.BestBlaster.Radius;
    }

    getAttackAction(target: BaseShip): Attack {
        const bestBlasterName = this.getBestBlasterName();

        return {
            Command: 'ATTACK',
            Parameters: {
                Id: this.Id,
                Name: bestBlasterName,
                Target: target.getPosition().toString()
            }
        }
    }

    getMoveAction(target: Vector): Move {
        return {
            Command: 'MOVE',
            Parameters: {
                Id: this.Id,
                Target: target.toString()
            }
        }
    }

    getAccelerateAction(vector): Accelerate {
        return {
            Command: 'ACCELERATE',
            Parameters: {
                Id: this.Id,
                Vector: vector.toString()
            }
        }
    }
}