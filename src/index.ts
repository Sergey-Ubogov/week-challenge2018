import {State} from "../types/state";
import {UserOutputD} from "../types/user-output";
import Game from "./classes/Game";
import getDraftChouce from './classes/Shop';

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.on('line', function(line){
    if (JSON.parse(line).hasOwnProperty('PlayerId'))
        console.info(JSON.stringify(getDraftChouce(JSON.parse(line))));
    else
        console.info(JSON.stringify(nextStep(JSON.parse(line))));
});

function nextStep(state: State): UserOutputD {
    const game = new Game(state);

    return game.getBestAction();
}
