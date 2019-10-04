var auth = require('../auth.json');
var Discord = require('discord.js');

import { MessageResponse, Command } from './Command';
import { Client, ClientType } from './Client';

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
                console.log(msg);
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
        this.defaultResponses.forEach(async (resp) => {
            console.log('resp', resp)
            if(resp.identifier === content) {
                msg.reply(resp.msg);
            }
        });
        this.defaultCommands.forEach(async (command) => {
            let contentArr = content.split(" ");
            console.log('command', command)
            console.log('content', contentArr)
            if(command.identifier === contentArr[0]) {

                let val = await command.run(msg, {number:  parseInt(contentArr[1]) });
                console.log(val)
                msg.reply(val);
            }
        });
    }

    private loadDefaultResponses() {
        let sourceResponse = new MessageResponse('Source',  { 
            identifier: "source",
            response: 'https://github.com/MADLAB96/suffer-bot'
        });

        this.defaultResponses.push(sourceResponse);

        console.log(`loaded ${this.defaultResponses.length} default responses`);
    }

    private loadDefaultCommands() {
        let diceCommand = new Command('Dice', { 
            identifier: "dice",
            description: "rolls a dice with <n> sides (default is 20)",
            aliases: ["roll", "dice", "d20"],
            examples: ["!dice", "!dice <num>"],
            args: [{
                key: 'number',
                prompt: 'ROll yo dice',
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

        this.defaultCommands.push(diceCommand);

        console.log(`loaded ${this.defaultCommands.length} default commands`);
    }
}