import {State} from "../types/state";
import {UserOutputD} from "../types/user-output";
import {BlockEnum} from "../enums/block";
import getNearestEnemy from './get-nearest-enemy';
import {Attack} from "../types/commands/attack";

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.on('line', function(line){
    if (line === '{}') console.info('{}');
    else console.info(JSON.stringify(nextStep(JSON.parse(line))));
});

function nextStep(state: State): UserOutputD {
    const userCommands = state.My.map(ship => {
        const blasterBlock = ship.Equipment.filter(block => block.Type === BlockEnum.blasterBlock)[0];
        const blasterName = blasterBlock.Name;

        return {
            Command: 'ATTACK',
            Parameters: {
                Id: ship.Id,
                Name: blasterName,
                Target: getNearestEnemy(ship, state.Opponent).Position
            },
        } as Attack
    });
    return {
        UserCommands: userCommands,
        Message: 'my_message'
    };
}
