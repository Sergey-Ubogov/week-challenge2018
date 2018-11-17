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

    getBestAction() {
        const userCommands = this.MyShips.map(ship => {

            return ship.getBestAction(this.MyShips, this.OpponentShips, this.FireInfos);
        });
        return {
            UserCommands: userCommands,
            Message: 'my_message'
        };
    }
}