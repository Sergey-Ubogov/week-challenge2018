import {MoveParameters} from "./parameters/move-parameters";
import {AccelerateParameters} from "./parameters/accelerate-parameters";
import {AttackParameters} from "./parameters/attack-parameters";

export type Command = {
    Command: 'MOVE',
    Parameters: MoveParameters
} | {
    Command: 'ACCELERATE',
    Parameters: AccelerateParameters
} | {
    Command: 'ATTACK',
    Parameters: AttackParameters
}