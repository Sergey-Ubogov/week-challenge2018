import {Ship} from "../types/ship";
import distance from './helpers/distance';

export default function (me: Ship, enemies: Ship[]) {
    let nearestEnemy;
    let minDistance = 10000000;

    enemies.forEach(enemy => {
        const distanceToEnemy = distance(enemy.Position, me.Position)
        if (distanceToEnemy > minDistance) return;

        minDistance = distanceToEnemy;
        nearestEnemy = enemy;
    });

    if (!nearestEnemy) nearestEnemy = enemies[0];

    return nearestEnemy;
}