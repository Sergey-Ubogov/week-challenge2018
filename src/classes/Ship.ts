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
        this.Equipment = ship.Equipment;

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

    getEnemyWithSmallHp(enemies: BaseShip[]) {
        let availableEnemies: BaseShip[] = [];

        enemies.forEach(enemy => {
            if (this.Position.chebyshevDistance(enemy.Position) <= this.BestBlaster.Radius) { //если можем дотянуться до врага
                availableEnemies.push(enemy); //то пихаем его в массив
            }
        });

        let minHp = 10000;
        let enemyWithSmallHp;

        availableEnemies.forEach(enemy => {
            if (enemy.Health < minHp) {
                minHp = enemy.Health;
                enemyWithSmallHp = enemy;
            }
        })

        return enemyWithSmallHp;
    }

    getBestTarget(myShips: Ship[], enemies: BaseShip[]) {
        return this.getNearestEnemy(enemies); //первая стратегия - просто стрелять в ближайшего

    }

    isShipWillLeave() {
        return this.willShipIntersestBorderAtAxis(this.Position.x, this.Velocity.x)
            || this.willShipIntersestBorderAtAxis(this.Position.y, this.Velocity.y)
            || this.willShipIntersestBorderAtAxis(this.Position.z, this.Velocity.z);
    }

    willShipIntersestBorderAtAxis(axisCoordinate: number, axisVelocityProjection: number): Boolean {
        let distanceBeforeStop = this.getDistanceBeforeStop(Math.abs(axisVelocityProjection));
        return axisCoordinate + distanceBeforeStop > 28 || axisCoordinate - distanceBeforeStop < 0;
    }

    getDistanceBeforeStop(axisVelocityAbs: number) {
        return axisVelocityAbs * (axisVelocityAbs + 1) / 2;
        // арифметическая прогрессия; нужна, потому что каждый ход скорость можно уменьшить на 1,
        // поэтому скорость будет axisVelocity, axisVelocity - 1, ..., 1
    }

    getBestAction(myShips: Ship[], enemies: BaseShip[], fireInfos: FireInfo[], nearestForAll: BaseShip) {
        /* здесь корабль анализирует ситуацию и выбирает лучшее для него действие */
        const enemyWithSmallHp = this.getEnemyWithSmallHp(enemies);
        const nearestEnemy = this.getNearestEnemy(enemies);
        const bestTarget: BaseShip = /*nearestForAll || */enemyWithSmallHp || nearestEnemy;

        if (this.isShipWillLeave()) {
            return this.getMoveAction(bestTarget.Position);
        }

        if (this.isCanReach(bestTarget.Position))
            return this.getAttackAction(bestTarget.Position);
        else if (this.isCanReach(nearestEnemy.Position)) {
            return this.getAttackAction(nearestEnemy.Position);
        } else {
            return this.getMoveAction(nearestEnemy.Position);
        }
    }

    isCanReach(vector: Vector): boolean {
        return this.Position.chebyshevDistance(vector) <= this.BestBlaster.Radius;
    }

    getAttackAction(target: Vector): Attack {
        const bestBlasterName = this.getBestBlasterName();

        return {
            Command: 'ATTACK',
            Parameters: {
                Id: this.Id,
                Name: bestBlasterName,
                Target: target.toString()
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