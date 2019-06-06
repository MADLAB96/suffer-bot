'use strict';
var commando = require("discord.js-commando");

module.exports = class Dice extends commando.Command {
    constructor(client) {
        super(client, {
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
        });
    }
    async run(msg, args) {
        if(args.number >= 1){
            var randRoll = Math.floor(Math.random() * args.number) + 1;
            msg.channel.send(`${msg.author} rolled a d${args.number} and got ${randRoll}`);
        }
        else{
            msg.channel.send(`That ain't no dice`);
        }      
    }
}