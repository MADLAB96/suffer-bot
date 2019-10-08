'use strict';
import {Command} from '../../Command';

export const Dice = new Command('Dice', { 
    id: "dice",
    description: "rolls a dice with <n> sides (default is 20)",
    aliases: ["roll", "dice", "d20"],
    examples: ["!dice", "!dice <num>"],
    args: [{
        key: 'number',
        type: 'integer',
        default: '20'
    }],
    run: async (msg: any, args: any) => {
        if(args.number > 1) {
            var randRoll = Math.floor(Math.random() * args.number) + 1;
            return (`${msg.author} rolled a d${args.number} and got ${randRoll}`);
        } else {
            return (`This bot is not for testing your theoretical dice.`);
        }
    }
});
