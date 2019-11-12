var auth = require('../auth.json');
var tmi = require('tmi.js');

import { Client, ClientType } from './Client';
import { MessageResponseList } from './commands/responses';
import { TWITCH_LIST } from './commands/fun';

export default class TwitchClient extends Client {
    constructor() {
        super(ClientType.Twitch);

        this.init();
        this.load();
    }

    init() {
        console.log('Building Twitch Client:');

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
        console.log('Incoming Twitch message!')
        this.defaultResponses.forEach(async (resp) => {
            console.log('resp', resp)
            if(resp.id === msg) {
                this.clientObj.say(target, `@${context.username} ${resp.res}`);
            }
        });
        this.defaultCommands.forEach(async (command) => {
            let contentArr = msg.split(" ");
            if(command.aliases.includes(contentArr[0])) {
                console.log('Command match!', command.id, contentArr);
                console.log('Command args (using defaults at this point)', command.runArgs, command.parsedArgs);

                let val: any;
                if(contentArr.length > 1) {
                    console.log('Using called parameters', contentArr.slice(1));
                    val = await command.run({ author: target.slice(1) }, command.newCall(contentArr.slice(1)));
                    command.clean();
                } else {
                    val = await command.run({ author: target.slice(1) }, command.newCall([]));
                    command.clean();
                }

                this.clientObj.say(target, val);
            }
        });
    }

    private loadDefaultResponses() {
        this.defaultResponses = MessageResponseList;
        console.log(`loaded ${this.defaultResponses.length} default responses`);
    }

    private loadDefaultCommands() {
        this.defaultCommands = TWITCH_LIST;
        console.log(`loaded ${this.defaultCommands.length} default commands`);
    }
}