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
            if (this.getEnemyShipReachablePosition(enemy.Position)) { //если можем дотянуться до врага
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

    // getActions(myShips: Ship[], enemies: BaseShip[], fireInfos: FireInfo[], nearestForAll: BaseShip) {
    //     /* здесь корабль анализирует ситуацию и выбирает лучшее для него действие */
    //     const enemyWithSmallHp = this.getEnemyWithSmallHp(enemies);
    //     const nearestEnemy = this.getNearestEnemy(enemies);
    //     const bestTarget: BaseShip = nearestForAll || enemyWithSmallHp || nearestEnemy;
    //     const actionsShip = [];
    //
    //     if (this.isShipWillLeave()) {
    //         actionsShip.push(this.getMoveAction(bestTarget.Position));
    //     }
    //
    //     const enemyShipReachablePosition = this.getEnemyShipReachablePosition(bestTarget.Position);
    //     if (enemyShipReachablePosition)
    //         actionsShip.push(this.getAttackAction(bestTarget.Position));
    //     else {
    //         if (enemyWithSmallHp) {
    //             actionsShip.push(this.getAttackAction(nearestEnemy.Position));
    //         } else {
    //             if (!actionsShip.length) actionsShip.push(this.getMoveAction(bestTarget.Position));
    //         }
    //     }
    //
    //     return actionsShip;
    // }

    getActions(myShips: Ship[], enemies: BaseShip[], fireInfos: FireInfo[], nearestEnemiesForAll: BaseShip[]) {
        /* здесь корабль анализирует ситуацию и выбирает лучшее для него действие */
        const enemyWithSmallHp = this.getEnemyWithSmallHp(enemies);
        const nearestEnemy = this.getNearestEnemy(enemies);
        const bestTarget: BaseShip = enemyWithSmallHp || nearestEnemiesForAll[0] || nearestEnemy;
        const actionsShip = [];

        if (this.isShipWillLeave()) {
            actionsShip.push(this.getAccelerateAction(bestTarget.Position.sub(this.Position).getNormalizeVector().sub(this.Velocity).getNormalizeVector()));
           // actionsShip.push(this.getAccelerateAction(new Vector("0/1/0")));
            //actionsShip.push(this.getMoveAction(bestTarget.Position));
        }

        let enemyShipReachablePosition = this.getEnemyShipReachablePosition(bestTarget.Position);
        if (enemyShipReachablePosition)
            actionsShip.push(this.getAttackAction(bestTarget.Position));
        else if (enemyWithSmallHp) {
            enemyShipReachablePosition = this.getEnemyShipReachablePosition(enemyWithSmallHp);
            if (enemyShipReachablePosition)
                actionsShip.push(this.getAttackAction(enemyWithSmallHp));
        }
        else if (nearestEnemiesForAll[0]) {
            enemyShipReachablePosition = this.getEnemyShipReachablePosition(nearestEnemiesForAll[0].Position);
            if (enemyShipReachablePosition)
                actionsShip.push(this.getAttackAction(enemyShipReachablePosition));
        }
        else if (nearestEnemiesForAll[1]) {
            enemyShipReachablePosition = this.getEnemyShipReachablePosition(nearestEnemiesForAll[1].Position);
            if (enemyShipReachablePosition)
                actionsShip.push(this.getAttackAction(enemyShipReachablePosition));
        }  else if (!actionsShip.length) {
          //  actionsShip.push(this.getMoveAction(bestTarget.Position));
            actionsShip.push(this.getAccelerateAction(bestTarget.Position.sub(this.Position).getNormalizeVector().sub(this.Velocity).getNormalizeVector()));
           // actionsShip.push(this.getAccelerateAction(new Vector("0/1/0")));
        }

        return actionsShip;
    }

    getEnemyShipReachablePosition(vector: Vector): Vector {
         // for (let x = vector.x; x <= vector.x + 1; x++)
         // for (let y = vector.y; x <= vector.y + 1; y++)
         // for (let z = vector.z; x <= vector.z + 1; z++)
         //     if (this.Position.chebyshevDistance(new Vector(`${x}/${y}/${z}`)) <= this.BestBlaster.Radius)
         //         return new Vector(`${x}/${y}/${z}`);

        let enemyShipCoordinate = vector;
        if (this.canBlasterReachPostion(enemyShipCoordinate))
            return enemyShipCoordinate;
        enemyShipCoordinate = new Vector(`${vector.x + 1}/${vector.y}/${vector.z}`);
        if (this.canBlasterReachPostion(enemyShipCoordinate))
            return enemyShipCoordinate;
        enemyShipCoordinate = new Vector(`${vector.x}/${vector.y + 1}/${vector.z}`);
        if (this.canBlasterReachPostion(enemyShipCoordinate))
            return enemyShipCoordinate;
        enemyShipCoordinate = new Vector(`${vector.x}/${vector.y}/${vector.z + 1}`);
        if (this.canBlasterReachPostion(enemyShipCoordinate))
            return enemyShipCoordinate;
        enemyShipCoordinate = new Vector(`${vector.x + 1}/${vector.y + 1}/${vector.z}`);
        if (this.canBlasterReachPostion(enemyShipCoordinate))
            return enemyShipCoordinate;
        enemyShipCoordinate = new Vector(`${vector.x + 1}/${vector.y}/${vector.z + 1}`);
        if (this.canBlasterReachPostion(enemyShipCoordinate))
            return enemyShipCoordinate;
        enemyShipCoordinate = new Vector(`${vector.x}/${vector.y + 1}/${vector.z + 1}`);
        if (this.canBlasterReachPostion(enemyShipCoordinate))
            return enemyShipCoordinate;
        enemyShipCoordinate = new Vector(`${vector.x + 1}/${vector.y + 1}/${vector.z + 1}`);
        if (this.canBlasterReachPostion(enemyShipCoordinate))
            return enemyShipCoordinate;

        return undefined;
    }

    canBlasterReachPostion(enemyShipCoordinate: Vector): boolean {
        return this.Position.chebyshevDistance(enemyShipCoordinate) <= this.BestBlaster.Radius;
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