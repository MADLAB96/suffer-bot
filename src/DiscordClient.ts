var auth = require('../auth.json');
var Discord = require('discord.js');

import { MessageResponse, Command } from './Command';
import { Client, ClientType } from './Client';
import { MessageResponseList } from './commands/responses';

export default class DiscordClient extends Client {
    constructor() {
        super(ClientType.Discord);

        this.init();
        this.load();
    }

    init() {
        const client = new Discord.Client();

        client.on('ready', () => {
            console.log(`DISCORD::Logged in as ${client.user.tag}!`);
        });

        client.on('message', (msg: any) => {
            if (msg.content.trim()[0] === '!'){
                this.handleDiscordMessage(msg, msg.content.slice(1)); // TODO: replace slice() with a prefix remover function
            }
        });

        client.login(auth.token);

        this.clientObj = client;
    }

    load() {
        this.loadDefaultCommands();
        this.loadDefaultResponses();
    }

    private async handleDiscordMessage(msg: any, content: string) {
        // already know that this is a Response, skip prefix check
        console.log('Incoming Discord message!')
        this.defaultResponses.forEach(async (resp) => {
            if(resp.id === content) {
                msg.reply(resp.res);
            }
        });
        this.defaultCommands.forEach(async (command) => {
            let contentArr = content.split(" ");
            console.log('content ::', contentArr);
            console.log('contentID ::', command.id);
            if(command.id === contentArr[0]) {
                let val = await command.run(msg, command.call(contentArr[1]));
                msg.reply(val);
            }
        });
    }

    private loadDefaultResponses() {
        this.defaultResponses = MessageResponseList;

        console.log(`loaded ${this.defaultResponses.length} default responses`);
    }

    private loadDefaultCommands() {
        let diceCommand = new Command('Dice', { 
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

        console.log(diceCommand)
        this.defaultCommands.push(diceCommand);

        console.log(`loaded ${this.defaultCommands.length} default commands`);
    }
}