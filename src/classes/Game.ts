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

        myShips.forEach(myShip => {
            let nearestEnemyId = myShip.getNearestEnemy(enemies).Id;
            if (enemyIdToCountOccurrences.hasOwnProperty(nearestEnemyId)) enemyIdToCountOccurrences[nearestEnemyId]++;
            else enemyIdToCountOccurrences[nearestEnemyId] = 1;
        });

        let nearestEnemyIdForAll: number;
        let maxCountOccurrences = 0;
        for (let enemyId in enemyIdToCountOccurrences) {
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

        myShips.forEach(myShip => {
            let availableEnemiesIds = [];

            enemies.forEach(enemy => {
                if (myShip.Position.chebyshevDistance(enemy.Position) <= myShip.BestBlaster.Radius) {
                    availableEnemiesIds.push(enemy.Id);
                }
            });
            myShipIdToAvailableTarget[myShip.Id] = availableEnemiesIds;
        });

        const enemyIdToCountOccurrences = {};
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
        let enemyForAll = this.getTargetForEachShip(this.MyShips, this.OpponentShips);
        if (!enemyForAll) enemyForAll = this.getNearestForAll(this.MyShips, this.OpponentShips);

        const userCommands = this.MyShips.map(ship => {

            return ship.getBestAction(this.MyShips, this.OpponentShips, this.FireInfos, enemyForAll);
        });

        let debugMessage = this.MyShips.reduce((str, myShip)=> {
            return str + '  ' + `id: ${myShip.Id}, dist: ${myShip.Position.chebyshevDistance(enemyForAll.Position)}, ${myShip.BestBlaster.Radius}`;
        }, '')
        debugMessage += `enemyForAll: ${this.getTargetForEachShip(this.MyShips, this.OpponentShips) && this.getTargetForEachShip(this.MyShips, this.OpponentShips).Position}`;
        debugMessage += `enemyForAll2: ${enemyForAll.Position}`;
        return {
            UserCommands: userCommands,
            Message: debugMessage
        };
    }
}