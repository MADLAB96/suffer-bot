var auth = require('../auth.json');
var tmi = require('tmi.js');

import { MessageResponse, Command } from './Command';
import { Client, ClientType } from './Client';
import { MessageResponseList } from './commands/responses';

export default class TwitchClient extends Client {
    constructor() {
        super(ClientType.Twitch);

        this.init();
        this.load();
    }

    init() {
        // TODO: Import this from config file.
        const twitchOpts = {
            identity: {
                username: 'sufferingbot',
                password: auth.twitch
            },

            channels: [
                'Madlab96',
                'sufferingbot'
            ]
        }

        const twitchClient = new tmi.client(twitchOpts);

        twitchClient.connect();

        twitchClient.on('message', (target: any, context: any, msg: any, self: any) => {
            console.log("TWITCH MESSAGE", {target, context, msg, self})
            // TODO Make the prefix a regex to allow for mulitple prefix  (!, @, computer, etc.) 
            if (msg.trim()[0] === '!') {
                console.log('prefix ! found. Command:', msg.trim().slice(1));

                // Successfully recieved a message. Query the responces and commands to see if valid.
                this.handleTwitchMessage(target, context, msg.trim().slice(1));
            } else {
                // ignore message, not relevent
            }
        });

        twitchClient.on('connected', (addr: any, port: any) => {
            console.log(`* Connected to ${addr}:${port}`);
        });

        this.clientObj = twitchClient;
    }

    load() {
        this.loadDefaultCommands();
        this.loadDefaultResponses();
    }

    private async handleTwitchMessage(target: string, context: any, msg: string) {
        // already know that this is a Response, skip prefix check
        this.defaultResponses.forEach(async (resp) => {
            console.log('resp', resp)
            if(resp.id === msg) {
                this.clientObj.say(target, `@${context.username} ${resp.msg}`);
            }
        });
        this.defaultCommands.forEach(async (command) => {
            let contentArr = msg.split(" ");
            console.log('command', command)
            console.log('content', contentArr)
            if(command.id === contentArr[0]) {

                let val = await command.run({author: context.username}, {number:  parseInt(contentArr[1]) });
                console.log('@' + val)
                this.clientObj.say(target, '@' + val);
            }
        });
    }

    private loadDefaultResponses() {
        this.defaultResponses = MessageResponseList;

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