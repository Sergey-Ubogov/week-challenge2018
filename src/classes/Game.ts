import {State} from "../../types/state";
import Ship from "./Ship";
import BaseShip from "./BaseShip";
import {FireInfo} from "../../types/fire-info";

export default class Game {
    MyShips: Ship[];
    OpponentShips: BaseShip[];
    FireInfos: FireInfo[];

    constructor(state: State) {
        this.MyShips = state.My.map(ship => new Ship(ship));
        this.OpponentShips = state.Opponent.map(ship => new BaseShip(ship));
        this.FireInfos = state.FireInfos;
    }

    getNearestForAll(myShips, enemies): BaseShip {
        const enemyIdToCountOccurrences: {[id: number]: number} = {};

        myShips.forEach(myShip => { //для каждого нашего корабля
            let nearestEnemyId = myShip.getNearestEnemy(enemies).Id; // ищем ближайшего к нему противника
            if (enemyIdToCountOccurrences.hasOwnProperty(nearestEnemyId)) enemyIdToCountOccurrences[nearestEnemyId]++; // для найденных противников строим словарь, где будем указывать сколько раз противник встретился
            else enemyIdToCountOccurrences[nearestEnemyId] = 1;
        });

        let nearestEnemyIdForAll: number;
        let maxCountOccurrences = 0;
        for (let enemyId in enemyIdToCountOccurrences) { // ищем противника, который встретился больше всего раз
            if (!enemyIdToCountOccurrences.hasOwnProperty(enemyId)) return;

            let countOccurrences = enemyIdToCountOccurrences[enemyId];
            if (countOccurrences >= maxCountOccurrences) {
                maxCountOccurrences = countOccurrences;
                nearestEnemyIdForAll = Number(enemyId);
            }
        }

        return enemies.filter(enemy => enemy.Id === nearestEnemyIdForAll)[0]
    }

    getMaxOccurrencesEnemyId(enemyIdToCountOccurrences): number {
        // ищем врага, до которого может дотянуться большинство наших кораблей
        let maxCountOccurrences = 0;
        let maxOccurrencesEnemyId;

        for (let enemyId in enemyIdToCountOccurrences) {
            const countOccurrences = enemyIdToCountOccurrences[enemyId];

            if (countOccurrences <= maxCountOccurrences) continue;

            maxCountOccurrences = countOccurrences;
            maxOccurrencesEnemyId = enemyId;
        }

        return Number(maxOccurrencesEnemyId);
    }

    getTargetForEachShip(myShips: Ship[], enemies) {
        let myShipIdToAvailableTarget = {};

        myShips.forEach(myShip => { //для каждого нашего корабля ищем массив врагов, до которых можем дотянуться
            let availableEnemiesIds = [];

            enemies.forEach(enemy => {
                if (myShip.Position.chebyshevDistance(enemy.Position) <= myShip.BestBlaster.Radius) { //если можем дотянуться до врага
                    availableEnemiesIds.push(enemy.Id); //то пихаем его в массив
                }
            });
            myShipIdToAvailableTarget[myShip.Id] = availableEnemiesIds;
        });

        const enemyIdToCountOccurrences = {}; // делаем словарь, где ключ это Id врага, а значение это сколько наших кораблей могут до него дотянуться пушкой
        enemies.forEach(enemy => {
            for(let myShipId in myShipIdToAvailableTarget) {
                if (myShipIdToAvailableTarget[myShipId].indexOf(enemy.Id) !== -1) {
                    if (enemyIdToCountOccurrences.hasOwnProperty(enemy.Id)) enemyIdToCountOccurrences[enemy.Id]++;
                    else enemyIdToCountOccurrences[enemy.Id] = 1;
                }
            }
        });

        return enemies.filter(enemy => enemy.Id === this.getMaxOccurrencesEnemyId(enemyIdToCountOccurrences))[0];
    }

    getBestAction() {
        //const nearestForAll = this.getNearestForAll(this.MyShips, this.OpponentShips);
        let enemyForAll = this.getTargetForEachShip(this.MyShips, this.OpponentShips); // берем противника, до которого может дотянуться большинство
        if (!enemyForAll) enemyForAll = this.getNearestForAll(this.MyShips, this.OpponentShips); // если такого нет(например если мы в самом начале), то берем ближайшего противника для большинства наших кораблей

        const userCommands = this.MyShips.map(ship => {

            return ship.getBestAction(this.MyShips, this.OpponentShips, this.FireInfos, enemyForAll);
        });

        let debugMessage = userCommands.reduce((str, command)=> {
            return str + '  ' + `id: ${command.Parameters.Id}, command: ${command.Command}, target: ${command.Parameters.Target}`;
        }, '')
        debugMessage += `fireInfo: ${JSON.stringify(this.FireInfos)}`;

        return {
            UserCommands: userCommands,
            Message: debugMessage
        };
    }
}