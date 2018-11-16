import {State} from "../types/state";
import {UserOutput} from "../types/user-output";

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.on('line', function(line){
    console.info(nextStep(JSON.parse(line)));
});

function nextStep(state: State): UserOutput {
    return state;
}
