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
            id: "source",
            res: 'https://github.com/MADLAB96/suffer-bot'
        });

        this.defaultResponses.push(sourceResponse);

        console.log(`loaded ${this.defaultResponses.length} default responses`);
    }

    loadDefaultCommands() {
        let diceCommand = new Command('Dice', { 
            id: "dice",
            description: "rolls a dice with <n> sides (default is 20)",
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

        this.defaultCommands.push(diceCommand);

        console.log(`loaded ${this.defaultCommands.length} default commands`);
    }

    async loadStoredResponses() {
        // TODO: Make this once DB is up and working
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
}