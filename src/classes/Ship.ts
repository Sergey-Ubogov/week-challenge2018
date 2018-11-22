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
import {EngineBlock} from "../../types/blocks/engine-block";

export default class Ship extends BaseShip {
    Energy: number;
    Equipment: any[];
    BestBlaster: BlasterBlock;
    MaxAccelerate: number;

    constructor(ship: ShipType) {
        super(ship);

        this.Energy = Number(ship.Energy);
        this.Equipment = ship.Equipment;
        const engines: EngineBlock[] = this.Equipment.filter(block => block.Type === BlockEnum.engineBlock).map(engine => engine as EngineBlock);
        this.MaxAccelerate = engines.reduce((maxAccelerate, engine) => maxAccelerate + engine.MaxAccelerate, 0)

        const blasters = this.Equipment.filter(block => block.Type === BlockEnum.blasterBlock).map(blaster => blaster as BlasterBlock);
        this.BestBlaster = this.getBestBlaster(blasters);
    }

    getWeightBlaster(blaster: BlasterBlock) {
        return blaster.Damage * blaster.Radius / blaster.EnergyPrice;
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

    getShipCoordinates(shipPosition: Vector) {
        return [
            new Vector(`${shipPosition.x}/${shipPosition.y}/${shipPosition.z}`),
            new Vector(`${shipPosition.x+1}/${shipPosition.y}/${shipPosition.z}`),
            new Vector(`${shipPosition.x}/${shipPosition.y+1}/${shipPosition.z}`),
            new Vector(`${shipPosition.x+1}/${shipPosition.y+1}/${shipPosition.z}`),
            new Vector(`${shipPosition.x}/${shipPosition.y}/${shipPosition.z+1}`),
            new Vector(`${shipPosition.x+1}/${shipPosition.y}/${shipPosition.z+1}`),
            new Vector(`${shipPosition.x}/${shipPosition.y+1}/${shipPosition.z+1}`),
            new Vector(`${shipPosition.x+1}/${shipPosition.y+1}/${shipPosition.z+1}`),
        ]
    }

    getShipNearestPoint(shipPosition: Vector, fromPos: Vector = this.Position) {
        let minDistance = 10000000;
        let shipCoordinates = this.getShipCoordinates(shipPosition);
        let shipNearestPoint = shipPosition;

        shipCoordinates.forEach(shipCoordinate => {
            const distance = fromPos.chebyshevDistance(shipCoordinate);
            if (distance < minDistance) {
                minDistance = distance;
                shipNearestPoint = shipCoordinate;
            }
        });

        return shipNearestPoint;
    }

    getNearestEnemy(enemies: BaseShip[]) {
        let nearestEnemy = enemies[0];
        let minDistance = 10000000;

        enemies.forEach(enemy => {
            const distanceToEnemy = this.Position.chebyshevDistance(this.getShipNearestPoint(enemy.Position));
            if (distanceToEnemy > minDistance) return;

            minDistance = distanceToEnemy;
            nearestEnemy = enemy;
        });

        return nearestEnemy;
    }

    getEnemyWithSmallHp(enemies: BaseShip[]) {
        let availableEnemies: BaseShip[] = [];

        enemies.forEach(enemy => {
            if (this.getPointForAttack(enemy.Position.add(enemy.Velocity.getNormalizeVector()))) { //если можем дотянуться до врага
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
        });

        return enemyWithSmallHp;
    }

    isShipWillLeave() {
        return this.willShipIntersestBorderAtAxis(this.Position.x, this.Velocity.x)
            || this.willShipIntersestBorderAtAxis(this.Position.y, this.Velocity.y)
            || this.willShipIntersestBorderAtAxis(this.Position.z, this.Velocity.z);
    }

    willShipIntersestBorderAtAxis(axisCoordinate: number, axisVelocityProjection: number): Boolean {
        let distanceBeforeStop = this.getDistanceBeforeStop(Math.abs(axisVelocityProjection));
        return axisCoordinate + distanceBeforeStop > 28 || axisCoordinate - distanceBeforeStop < 2;
    }

    getDistanceBeforeStop(axisVelocityAbs: number) {
        return axisVelocityAbs * (axisVelocityAbs + 1) / 2;
        // арифметическая прогрессия; нужна, потому что каждый ход скорость можно уменьшить на 1,
        // поэтому скорость будет axisVelocity, axisVelocity - 1, ..., 1
    }

    getActions(myShips: Ship[], enemies: BaseShip[], fireInfos: FireInfo[], nearestForAll: BaseShip) {
        /* здесь корабль анализирует ситуацию и выбирает лучшее для него действие */
        const enemyWithSmallHp = this.getEnemyWithSmallHp(enemies);
        const nearestEnemy = this.getNearestEnemy(enemies);

        const bestTarget: BaseShip = nearestForAll || enemyWithSmallHp || nearestEnemy;

        const actionsShip = [];
        if (this.isShipWillLeave()) {
            actionsShip.push(this.getMoveAction(bestTarget.Position));
        }

        const pointToAttack = this.getPointForAttack(bestTarget.Position.add(bestTarget.Velocity.getNormalizeVector()));
        if (pointToAttack) {
            actionsShip.push(this.getAttackAction(pointToAttack));
        } else {
            if (enemyWithSmallHp) {
                actionsShip.push(this.getAttackAction(this.getPointForAttack(enemyWithSmallHp.Position.add(enemyWithSmallHp.Velocity.getNormalizeVector()))));
            } else {
                if (!actionsShip.length) actionsShip.push(this.getMoveAction(bestTarget.Position));
            }
        }
        return actionsShip;
    }

    getPointForAttack(enemyShipCoordinate: Vector) {
        const nearestPointOfShip = this.getShipNearestPoint(enemyShipCoordinate, this.Position.add(this.Velocity.getNormalizeVector()));
        const fromPos = this.getShipNearestPoint(this.Position.add(this.Velocity.getNormalizeVector()), nearestPointOfShip)
        return fromPos.chebyshevDistance(nearestPointOfShip) <= this.BestBlaster.Radius + 1 ? nearestPointOfShip : null;
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