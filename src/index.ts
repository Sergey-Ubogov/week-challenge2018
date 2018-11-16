import {State} from "../types/state";

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.on('line', function(line){
    console.info(nextStep(JSON.parse(line)));
});

function nextStep(state: State) {
    return state;
}
