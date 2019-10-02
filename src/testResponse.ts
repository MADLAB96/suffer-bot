'use strict';
import { MessageResponse, Command } from './Command';

let sourceResponse = new MessageResponse('Source',  { 
                                            identifier: "source",
                                            response: 'https://github.com/MADLAB96/suffer-bot'
                                        });

let diceCommand = new Command('Dice', { 
    name: "dice",
    description: "rolls a dice with <n> sides (default is 20)",
    group: 'fun',
    aliases: ["roll", "dice", "d20"],
    memberName: "dice",
    examples: ["!dice", "!dice <num>"],
    args: [{
        key: 'number',
        prompt: 'ROll yo dice',
        type: 'integer',
        default: '20'
    }]
})