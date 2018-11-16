import {AttackParameters} from "../parameters/attack-parameters";

export type Attack = {
    Command: 'ATTACK',
    Parameters: AttackParameters
}