var commando = require('discord.js-commando');
var path = require('path');
var tmi = require('tmi.js');
var Discord = require('discord.js');

import { MessageResponse, Command } from './Command';

export default class ClientSystem {
    public discordClient: any;
    public commandoClient: any;
    public twitchClient: any;
    public defaultCommands: Command[]; // TODO: Create class for ResponseGroup
    public defaultResponses: MessageResponse[]; // TODO: Create class for ResponseGroup
    public storedResponses: any;
    public auth: any;

    constructor(auth: any) {
        this.discordClient = null;
        this.twitchClient = null;
        this.defaultCommands = [];
        this.defaultResponses = []; // Default responses
        this.storedResponses = []; // responses stored in database

        if (auth) this.auth = auth;
        else this.auth = {};

        // Load commands and responses?
        this.loadDefaultResponses();
        this.loadDefaultCommands();
    }

    loadDefaultResponses() {
        let sourceResponse = new MessageResponse('Source',  { 
            identifier: "source",
            response: 'https://github.com/MADLAB96/suffer-bot'
        });

        this.defaultResponses.push(sourceResponse);

        console.log(`loaded ${this.defaultResponses.length} default responses`);
    }

    loadDefaultCommands() {
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
            }],
            run: async (msg: any, args: any) => {
                if(args.number > 1) {
                    var randRoll = Math.floor(Math.random() * args.number) + 1;
                    msg.channel.send(`${msg.author} rolled a d${args.number} and got ${randRoll}`);
                } else {
                    msg.channel.send(`This bot is not for testing your theoretical dice.`);
                }
            }
        });

        this.defaultCommands.push(diceCommand);

        console.log(`loaded ${this.defaultCommands.length} default commands`);
    }
    // TODO: remove this as it becomes obsolete
    initCommando(): ClientSystem {
        const client = new commando.Client({
            // TODO: Add this to auth (pretty sure its public but should anyways)
            // TODO: Add this to auth documentation (what is owner?)
            owner: '209463572395196417',
            commandPrefix: '!'
        });

        client.on('ready', function (evt: any) {
            var list: any[] = [];
            //TODO: Log the Guild name instead (or in addition)
            client.channels.forEach((channel: any) => {
                list.push(channel.name)
            });
            console.log('connected to:', list.toString());
        });

        client.registry
            .registerGroup('fun', 'Fun')
            .registerGroup('response', 'Response')
            .registerDefaults()
            .registerCommandsIn(path.join(__dirname, './commands'));

        // authentication
        client.login(this.auth.token);

        this.commandoClient = client;

        return this;
    }

    initTwitch(): ClientSystem {
        // TODO: Import this from config file.
        const twitchOpts = {
            identity: {
                username: 'sufferingbot',
                password: this.auth.twitch
            },

            channels: [
                'Madlab96'
            ]
        }

        const twitchClient = new tmi.client(twitchOpts);

        twitchClient.connect();

        twitchClient.on('message', (target: any, context: any, msg: any, self: any) => {
            // TODO Make the prefix a regex to allow for mulitple prefix  (!, @, computer, etc.) 
            if (msg.trim()[0] === '!') {
                console.log('prefix ! found. Command:', msg.trim().slice(1));

                // Successfully recieved a message. Query the responces and commands to see if valid.
            } else {
                // ignore message, not relevent
            }
            // if(msg.includes('society') || msg.includes('joker') || msg.includes('we')) {
            //     twitchClient.say(target, 'gamer word');
            // }
            // if(msg.includes('nagger')) {
            //     twitchClient.say(target, 'ayy');
            // }
        });

        twitchClient.on('connected', (addr: any, port: any) => {
            console.log(`* Connected to ${addr}:${port}`);
        });

        this.twitchClient = twitchClient;

        return this;
    }

    handleDiscordMessage(msg: any, content: string) {
        // already know that this is a Response, skip prefix check
        this.defaultResponses.forEach((resp) => {
            console.log(resp)
            if(resp.identifier === content) {
                msg.reply(resp.msg);
            }
        });
    }

    initDiscord(): ClientSystem {
        const client = new Discord.Client();

        client.on('connected', () => {
            console.log(`Logged in as ${client.user.tag}!`);
        });

        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
        });

        client.on('message', (msg: any) => {
            if (msg.content === 'ping') {
                msg.reply('Pong!');
            }
            if (msg.content.trim()[0] === '!')
                this.handleDiscordMessage(msg, msg.content.slice(1)); // TODO: replace slice() with a prefix remover function
        });

        client.login(this.auth.token);

        this.discordClient = client;
        
        return this;
    }
}